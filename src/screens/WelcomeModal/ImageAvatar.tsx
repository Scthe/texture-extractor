import { css, cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";
import * as s from "../../style";

import type { ExampleImage } from "./exampleImages";

const container = css`
  display: block;
`;

const imageWrapper = css`
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  transition: transform ${s.ANIMATION.fast};
  button:hover & {
    transform: scale(1.1);
  }
`;
const image = css`
  display: block;
`;
const name = css`
  text-transform: capitalize;
  margin-top: ${s.spacing(2)};
`;

interface Props {
  imageData: ExampleImage;
  setImage: (eImg: ExampleImage) => void;
}

export const ImageAvatar: FC<Props> = ({ imageData, setImage }) => {
  return (
    <li class={container}>
      <button
        title={imageData.tooltip}
        class={cx(s.invisibleBtn)}
        onClick={() => setImage(imageData)}
      >
        <div class={imageWrapper}>
          <img
            src={imageData.thumbUrl}
            alt={`Example image - ${imageData.name}`}
            class={cx(image, s.size("100px"))}
          />
        </div>
        <div class={cx(s.textWhite, name)}>{imageData.name}</div>
      </button>
    </li>
  );
};
