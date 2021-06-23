import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../style";

interface Props {
  name: string;
  theme: s.AppTheme;
}

export const ScreenName: FC<Props> = ({ name, theme }) => {
  const container = css`
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    border-bottom-left-radius: ${s.borderRadius("m")};
    border-bottom-right-radius: ${s.borderRadius("m")};
  `;

  return (
    <div class={cx(container, s.imageInfoTopStyle(theme), s.textNormal)}>
      {name}
    </div>
  );
};
