import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../style";
import { Button } from "./Button";

const modal = css`
  max-width: 600px;
  padding: ${s.spacing(4)};
`;

const textStyle = css`
  margin-bottom: ${s.spacing(4)};
`;

const buttonStyle = css`
  display: block;
  margin: 0 auto;
`;

export type HelpText = string[];

interface Props {
  text: HelpText;
  isOpen: boolean;
  setClosed: () => void;
}

export const HelpModal: FC<Props> = ({ text, isOpen, setClosed }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div class={s.modalDimmer}>
      <div class={cx(s.modal, modal)}>
        {text.map((textString, idx) => (
          <p key={idx} class={cx(s.noMargins, textStyle)}>
            {textString}
          </p>
        ))}

        {/* TODO theme from props */}
        <Button
          theme={s.ThemePurple}
          onClick={setClosed}
          className={buttonStyle}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
