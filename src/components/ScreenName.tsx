import { h, FunctionComponent as FC } from "preact";
import { createPortal } from "preact/compat";
import { css, cx } from "@emotion/css";

import * as s from "../style";
import { useBoolState } from "../hooks/useBoolState";
import { modalContainer } from "../App";
import { HelpModal, HelpText } from "./HelpModal";
import { Icon } from "./Icon";

const container = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;
const animContainer = css`
  background-color: var(--primary);
  padding: ${s.spacing(0.5, 4, 1)};
  text-align: center;
  border-bottom-left-radius: ${s.borderRadius("m")};
  border-bottom-right-radius: ${s.borderRadius("m")};
  cursor: pointer;

  transition-property: background-color, transform;
  transition-duration: ${s.ANIMATION.fast};
  transform-origin: top center;
  &:hover {
    transform: scale(1.3);
    background-color: var(--primary-light);
  }
`;

const helpIcon = css`
  margin-left: ${s.spacing(2)};
  position: relative;
  top: 3px;
  font-size: 15px;
`;

interface Props {
  name: string;
  theme: s.AppTheme;
  helpText: HelpText;
}

export const ScreenName: FC<Props> = ({ name, helpText, theme }) => {
  const {
    value: isHelpOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolState(false);

  return (
    <div
      class={cx(s.textNormal, container)}
      onClick={openModal}
      title="Show instructions"
    >
      <div class={animContainer}>
        {name}
        <Icon name="help" className={helpIcon} />
        {createPortal(
          <HelpModal
            isOpen={isHelpOpen}
            setClosed={closeModal}
            text={helpText}
            theme={theme}
          />,
          modalContainer,
        )}
      </div>
    </div>
  );
};
