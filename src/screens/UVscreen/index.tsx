import { css, cx } from "@emotion/css";
import { useEffect, useImperativeHandle, useRef } from "preact/hooks";
import { h, FunctionComponent as FC, Ref } from "preact";
import { forwardRef } from "preact/compat";
import type PinchZoom from "pinch-zoom-element";

import {
  destroyGlContext,
  GlContext,
  initializeGlView,
  redraw,
} from "../../gl";
import { useLatest } from "../../hooks/useLatest";
import { sub2d, hexAsSvgColor } from "../../utils";
import { ZoomNumber } from "../../components/ZoomNumber";
import { ScreenName } from "../../components/ScreenName";
import { SettingsOpenButton } from "../../components/SettingsOpenButton";
import { usePinchScaleChange } from "../../hooks/usePinchScaleChange";
import { useBoolState } from "../../hooks/useBoolState";
import { useAutoZoomPinchZoom } from "../../hooks/useAutoZoomPinchZoom";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { UvSettings } from "./UvSettings";

type RedrawWebGl = (rect: Rect | undefined) => void;
export type RefrawWebGlRef = { redrawWebGl: RedrawWebGl };

const CHECKER_COLOR_1 = hexAsSvgColor(s.COLORS.greyDark);
const CHECKER_COLOR_2 = hexAsSvgColor(s.COLORS.greyMid);

const container = css`
  border-right: 4px solid ${s.ThemeTeal.primary};
  background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><rect width="2" height="2" fill="${CHECKER_COLOR_1}"/><path d="M1 2V0h1v1H0v1z" fill="${CHECKER_COLOR_2}"/></svg>');
  background-size: auto;
  background-size: 20px 20px;
`;

export const UVscreen: FC<unknown> = forwardRef(
  (_, ref: Ref<RefrawWebGlRef>) => {
    const { image, borderSafeSpace, rectangles, soften } = useAppStatePartial(
      "borderSafeSpace",
      "image",
      "rectangles",
      "soften",
    );
    const canvasRef = useRef<HTMLCanvasElement>();
    const glContextRef = useRef<GlContext | null>();
    const [isSettingsOpen, setSettingsOpen] = useBoolState(false);

    const redrawUVviewRef = useLatest<RedrawWebGl>((rect: Rect | undefined) => {
      rect = rect != null ? rect : rectangles[0]?.points;
      if (rect != null && glContextRef.current != null) {
        const rectNoPadding = rect.map((p) =>
          sub2d(p, { x: borderSafeSpace, y: borderSafeSpace }),
        ) as Rect;
        redraw(glContextRef.current, rectNoPadding);
      }
    });

    useImperativeHandle(ref, () => ({
      redrawWebGl: (rect: Rect | undefined) => redrawUVviewRef.current(rect),
    }));

    useEffect(() => {
      if (canvasRef.current == null || image == null) {
        // console.log("Skipping webgl context create - no <canvas> or image");
        return;
      }
      // console.log("Recreating webgl context from new image");
      const ctx = (glContextRef.current = initializeGlView(
        canvasRef.current,
        image.data,
      ));
      redrawUVviewRef.current(undefined);
      return () => {
        if (ctx) {
          destroyGlContext(ctx);
        }
      };
    }, [image, redrawUVviewRef]);

    const [zoom, onPinchZoomChange] = usePinchScaleChange();

    // scale initial image view to fill the screen
    const pinchZoomRef = useRef<PinchZoom>();
    useAutoZoomPinchZoom(image, pinchZoomRef);

    return (
      <div class={cx(s.appColumnStyle, container)}>
        <pinch-zoom
          ref={pinchZoomRef}
          class={s.pinchZoomStyle}
          onChange={onPinchZoomChange}
        >
          {image != null ? (
            <canvas
              ref={canvasRef}
              width={image.data.width}
              height={image.data.height}
            />
          ) : null}
        </pinch-zoom>

        <ZoomNumber theme={s.ThemeTeal} zoom={zoom} />
        <ScreenName theme={s.ThemeTeal} name="Extracted Texture" />
        <SettingsOpenButton
          theme={s.ThemeTeal}
          setSettingsOpen={setSettingsOpen}
        />
        <UvSettings
          theme={s.ThemeTeal}
          isOpen={isSettingsOpen}
          setSettingsOpen={setSettingsOpen}
        />
      </div>
    );
  },
);
