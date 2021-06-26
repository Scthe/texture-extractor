import { h, FunctionComponent as FC } from "preact";
import { createPortal, useCallback } from "preact/compat";
import { css, cx } from "@emotion/css";

import * as s from "../style";
import { useBoolState } from "../hooks/useBoolState";
import { modalContainer } from "../App";
import { HelpModal, HelpText } from "./HelpModal";
import { Icon } from "./Icon";

interface Props {
  name: string;
  theme: s.AppTheme;
  helpText: HelpText;
}

const helpIcon = css`
  margin-left: ${s.spacing(2)};
  position: relative;
  top: 3px;
  font-size: 15px;
`;

export const ScreenName: FC<Props> = ({ name, helpText, theme }) => {
  const [isHelpOpen, setHelpOpen] = useBoolState(false);

  const container = css`
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    border-bottom-left-radius: ${s.borderRadius("m")};
    border-bottom-right-radius: ${s.borderRadius("m")};
    cursor: pointer;
  `;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openModal = useCallback(() => setHelpOpen(true), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeModal = useCallback(() => setHelpOpen(false), []);

  return (
    <div
      class={cx(
        container,
        s.imageInfoTopStyle(theme),
        s.textNormal,
        s.activableHover,
      )}
      onClick={openModal}
      title="Show instructions"
    >
      {name}
      <Icon name="help" className={helpIcon} />
      {createPortal(
        <HelpModal
          isOpen={isHelpOpen}
          setClosed={closeModal}
          text={helpText}
        />,
        modalContainer,
      )}
    </div>
  );
};
