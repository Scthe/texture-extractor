import { css, cx } from "@emotion/css";
import { useEffect, useRef } from "preact/hooks";
import { h, FunctionComponent as FC } from "preact";
import { GlContext, initializeGlView, redraw } from "../../gl";
import { useLatest } from "../../hooks/useLatest";
import { sub2d, hexAsSvgColor } from "../../utils";
import { ZoomNumber } from "../../components/ZoomNumber";
import { ScreenName } from "../../components/ScreenName";
import { SettingsOpenButton } from "../../components/SettingsOpenButton";
import { usePinchScaleChange } from "../../hooks/usePinchScaleChange";
import { useBoolState } from "../../hooks/useBoolState";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { UvSettings } from "./UvSettings";

const CHECKER_COLOR_1 = hexAsSvgColor(s.COLORS.greyDark);
const CHECKER_COLOR_2 = hexAsSvgColor(s.COLORS.greyMid);

const container = css`
  border-right: 4px solid ${s.ThemeTeal.primary};
  background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><rect width="2" height="2" fill="${CHECKER_COLOR_1}"/><path d="M1 2V0h1v1H0v1z" fill="${CHECKER_COLOR_2}"/></svg>');
  background-size: auto;
  background-size: 20px 20px;
`;

export const UVscreen: FC<unknown> = () => {
  /*
  const padding = useAppStatePartial("borderSafeSpace");
  const pointsRef = useLatest(points);
  const imageDataRef = useLatest(imageData);
  */

  const [isSettingsOpen, setSettingsOpen] = useBoolState(false);
  const canvasRef = useRef<HTMLCanvasElement>();
  /*
  const glContextRef = useRef<GlContext | null>();

  const redrawUVviewRef = useLatest((rect: Rect) => {
    if (glContextRef.current != null) {
      const rectNoPadding = rect.map((p) =>
        sub2d(p, { x: padding, y: padding }),
      ) as Rect;
      redraw(glContextRef.current, rectNoPadding);
    }
  });

  useEffect(() => {
    initializeGlView(canvasRef.current).then((ctx) => {
      glContextRef.current = ctx;
      // redrawUVviewRef.current(pointsRef.current);
    });
  }, [pointsRef, redrawUVviewRef]);
  */

  const [zoom, onPinchZoomChange] = usePinchScaleChange();

  return (
    <div class={cx(s.appColumnStyle, container)}>
      <pinch-zoom class={s.pinchZoomStyle} onChange={onPinchZoomChange}>
        <canvas ref={canvasRef} class={s.wh100} />
      </pinch-zoom>

      <ZoomNumber theme={s.ThemeTeal} zoom={zoom} />
      <ScreenName theme={s.ThemeTeal} name="Extracted Images" />
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
};
