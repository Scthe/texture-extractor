import { h, FunctionComponent as FC, Fragment } from "preact";
import { css } from "@emotion/css";

import { midpoint2d, svgLinePath } from "../utils";

const midlineStyle = css`
  stroke-width: 2;
  fill: none;
  pointer-events: none;
  stroke: #646464;
  stroke-dasharray: 5;
`;
const quaterStyle = css`
  stroke-width: 1;
  fill: none;
  pointer-events: none;
  stroke: #646464ea;
  stroke-dasharray: 5;
`;

interface Props {
  rect: Rect;
}

export const RectGridSvg: FC<Props> = ({ rect }) => {
  const midTop = midpoint2d(rect[2], rect[3]);
  const midBottom = midpoint2d(rect[0], rect[1]);
  const midLeft = midpoint2d(rect[0], rect[2]);
  const midRight = midpoint2d(rect[1], rect[3]);

  return (
    <Fragment>
      <path
        d={[
          svgLinePath(midTop, midBottom),
          svgLinePath(midLeft, midRight),
        ].join(" ")}
        class={midlineStyle}
      />
      <path
        d={svgLinePath(rect[1], rect[2])}
        stroke="red"
        strokeWidth={3}
      />
      <path
        d={[
          svgLinePath(
            midpoint2d(midLeft, rect[2]),
            midpoint2d(midRight, rect[3]),
          ),
          svgLinePath(
            midpoint2d(midLeft, rect[0]),
            midpoint2d(midRight, rect[1]),
          ),
          svgLinePath(
            midpoint2d(midTop, rect[2]),
            midpoint2d(midBottom, rect[0]),
          ),
          svgLinePath(
            midpoint2d(midTop, rect[3]),
            midpoint2d(midBottom, rect[1]),
          ),
        ].join(" ")}
        class={quaterStyle}
      />
    </Fragment>
  );
};