import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";
import * as s from "../style";
import type { AppTheme } from "../style";
import { Icon } from "./Icon";

interface Props {
  theme: AppTheme;
  icon?: string;
  onClick: () => void;
}

export const Button: FC<Props> = ({ icon, theme, onClick, children }) => {
  const style = css`
    margin: 0;
    padding: ${s.spacing(2, 3)};
    background-color: ${theme.primary};
    cursor: pointer;
    border-style: none;
    border-radius: ${s.borderRadius("s")};
    outline: 0 !important;
    position: relative;
    ${s.activableHover}
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

  return (
    <button
      onClick={onClick}
      className={cx(s.textWhite, style, icon != null && withIcon)}
    >
      {icon != null ? <Icon className={iconStyle} name={icon} /> : null}
      {children}
    </button>
  );
};
