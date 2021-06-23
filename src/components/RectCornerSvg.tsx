import { h, FunctionComponent as FC } from "preact";
import { useRef } from "preact/hooks";
import { css } from "@emotion/css";
import { useDrag } from "../hooks/useDrag";

// TODO make invisible big circles as handles instead
const RADIUS = 20;

// TODO different colors - put inside class to manipulate
const cornerStyle = css`
  cursor: pointer;
  transition: fill 0.5s;
  stroke-width: 0;
  &:hover {
    fill: #287445; // TODO or https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient ?
    stroke: #57b87c;
  }
`;

interface Props {
  idx: number;
  point: Point2d;
  maxRadius: number;
  scaleIndependent: (v: number) => number;
  onDrag: (pointIdx: number, dt: Point2d) => void;
  onDragEnd: (pointIdx: number, dt: Point2d) => void;
}

export const RectCornerSvg: FC<Props> = ({
  idx,
  point,
  scaleIndependent,
  maxRadius,
  onDrag,
  onDragEnd,
}) => {
  const svgElRef = useRef<SVGEllipseElement>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDrag(svgElRef.current as any, {
    onDrag: (e) => onDrag(idx, e.delta),
    onDragEnd: (e) => onDragEnd(idx, e.delta),
  });

  const radius = Math.min(scaleIndependent(RADIUS), maxRadius - 2);

  return (
    <ellipse
      cx={point.x}
      cy={point.y}
      rx={radius}
      ry={radius}
      fill="#57b87c"
      ref={svgElRef}
      class={cornerStyle}
      style={`stroke-width: ${radius / 6}`}
    />
  );
};
