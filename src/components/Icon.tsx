import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

const materialIcons = css`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -moz-font-feature-settings: "liga";
  -moz-osx-font-smoothing: grayscale;
`;

interface Props {
  name: string;
  className?: string;
  title?: string;
  onClick?: h.JSX.MouseEventHandler<HTMLElement>;
}

export const Icon: FC<Props> = ({ name, title, onClick, className }) => {
  return (
    <span class={cx(materialIcons, className)} title={title} onClick={onClick}>
      {name}
    </span>
  );
};
