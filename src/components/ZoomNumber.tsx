import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";
import * as s from "../style";

const container = css`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--primary);
  padding: ${s.spacing(0.5, 4, 1)};
  border-bottom-left-radius: ${s.borderRadius("s")};
`;

interface Props {
  zoom: number;
}

export const ZoomNumber: FC<Props> = ({ zoom }) => {
  return (
    <div class={cx(s.textNormal, container)}>
      {`zoom ${Math.floor(zoom * 100)}%`}
    </div>
  );
};
