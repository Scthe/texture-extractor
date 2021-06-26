import { h, FunctionComponent as FC } from "preact";
import { useRef } from "preact/hooks";
import type PinchZoom from "pinch-zoom-element";

import { ZoomNumber } from "../../components/ZoomNumber";
import { ScreenName } from "../../components/ScreenName";
import { SettingsOpenButton } from "../../components/SettingsOpenButton";
import { usePinchScaleChange } from "../../hooks/usePinchScaleChange";
import { useBoolState } from "../../hooks/useBoolState";
import { useSettingsOpenState } from "../../hooks/useSettingsOpenState";
import { useAutoZoomPinchZoom } from "../../hooks/useAutoZoomPinchZoom";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { ImageSettings } from "./ImageSettings";
import { ImageWorkspace } from "./ImageWorkspace";

const HELP_TEXT = [
  "Use Texture Extractor to map parts of input image (right side of the screen) to rectangles (left side of the screen).",
  "Each selected area is defined by 4 corners. Drag the corners to change shape of currently selected area. You can extract many parts of an image at the same time using multiple selections. Use settings panel in bottom right corner to manage selections.",
];

interface Props {
  onDragging: RectMoveCb;
  onDragEnd: RectMoveCb;
}

export const ImageScreen: FC<Props> = ({ onDragEnd, onDragging }) => {
  const { image, borderSafeSpace } = useAppStatePartial(
    "image",
    "borderSafeSpace",
  );

  const [isSettingsOpen, setSettingsOpen] = useSettingsOpenState();
  const [isDimed, setIsDimed] = useBoolState(true);
  const [zoom, onPinchZoomChange] = usePinchScaleChange();

  // scale initial image view to fill the screen
  const pinchZoomRef = useRef<PinchZoom>();
  useAutoZoomPinchZoom(image, pinchZoomRef);

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
      <ScreenName
        theme={s.ThemePurple}
        name="Input Image"
        helpText={HELP_TEXT}
      />
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
