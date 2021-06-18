import { h, FunctionComponent as FC } from "preact";
import { useRef } from "preact/hooks";
import { css } from "@emotion/css";

import { useDrag } from "../hooks/useDrag";

// TODO make invisible big circles as handles instead
const RADIUS = 20;


// TODO different colors - put inside class to manipulate
const arrowStyle = css`
  cursor: pointer;
  transition: fill 0.5s;
  stroke-width: 0;
  &:hover {
    fill: #287445;
    stroke: #57b87c;
  }
`;

interface Props {
  idx: number;
  point: Point2d;
  scale: number;
  onDrag: (pointIdx: number, dt: Point2d) => void;
  onDragEnd: (pointIdx: number, dt: Point2d) => void;
}

export const RectCornerSvg: FC<Props> = ({
  idx, point, scale, onDrag, onDragEnd
}) => {
  const svgElRef = useRef<SVGEllipseElement>();

  useDrag(svgElRef.current as any, {
    onDrag: e => onDrag(idx, e.delta),
    onDragEnd: e => onDragEnd(idx, e.delta),
  });

  const radius = RADIUS / scale;

  return (
    <ellipse
      cx={point.x}
      cy={point.y}
      rx={radius}
      ry={radius}
      fill="#57b87c"
      ref={svgElRef}
      class={arrowStyle}
      style={`stroke-width: ${radius / 4}`}
    />
  );
};