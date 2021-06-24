import { h, FunctionComponent as FC } from "preact";
import { useRef } from "preact/hooks";
import { css } from "@emotion/css";
import { useDrag } from "../hooks/useDrag";
import * as s from "../style";

// OR make invisible big circles as handles instead
const RADIUS = 20;

interface Props {
  idx: number;
  point: Point2d;
  color: string;
  maxRadius: number;
  scaleIndependent: (v: number) => number;
  onDrag: (pointIdx: number, dt: Point2d) => void;
  onDragEnd: (pointIdx: number, dt: Point2d) => void;
}

export const RectCornerSvg: FC<Props> = ({
  idx,
  point,
  color,
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

  const cornerStyle = css`
    cursor: pointer;
    transition: fill ${s.ANIMATION.fast};
    stroke-width: ${radius / 6};
    stroke: ${color};
    &:hover {
      fill: transparent;
    }
  `;

  return (
    <ellipse
      cx={point.x}
      cy={point.y}
      rx={radius}
      ry={radius}
      fill={`${color}`}
      ref={svgElRef}
      class={cornerStyle}
    />
  );
};
