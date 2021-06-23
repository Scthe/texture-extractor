import { h, FunctionComponent as FC } from "preact";
import { useRef } from "preact/hooks";
import { css } from "@emotion/css";

import "pinch-zoom-element";
import {
  add2d,
  between2d,
  midpoint2d,
  sub2d,
  svgPolygonPoints,
} from "../utils";
import { useDrag } from "../hooks/useDrag";

interface Props {
  rect: Rect;
  scaleIndependent: (v: number) => number;
  onDrag: (dt: Point2d) => void;
  onDragEnd: (dt: Point2d) => void;
}

export const RectArrowSvg: FC<Props> = ({
  rect,
  scaleIndependent,
  onDrag,
  onDragEnd,
}) => {
  const svgElRef = useRef<SVGPolygonElement>();
  useDrag(svgElRef.current as any, {
    onDrag: (e) => onDrag(e.delta),
    onDragEnd: (e) => onDragEnd(e.delta),
  });

  const arrowStyle = css`
    cursor: pointer;
    fill: #13618561;
    stroke: #136185;
    transition: fill 0.5s;
    stroke-width: ${scaleIndependent(1)};
    &:hover {
      fill: #136185;
    }
  `;

  const midTop = midpoint2d(rect[2], rect[3]);
  const midBottom = midpoint2d(rect[0], rect[1]);
  const midLeft = midpoint2d(rect[0], rect[2]);
  const midRight = midpoint2d(rect[1], rect[3]);

  const arrowWidth = 0.1;
  const arrowHeight = 0.2;
  const arrowBottom = between2d(midTop, midBottom, 0.5 + arrowHeight);

  return (
    <polygon
      ref={svgElRef}
      points={svgPolygonPoints(
        between2d(midLeft, midRight, 0.5 - arrowWidth), // left
        between2d(midTop, midBottom, 0.5 - arrowHeight / 2), // top
        between2d(midLeft, midRight, 0.5 + arrowWidth), // right
        between2d(midLeft, midRight, 0.5 + arrowWidth / 3), // mid-right
        add2d(
          arrowBottom, // bottom right
          sub2d(
            between2d(midLeft, midRight, 0.5 + arrowWidth / 3),
            midpoint2d(midLeft, midRight),
          ),
        ),
        add2d(
          arrowBottom, // bottom left
          sub2d(
            between2d(midLeft, midRight, 0.5 - arrowWidth / 3),
            midpoint2d(midLeft, midRight),
          ),
        ),
        between2d(midLeft, midRight, 0.5 - arrowWidth / 3), // mid-left
      )}
      class={arrowStyle}
    />
  );
};
