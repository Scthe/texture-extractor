import { css, cx } from "@emotion/css";
import { h } from "preact";

import { resetImageStorage, useAppStatePartial } from "../state/AppState";
import type { FallbackProps } from "../utils/withErrorBoundary";
import { Button } from "../components/Button";
import * as s from "../style";

const modal = css`
  max-width: 600px;
  padding: ${s.spacing(4)};
  text-align: center;
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ErrorFallback = (props: FallbackProps) => {
  const { image, setImage } = useAppStatePartial("setImage", "image");

  const resetState = () => {
    resetImageStorage(image);
    setImage(null, undefined);
    props.resetError();
  };

  return (
    <div>
      <div class={cx(s.theme(s.ThemePurple), s.modal, modal)}>
        <h1>Oops!</h1>
        <p>
          It looks that something went wrong. We will look into that later.
          Meanwile..
        </p>
        <Button onClick={resetState}>Restart App</Button>
      </div>
    </div>
  );
};
