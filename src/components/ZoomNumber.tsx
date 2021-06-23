import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../style";

interface Props {
  zoom: number;
  theme: s.AppTheme;
}

export const ZoomNumber: FC<Props> = ({ zoom, theme }) => {
  const container = css`
    right: 0;
    border-bottom-left-radius: ${s.borderRadius("s")};
  `;

  // TODO format to percentages, with only 2 decimal numbers
  return (
    <div class={cx(container, s.imageInfoTopStyle(theme), s.textNormal)}>
      {`zoom ${Math.floor(zoom * 100)}%`}
    </div>
  );
};
