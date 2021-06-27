import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../style";
import { Icon } from "./Icon";

const style = css`
  margin: 0;
  padding: ${s.spacing(2, 3)};
  background-color: var(--primary);
  cursor: pointer;
  border-style: none;
  border-radius: ${s.borderRadius("s")};
  outline: 0 !important;
  position: relative;

  transition: background-color ${s.ANIMATION.fast};
  &:hover {
    background-color: var(--primary-light);
  }
`;

const withIcon = css`
  padding-left: 43px;
`;

const iconStyle = css`
  position: absolute;
  top: 4px;
  left: ${s.spacing(3)};
  font-size: 24px;
`;

const disabledStyle = css`
  opacity: 0.5;
  cursor: not-allowed;
`;

interface Props {
  icon?: string;
  title?: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  icon,
  title,
  className,
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        s.textWhite,
        style,
        icon != null && withIcon,
        className,
        disabled && disabledStyle,
      )}
      title={title}
    >
      {icon != null ? <Icon className={iconStyle} name={icon} /> : null}
      {children}
    </button>
  );
};
