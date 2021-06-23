import { h, FunctionComponent as FC } from "preact";
import { css, cx } from "@emotion/css";

import * as s from "../../style";
import { Icon } from "../../components/Icon";

import exampleArch from "../../example-images/john-towner-UO02gAW3c0c-unsplash.jpg";
import type { ExampleImage } from "./exampleImages";

const dimmer = css`
  background-color: #00000080;
`;
const modal = css`
  max-width: 600px;
  margin: 50px auto 0;
  padding-top: ${s.spacing(3)};
  border-radius: ${s.borderRadius("m")};
  background-color: ${s.COLORS.dirtyWhite};
`;

const container = css`
  display: block;
`;

const imageWrapper = css`
  border-radius: 50%;
  position: relative;
  overflow: hidden;
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
      <button class={s.invisibleBtn} onClick={() => setImage(imageData)}>
        <div>
          <div class={imageWrapper}>
            <img
              src={imageData.thumbUrl}
              alt={`Example image - ${imageData.name}`}
              class={cx(image, s.size("100px"))}
            />
          </div>
          <div class={cx(s.textWhite, name)}>{imageData.name}</div>
        </div>
      </button>
    </li>
  );
};
