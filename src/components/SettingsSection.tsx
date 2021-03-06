import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";
import * as s from "../style";

export const SETTINGS_SECTION_PADDING_H = 4;

const container = css`
  border-bottom: 1px solid ${s.COLORS.greyLight};
  &:last-child {
    border-bottom: 0px;
  }
`;

const content = css`
  padding: ${s.spacing(3, SETTINGS_SECTION_PADDING_H)};
  display: flex;
`;

interface Props {
  className?: string;
}

export const SettingsSection: FC<Props> = ({ className, children }) => {
  return (
    <div class={container}>
      <div class={cx(content, className)}>{children}</div>
    </div>
  );
};
