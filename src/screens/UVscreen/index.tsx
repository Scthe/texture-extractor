import { css, cx } from "@emotion/css";
import { useEffect, useImperativeHandle, useRef } from "preact/hooks";
import { h, FunctionComponent as FC, Ref } from "preact";
import { forwardRef } from "preact/compat";
import type PinchZoom from "pinch-zoom-element";

import { destroyGlContext, GlContext, initializeGlView } from "../../gl";
import { useLatest } from "../../hooks/useLatest";
import { hexAsSvgColor } from "../../utils";
import { ZoomNumber } from "../../components/ZoomNumber";
import { ScreenName } from "../../components/ScreenName";
import { SettingsOpenButton } from "../../components/SettingsOpenButton";
import { usePinchScaleChange } from "../../hooks/usePinchScaleChange";
import { useSettingsOpenState } from "../../hooks/useSettingsOpenState";
import { useAutoZoomPinchZoom } from "../../hooks/useAutoZoomPinchZoom";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { UvSettings } from "./UvSettings";
import { getRectToDraw, redrawUVview } from "./utils";

type RedrawWebGl = (rect: Rect | undefined) => void;
export type RefrawWebGlRef = { redrawWebGl: RedrawWebGl };

const CHECKER_COLOR_1 = hexAsSvgColor(s.COLORS.greyDark);
const CHECKER_COLOR_2 = hexAsSvgColor(s.COLORS.greyMid);

const HELP_TEXT = [
  "Use Texture Extractor to map parts of input image (right side of the screen) to rectangles (left side of the screen).",
  "Use the Extracted Texture view to preview the selection area content. This view contains image generated from input image based on active selection. Live updates provide feedback during changes.",
  "Use settings panel in bottom right corner of this view to save the result as a file.",
];

const container = css`
  border-right: 4px solid ${s.ThemeTeal.primary};
  background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><rect width="2" height="2" fill="${CHECKER_COLOR_1}"/><path d="M1 2V0h1v1H0v1z" fill="${CHECKER_COLOR_2}"/></svg>');
  background-size: auto;
  background-size: 20px 20px;
`;

export const UVscreen: FC<unknown> = forwardRef(
  (_, ref: Ref<RefrawWebGlRef>) => {
    const {
      image,
      borderSafeSpace,
      rectangles,
      renderSmooth,
      selectedRectangleId,
    } = useAppStatePartial(
      "borderSafeSpace",
      "image",
      "rectangles",
      "renderSmooth",
      "selectedRectangleId",
    );

    const canvasRef = useRef<HTMLCanvasElement>();
    const glContextRef = useRef<GlContext | null>();
    const [isSettingsOpen, setSettingsOpen] = useSettingsOpenState();

    const uvStateRef = useLatest({
      borderSafeSpace,
      rectangles,
      renderSmooth,
      selectedRectangleId,
    });

    const redrawUVviewRef = useLatest<RedrawWebGl>((rect: Rect | undefined) => {
      rect = getRectToDraw(
        rect,
        uvStateRef.current.rectangles,
        uvStateRef.current.selectedRectangleId,
      );
      redrawUVview({
        ...uvStateRef.current,
        ctx: glContextRef.current,
        rect,
      });
    });

    useImperativeHandle(ref, () => ({
      redrawWebGl: (rect: Rect | undefined) => redrawUVviewRef.current(rect),
    }));

    // conditions to redraw other than moved rectangles
    useEffect(() => {
      redrawUVviewRef.current(undefined);
    }, [redrawUVviewRef, renderSmooth, selectedRectangleId]);

    // when image changed (or canvas, but that's less likely)
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
      <div class={cx(s.theme(s.ThemeTeal), s.appColumnStyle, container)}>
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

        <ZoomNumber zoom={zoom} />
        <ScreenName
          theme={s.ThemeTeal}
          name="Extracted Texture"
          helpText={HELP_TEXT}
        />
        <SettingsOpenButton setSettingsOpen={setSettingsOpen} />
        <UvSettings isOpen={isSettingsOpen} setSettingsOpen={setSettingsOpen} />
      </div>
    );
  },
);
