import { h, FunctionComponent as FC } from "preact";
import { useEffect, useRef } from "preact/hooks";
import type PinchZoom from "pinch-zoom-element";
import type { ScaleToOpts } from "pinch-zoom-element";

import { ZoomNumber } from "../../components/ZoomNumber";
import { ScreenName } from "../../components/ScreenName";
import { SettingsOpenButton } from "../../components/SettingsOpenButton";
import { usePinchScaleChange } from "../../hooks/usePinchScaleChange";
import { useBoolState } from "../../hooks/useBoolState";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { ImageSettings } from "./ImageSettings";
import { ImageWorkspace } from "./ImageWorkspace";

interface Props {
  onDragging: RectMoveCb;
  onDragEnd: RectMoveCb;
}

export const ImageScreen: FC<Props> = ({ onDragEnd, onDragging }) => {
  const { image, borderSafeSpace } = useAppStatePartial(
    "image",
    "borderSafeSpace",
  );

  const [isSettingsOpen, setSettingsOpen] = useBoolState(false);
  const [isDimed, setIsDimed] = useBoolState(true);
  const [zoom, onPinchZoomChange] = usePinchScaleChange();

  // scale initial image view to fill the screen
  const pinchZoomRef = useRef<PinchZoom>();
  useEffect(() => {
    if (image) {
      const opts: ScaleToOpts = {
        relativeTo: "content",
        allowChangeEvent: true,
      };
      const el = pinchZoomRef.current;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const iw = image.data.width;
      const ih = image.data.height;
      const ratioW = iw / w;
      const ratioH = ih / h;
      // console.log({ w, h, iw, ih, ratioW, ratioH });

      if (ratioW > ratioH) {
        // image is wider than viewport, scale to fit and center vertically
        el.scaleTo(1 / ratioW, opts);
        el.setTransform({ x: 0, y: (h - ih / ratioW) / 2 });
      } else {
        // image is higher than viewport, scale to fit and center horizontally
        el.scaleTo(1 / ratioH, opts);
        el.setTransform({ x: (w - iw / ratioH) / 2, y: 0 });
      }
    }
  }, [image]);

  return (
    <div class={s.appColumnStyle}>
      <pinch-zoom
        ref={pinchZoomRef}
        class={s.pinchZoomStyle}
        onChange={onPinchZoomChange}
      >
        {image != null ? (
          <ImageWorkspace
            borderSafeSpace={borderSafeSpace}
            imageData={image}
            isDimed={isDimed}
            zoom={zoom}
            onDragging={onDragging}
            onDragEnd={onDragEnd}
          />
        ) : null}
      </pinch-zoom>

      <ZoomNumber theme={s.ThemePurple} zoom={zoom} />
      <ScreenName theme={s.ThemePurple} name="Input Image" />
      <SettingsOpenButton
        theme={s.ThemePurple}
        setSettingsOpen={setSettingsOpen}
      />
      <ImageSettings
        theme={s.ThemePurple}
        isOpen={isSettingsOpen}
        setSettingsOpen={setSettingsOpen}
        isDimed={isDimed}
        setIsDimed={setIsDimed}
      />
    </div>
  );
};
