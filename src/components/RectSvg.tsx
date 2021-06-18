import { h, FunctionComponent as FC, Fragment } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { css } from "@emotion/css";
import clonedeep from "lodash.clonedeep";

import { useLatest } from "../hooks/useLatest";
import { add2d, mul2d, svgPolygonPoints } from "../utils";
import { RectCornerSvg } from "./RectCornerSvg";
import { RectGridSvg } from "./RectGridSvg";
import { RectArrowSvg } from "./RectArrowSvg";

const applyCornerMove = (rect: Rect, pointIdx: number, dt: Point2d, scale: number): Rect => {
  const newState = clonedeep<typeof rect>(rect);
  newState[pointIdx] = add2d(rect[pointIdx], mul2d(dt, 1.0 / scale));
  return newState;
}

const applyMove = (rect: Rect, dt: Point2d, scale: number): Rect => {
  return rect.map(p => add2d(p, mul2d(dt, 1.0 / scale))) as Rect;
}

const rectSvgStyle = css`
  stroke-width: 5;
  fill: none;
  pointer-events: none;
  stroke-dasharray: 10;
`;

interface Props {
  rect: Rect;
  updateRect: (rect: Rect) => void;
  onPreviewUpdate: (rect: Rect) => void;
  scale: number;
}


// TODO do not cover the corner - add padding
// TODO multiple rects
// TODO throttle

export const RectSvg: FC<Props> = ({ rect, updateRect, onPreviewUpdate, scale }) => {
  const [shownRect, setShownState] = useState<Rect>(clonedeep(rect));
  useEffect(() => {
    setShownState(clonedeep(rect));
  }, [rect]);

  const rectRef = useLatest(rect);
  const scaleRef = useLatest(scale);

  const onCornerDrag = useCallback((pointIdx: number, dt: Point2d) => {
    const newRect = applyCornerMove(rectRef.current, pointIdx, dt, scaleRef.current);
    setShownState(newRect);
    onPreviewUpdate(newRect);
  }, []);

  const onCornerDragEnd = useCallback((pointIdx: number, dt: Point2d) => {
    // TODO ensurePositionIsOk();
    const newState = applyCornerMove(rectRef.current, pointIdx, dt, scaleRef.current);
    updateRect(newState);
  }, []);

  const onArrowDrag = useCallback((dt: Point2d) => {
    const newRect = applyMove(rectRef.current, dt, scaleRef.current);
    setShownState(newRect);
    onPreviewUpdate(newRect);
  }, []);

  const onArrowDragEnd = useCallback((dt: Point2d) => {
    const newState = applyMove(rectRef.current, dt, scaleRef.current);
    updateRect(newState);
  }, []);

  return (
    <Fragment>
      {/* borders */}
      <polygon
        points={svgPolygonPoints(
          shownRect[0],
          shownRect[1],
          shownRect[3],
          shownRect[2],
        )}
        stroke="#a557b8"
        class={rectSvgStyle}
      />

      {/* mid lines */}
      <RectGridSvg rect={shownRect} />

      {/* arrow */}
      <RectArrowSvg
        rect={shownRect}
        onDrag={onArrowDrag}
        onDragEnd={onArrowDragEnd}
      />

      {/* corners */}
      {
        shownRect.map((pp, idx) =>
          <RectCornerSvg
            key={idx}
            idx={idx}
            point={pp}
            scale={scale}
            onDrag={onCornerDrag}
            onDragEnd={onCornerDragEnd}
          />
        )
      }
    </Fragment>
  );
};
