import { h, FunctionComponent as FC } from "preact";
import { css } from "@emotion/css";

import { add2d, between2d, midpoint2d, sub2d, svgPolygonPoints } from "../utils";
import { useDrag } from "../hooks/useDrag";

const arrowStyle = css`
  stroke-width: 1;
  pointer-events: none;
  fill: #13618561;
  stroke: #136185;
`;

interface Props {
  rect: Rect;
}

export const RectArrowSvg: FC<Props> = ({ rect }) => {
  // useDrag(svgElRef.current as any, {
  // onDrag: e => onDrag(idx, e.delta),
  // onDragEnd: e => onDragEnd(idx, e.delta),
  // });

  const midTop = midpoint2d(rect[2], rect[3]);
  const midBottom = midpoint2d(rect[0], rect[1]);
  const midLeft = midpoint2d(rect[0], rect[2]);
  const midRight = midpoint2d(rect[1], rect[3]);

  const arrowWidth = 0.1;
  const arrowHeight = 0.2;
  const arrowBottom = between2d(midTop, midBottom, 0.5 + arrowHeight);

  return (
    <polygon
      points={svgPolygonPoints(
        between2d(midLeft, midRight, 0.5 - arrowWidth), // left
        between2d(midTop, midBottom, 0.5 - arrowHeight / 2), // top
        between2d(midLeft, midRight, 0.5 + arrowWidth), // right
        between2d(midLeft, midRight, 0.5 + arrowWidth / 3), // mid-right
        add2d(arrowBottom, // bottom right
          sub2d(
            between2d(midLeft, midRight, 0.5 + arrowWidth / 3),
            midpoint2d(midLeft, midRight)
          )
        ),
        add2d(arrowBottom, // bottom left
          sub2d(
            between2d(midLeft, midRight, 0.5 - arrowWidth / 3),
            midpoint2d(midLeft, midRight)
          )
        ),
        between2d(midLeft, midRight, 0.5 - arrowWidth / 3), // mid-left
      )}
      class={arrowStyle}
    />
  );
};