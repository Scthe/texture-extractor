import { h, FunctionComponent as FC, Fragment } from "preact";
import { Ref, useCallback, useEffect, useRef, useState } from "preact/hooks";
import { css } from "@emotion/css";
import clonedeep from "lodash.clonedeep";
import PointerTracker, { Pointer, InputEvent } from "pointer-tracker";


import { useLatest } from "../hooks/useLatest";
import { add2d, between2d, midpoint2d, mul2d, sub2d } from "../utils";

const POINTER_ID = 0;
const ATTR_POINT_IDX = "data-pointer-idx";

function cancelEvent(e: Event) {
  e.stopPropagation();
  return false;
}

const coord = (p: Point2d) => `${p.x}, ${p.y}`;
const getDelta = (startPos: Point2d, pointer: Pointer): Point2d => ({
  x: pointer.pageX - startPos.x,
  y: pointer.pageY - startPos.y,
});
const getPointIdx = (e: InputEvent): number | undefined => {
  const d = parseInt((e.target as any)?.getAttribute(ATTR_POINT_IDX), 10);
  return d >= 0 && d < 4 ? d : undefined;
};
const applyMove = (rect: Rect, pointIdx: number, dt: Point2d, scale: number): Rect => {
  const newState = clonedeep<typeof rect>(rect);
  newState[pointIdx] = add2d(rect[pointIdx], mul2d(dt, 1.0 / scale));
  return newState;
}

const rectSvgStyle = css`
  stroke-width: 5;
  fill: none;
  pointer-events: none;
  stroke-dasharray: 10;
`;
const midlineStyle = css`
  stroke-width: 2;
  fill: none;
  pointer-events: none;
  stroke: #646464;
  stroke-dasharray: 5;
`;
const arrowStyle = css`
  stroke-width: 1;
  pointer-events: none;
  fill: #13618561;
  stroke: #136185;
`;

interface Props {
  rect: Rect;
  updateRect: (rect: Rect) => void;
  onPreviewUpdate: (rect: Rect) => void;
  scaleRef: Ref<number>;
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands
// TODO do not cover the corner

export const RectSvg: FC<Props> = ({ rect, updateRect, onPreviewUpdate, scaleRef }) => {
  const point0SvgRef = useRef<SVGEllipseElement>();
  const point1SvgRef = useRef<SVGEllipseElement>();
  const point2SvgRef = useRef<SVGEllipseElement>();
  const point3SvgRef = useRef<SVGEllipseElement>();
  const pointRefs = [
    point0SvgRef,
    point1SvgRef,
    point2SvgRef,
    point3SvgRef,
  ];

  const [shownRect, setShownState] = useState<Rect>(clonedeep(rect));
  useEffect(() => {
    // console.log("---RECT CHAGNED---");
    setShownState(clonedeep(rect));
  }, [rect]);

  const rectRef = useLatest(rect);

  const onMove = useCallback((pointIdx: number, dt: Point2d) => {
    const newRect = applyMove(rectRef.current, pointIdx, dt, scaleRef.current);
    setShownState(newRect);
    onPreviewUpdate(newRect);
  }, []);

  const onEnd = useCallback((pointIdx: number, dt: Point2d) => {
    // TODO ensurePositionIsOk();
    const newState = applyMove(rectRef.current, pointIdx, dt, scaleRef.current);
    updateRect(newState);
  }, []);

  useEffect(() => {
    const trackers = pointRefs.map(pp => {
      let startPos: Point2d = { x: 0, y: 0 };

      return new PointerTracker(pp.current as any, {
        start(pointer, event) {
          cancelEvent(event);
          const pointIdx = getPointIdx(event);
          if (pointer.id !== POINTER_ID || pointIdx == null) { return false }

          // console.log(`start p=${pointIdx}`, { pointer, event });
          startPos.x = pointer.pageX;
          startPos.y = pointer.pageY;
          return true;
        },
        move(_previousPointers, changedPointers, event) {
          cancelEvent(event);
          const pointIdx = getPointIdx(event);
          const pointer = changedPointers.find(p => p.id === POINTER_ID);
          if (pointer == null || pointIdx == null) { return; }

          const dt = getDelta(startPos, pointer);
          // console.log(`move p=${pointIdx}: ${dt.x},${dt.y}`, { startPos, pointer, event });
          onMove(pointIdx, dt);
        },
        end(pointer, event, cancelled) {
          cancelEvent(event);
          const pointIdx = getPointIdx(event);
          if (pointer.id !== POINTER_ID || pointIdx == null) { return; }

          const dt = getDelta(startPos, pointer);
          // console.log(`end p=${pointIdx}: ${dt.x},${dt.y}`, { pointer, event, cancelled });
          onEnd(pointIdx, dt);
          startPos = { x: 0, y: 0 };
        },
        rawUpdates: false,
      });
    });

    return () => {
      trackers.forEach(t => t.stop())
    };
  }, []);

  const radius = 10;
  const arrowWidth = 0.1;
  const arrowHeight = 0.2;
  // draw arrow up inside - clearly comunicates the state of rect
  const midTop = midpoint2d(shownRect[2], shownRect[3])
  const midBottom = midpoint2d(shownRect[0], shownRect[1])
  const midLeft = midpoint2d(shownRect[0], shownRect[2])
  const midRight = midpoint2d(shownRect[1], shownRect[3])
  const arrowBottom = between2d(midTop, midBottom, 0.5 + arrowHeight);

  return (
    <Fragment>
      <path
        d={[
          `M ${coord(shownRect[0])}`,
          `L ${coord(shownRect[1])}`,
          `L ${coord(shownRect[3])}`,
          `L ${coord(shownRect[2])}`,
          `L ${coord(shownRect[0])}`
        ].join(" ")}
        stroke="#a557b8"
        class={rectSvgStyle}
      />
      {/* mid lines */}
      <path
        d={[
          `M ${coord(midTop)}`,
          `L ${coord(midBottom)}`,
          `M ${coord(midLeft)}`,
          `L ${coord(midRight)}`,
        ].join(" ")}
        class={midlineStyle}
      />
      {/* arrow */}
      <path
        d={[
          `M ${coord(between2d(midLeft, midRight, 0.5 - arrowWidth))}`,
          `L ${coord(between2d(midTop, midBottom, 0.5 - arrowHeight / 2))}`,
          `L ${coord(between2d(midLeft, midRight, 0.5 + arrowWidth))}`,
          `L ${coord(between2d(midLeft, midRight, 0.5 + arrowWidth / 3))}`,
          `L ${coord(
            add2d(arrowBottom,
              sub2d(
                between2d(midLeft, midRight, 0.5 + arrowWidth / 3),
                midpoint2d(midLeft, midRight)
              )
            )
          )}`,
          `L ${coord(
            add2d(arrowBottom,
              sub2d(
                between2d(midLeft, midRight, 0.5 - arrowWidth / 3),
                midpoint2d(midLeft, midRight)
              )
            )
          )}`,
          `L ${coord(between2d(midLeft, midRight, 0.5 - arrowWidth / 3))}`,
          `L ${coord(between2d(midLeft, midRight, 0.5 - arrowWidth))}`,
        ].join(" ")}
        class={arrowStyle}
      />
      {/* corners. TODO make transparent big circles as handles instead */}
      {
        shownRect.map((pp, idx) =>
          <ellipse
            key={idx}
            cx={pp.x}
            cy={pp.y}
            rx={radius}
            ry={radius}
            fill="#57b87c"
            ref={pointRefs[idx]}
            {...{ [ATTR_POINT_IDX]: idx }}
          />
        )
      }
    </Fragment>
  );
};