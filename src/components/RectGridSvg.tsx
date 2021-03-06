import { h, FunctionComponent as FC, Fragment } from "preact";
import { css } from "@emotion/css";
import { midpoint2d, svgLinePath } from "../utils";

interface Props {
  rect: Rect;
  color: string;
  scaleIndependent: (v: number) => number;
}

/**
 * WARNING: THIS COMPONENT DEGRADES PERFORMANCE.
 * NO, REALLY, IT IS SLOW af.
 *
 * Not sure why. But it's 2:25AM here so I'm gonna if it out.
 */
export const RectGridSvg: FC<Props> = ({ rect, color, scaleIndependent }) => {
  const midTop = midpoint2d(rect[2], rect[3]);
  const midBottom = midpoint2d(rect[0], rect[1]);
  const midLeft = midpoint2d(rect[0], rect[2]);
  const midRight = midpoint2d(rect[1], rect[3]);

  const midlineStyle = css`
    fill: none;
    pointer-events: none;
    stroke: ${color}80;
    stroke-dasharray: ${scaleIndependent(15)};
    stroke-width: ${scaleIndependent(2)};
  `;
  const quaterStyle = css`
    fill: none;
    pointer-events: none;
    stroke: ${color}60;
    stroke-dasharray: ${scaleIndependent(5)};
    stroke-width: ${scaleIndependent(1.5)};
  `;

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
