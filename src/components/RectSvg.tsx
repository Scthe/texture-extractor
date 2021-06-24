import clonedeep from "lodash.clonedeep";
import { css } from "@emotion/css";
import { useCallback, useEffect, useState } from "preact/hooks";
import { h, FunctionComponent as FC, Fragment } from "preact";

import { useLatest } from "../hooks/useLatest";
import { useAppStatePartial } from "../state/AppState";
import {
  add2d,
  ensurePointInsideImage,
  mul2d,
  svgPolygonPoints,
} from "../utils";
import { RectCornerSvg } from "./RectCornerSvg";
import { RectGridSvg } from "./RectGridSvg";
import { RectArrowSvg } from "./RectArrowSvg";

interface ImageState {
  rect: SelectionRect;
  scale: number;
  imageData: AppImageData;
  borderSafeSpace: number;
}

const addDeltaToPoint = (
  point: Point2d,
  delta: Point2d,
  { scale, imageData, borderSafeSpace }: ImageState,
): Point2d => {
  const p = add2d(point, mul2d(delta, 1.0 / scale));
  ensurePointInsideImage(p, imageData, borderSafeSpace);
  return p;
};

const applyCornerMove = (
  imageState: ImageState,
  pointIdx: number,
  dt: Point2d,
): Rect => {
  const newState = clonedeep<Rect>(imageState.rect.points);
  newState[pointIdx] = addDeltaToPoint(
    imageState.rect.points[pointIdx],
    dt,
    imageState,
  );
  return newState;
};

const applyMove = (imageState: ImageState, dt: Point2d): Rect => {
  return imageState.rect.points.map((p) =>
    addDeltaToPoint(p, dt, imageState),
  ) as Rect;
};

interface Props {
  rect: SelectionRect;
  scale: number;
  imageData: AppImageData;
  onDragging: RectMoveCb;
  onDragEnd: RectMoveCb;
}

// TODO throttle

export const RectSvg: FC<Props> = ({
  rect,
  scale,
  imageData,
  onDragEnd,
  onDragging,
}) => {
  const { borderSafeSpace, selectedRectangleId } = useAppStatePartial(
    "borderSafeSpace",
    "selectedRectangleId",
  );
  const [shownRect, setShownState] = useState<Rect>(clonedeep(rect.points));
  useEffect(() => {
    setShownState(clonedeep(rect.points));
  }, [rect]);

  const imageStateRef = useLatest<ImageState>({
    imageData,
    rect,
    scale,
    borderSafeSpace,
  });

  const onCornerDrag = useCallback(
    (pointIdx: number, dt: Point2d) => {
      const newRect = applyCornerMove(imageStateRef.current, pointIdx, dt);
      setShownState(newRect);
      onDragging(imageStateRef.current.rect.id, newRect);
    },
    [imageStateRef, onDragging],
  );

  const onCornerDragEnd = useCallback(
    (pointIdx: number, dt: Point2d) => {
      const newState = applyCornerMove(imageStateRef.current, pointIdx, dt);
      onDragEnd(imageStateRef.current.rect.id, newState);
    },
    [imageStateRef, onDragEnd],
  );

  const onArrowDrag = useCallback(
    (dt: Point2d) => {
      const newRect = applyMove(imageStateRef.current, dt);
      setShownState(newRect);
      onDragging(imageStateRef.current.rect.id, newRect);
    },
    [imageStateRef, onDragging],
  );

  const onArrowDragEnd = useCallback(
    (dt: Point2d) => {
      const newState = applyMove(imageStateRef.current, dt);
      onDragEnd(imageStateRef.current.rect.id, newState);
    },
    [imageStateRef, onDragEnd],
  );

  const scaleIndependent = useCallback(
    (v: number) => v / imageStateRef.current.scale,
    [imageStateRef],
  );

  const isSelected = rect.id === selectedRectangleId;

  const rectSvgStyle = css`
    pointer-events: none;
    stroke-dasharray: 10;
    stroke: ${rect.color};
    fill: ${isSelected ? `${rect.color}20` : "none"};
    stroke-width: ${Math.min(scaleIndependent(10), 7)};
  `;

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
        class={rectSvgStyle}
      />

      {/* mid lines */}
      <RectGridSvg
        rect={shownRect}
        color={rect.color}
        scaleIndependent={scaleIndependent}
      />

      {/* arrow */}
      <RectArrowSvg
        rect={shownRect}
        color={rect.color}
        onDrag={onArrowDrag}
        onDragEnd={onArrowDragEnd}
        scaleIndependent={scaleIndependent}
      />

      {/* corners */}
      {shownRect.map((pp, idx) => (
        <RectCornerSvg
          key={idx}
          idx={idx}
          point={pp}
          color={rect.color}
          scaleIndependent={scaleIndependent}
          onDrag={onCornerDrag}
          onDragEnd={onCornerDragEnd}
          maxRadius={borderSafeSpace}
        />
      ))}
    </Fragment>
  );
};
