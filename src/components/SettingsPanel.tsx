import { h, FunctionComponent as FC } from "preact";
import { useCallback } from "preact/hooks";
import { css, cx } from "@emotion/css";

import * as s from "../style";
import { Icon } from "./Icon";

interface Props {
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
  title: string;
  theme: s.AppTheme;
}

const titleText = css`
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 16px;
  font-weight: normal;
`;
const hideIcon = css`
  flex-grow: 0;
  flex-shrink: 0;
  padding: ${s.spacing(0, 1, 0, 2)};
  cursor: pointer;
`;

export const SettingsPanel: FC<Props> = ({
  isOpen,
  setSettingsOpen,
  title,
  theme,
  children,
}) => {
  const hideSettings = useCallback(
    () => setSettingsOpen(false),
    [setSettingsOpen],
  );

  const container = css`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${s.COLORS.white};
    border-top-left-radius: ${s.borderRadius("m")};
    width: 240px;
    max-width: 100%;
  `;
  const header = css`
    background-color: ${theme.primary};
    border-top-left-radius: ${s.borderRadius("m")};
    width: 100%;
    height: 32px;
    padding: ${s.spacing(3, 4)};
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <div class={cx(container)}>
      <div class={cx(s.flexSides, s.flexAltCenter, header)}>
        <h2 class={cx(s.textWhite, titleText)}>{title}</h2>
        <Icon
          name="expand_more"
          title="Hide settings panel"
          className={cx(s.textWhite, s.activableHover, hideIcon)}
          onClick={hideSettings}
        />
      </div>

      {children}
    </div>
  );
};
