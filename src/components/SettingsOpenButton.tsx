import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../style";
import { Icon } from "./Icon";

const SIZE = "80px";

interface Props {
  setSettingsOpen: (nextOpen: boolean) => void;
  theme: s.AppTheme;
}

export const SettingsOpenButton: FC<Props> = ({ theme, setSettingsOpen }) => {
  const container = css`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${theme.primary};
    border-top-left-radius: ${SIZE};
    width: ${SIZE};
    height: ${SIZE};
    cursor: pointer;
    ${s.activableHover}
  `;
  const cogIcon = css`
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 11px;
    font-size: 40px;
  `;

  const handler = () => setSettingsOpen(true);

  return (
    <div class={cx(container)} onClick={handler}>
      <Icon name="settings" className={cx(s.textWhite, cogIcon)} />
    </div>
  );
};
