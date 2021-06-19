import { h, FunctionComponent as FC, Fragment } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { css } from "@emotion/css";
import clonedeep from "lodash.clonedeep";

import { useLatest } from "../hooks/useLatest";
import { add2d, clamp, mul2d, svgPolygonPoints } from "../utils";
import { RectCornerSvg } from "./RectCornerSvg";
import { RectGridSvg } from "./RectGridSvg";
import { RectArrowSvg } from "./RectArrowSvg";
import type { AppImageData } from "src/App";

interface ImageState {
  rect: Rect;
  scale: number;
  imageData: AppImageData;
}

const addDeltaToPoint = (
  point: Point2d, delta: Point2d, { scale, imageData }: ImageState
): Point2d => {
  const p = add2d(point, mul2d(delta, 1.0 / scale));
  p.x = clamp(p.x, imageData.borderSafeSpace, imageData.borderSafeSpace + imageData.width);
  p.y = clamp(p.y, imageData.borderSafeSpace, imageData.borderSafeSpace + imageData.height);
  return p;
};

const applyCornerMove = (
  imageState: ImageState, pointIdx: number, dt: Point2d
): Rect => {
  const newState = clonedeep<Rect>(imageState.rect);
  newState[pointIdx] = addDeltaToPoint(imageState.rect[pointIdx], dt, imageState);
  return newState;
}

const applyMove = (
  imageState: ImageState, dt: Point2d
): Rect => {
  return imageState.rect.map(p => addDeltaToPoint(p, dt, imageState)) as Rect;
}

const rectSvgStyle = css`
  fill: none;
  pointer-events: none;
  stroke-dasharray: 10;
`;

interface Props {
  rect: Rect;
  scale: number;
  imageData: AppImageData;
  updateRect: (rect: Rect) => void;
  onPreviewUpdate: (rect: Rect) => void;
}


// TODO multiple rects
// TODO throttle

export const RectSvg: FC<Props> = ({
  rect, scale, imageData,
  updateRect, onPreviewUpdate
}) => {
  const [shownRect, setShownState] = useState<Rect>(clonedeep(rect));
  useEffect(() => {
    setShownState(clonedeep(rect));
  }, [rect]);

  const imageStateRef = useLatest<ImageState>({
    imageData, rect, scale
  });

  const onCornerDrag = useCallback((pointIdx: number, dt: Point2d) => {
    const newRect = applyCornerMove(imageStateRef.current, pointIdx, dt);
    setShownState(newRect);
    onPreviewUpdate(newRect);
  }, []);

  const onCornerDragEnd = useCallback((pointIdx: number, dt: Point2d) => {
    const newState = applyCornerMove(imageStateRef.current, pointIdx, dt);
    updateRect(newState);
  }, []);

  const onArrowDrag = useCallback((dt: Point2d) => {
    const newRect = applyMove(imageStateRef.current, dt);
    setShownState(newRect);
    onPreviewUpdate(newRect);
  }, []);

  const onArrowDragEnd = useCallback((dt: Point2d) => {
    const newState = applyMove(imageStateRef.current, dt);
    updateRect(newState);
  }, []);

  const scaleIndependent = useCallback(
    (v: number) => v / imageStateRef.current.scale,
    []);

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
        style={`stroke-width: ${Math.min(scaleIndependent(5), 7)};`}
      />

      {/* mid lines */}
      <RectGridSvg
        rect={shownRect}
        scaleIndependent={scaleIndependent}
      />

      {/* arrow */}
      <RectArrowSvg
        rect={shownRect}
        onDrag={onArrowDrag}
        onDragEnd={onArrowDragEnd}
        scaleIndependent={scaleIndependent}
      />

      {/* corners */}
      {
        shownRect.map((pp, idx) =>
          <RectCornerSvg
            key={idx}
            idx={idx}
            point={pp}
            scaleIndependent={scaleIndependent}
            onDrag={onCornerDrag}
            onDragEnd={onCornerDragEnd}
            maxRadius={imageData.borderSafeSpace}
          />
        )
      }
    </Fragment>
  );
};
