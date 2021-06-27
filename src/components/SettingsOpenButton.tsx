import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";
import * as s from "../style";
import { Icon } from "./Icon";

const SIZE = "80px";

const cogIcon = css`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 11px;
  font-size: 40px;

  transition: transform ${s.ANIMATION.fast};
  *:hover > & {
    transform: rotate(90deg);
  }
`;
const container = css`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--primary);
  border-top-left-radius: ${SIZE};
  width: ${SIZE};
  height: ${SIZE};
  cursor: pointer;

  transition-property: background-color, transform;
  transition-duration: ${s.ANIMATION.fast};
  transform-origin: bottom right;
  &:hover {
    transform: scale(1.3);
    background-color: var(--primary-light);
  }
`;

interface Props {
  setSettingsOpen: (nextOpen: boolean) => void;
}

export const SettingsOpenButton: FC<Props> = ({ setSettingsOpen }) => {
  const handler = () => setSettingsOpen(true);

  return (
    <div class={cx(container)} onClick={handler} title="Show settings panel">
      <Icon name="settings" className={cx(s.textWhite, cogIcon)} />
    </div>
  );
};
