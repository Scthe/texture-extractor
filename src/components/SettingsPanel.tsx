import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../style";

interface Props {
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
}

// TODO add slide animation (if not reduced motion media query)

export const SettingsPanel: FC<Props> = ({
  isOpen,
  setSettingsOpen,
  children,
}) => {
  const container = css`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${s.COLORS.white};
    border-top-left-radius: ${s.borderRadius("m")};
    width: 240px;
  `;

  // TODO how to hide this panel?
  // const handler = () => setSettingsOpen(false);
  if (!isOpen) {
    return null;
  }

  return <div class={cx(container)}>{children}</div>;
};
