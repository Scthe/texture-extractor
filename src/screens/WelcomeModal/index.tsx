import { h, FunctionComponent as FC } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { css, cx } from "@emotion/css";
import type { FileDropEvent } from "file-drop-element";
import "file-drop-element";

import * as s from "../../style";
import { Icon } from "../../components/Icon";
import { ImageAvatar } from "./ImageAvatar";
import { ExampleImage, EXAMPLE_IMAGES } from "./exampleImages";
import { decodeImage } from "../../utils/decodeImage";

const dimmer = css`
  background-color: rgba(0, 0, 0, 0.5);
`;
const modal = css`
  max-width: 600px;
  margin: 50px auto 0;
  padding-top: ${s.spacing(4)};
  border-radius: ${s.borderRadius("m")};
  background-color: ${s.COLORS.dirtyWhite};
  overflow: hidden;
`;

const header = css``;

const uploadImage = css`
  padding: ${s.spacing(8)} 0;
`;
const uploadImageContent = css`
  position: relative;
`;

const purpleSvg = css`
  position: absolute;
  overflow: initial;
`;

const purpleRect = css`
  fill: ${s.COLORS.themePurple};
  opacity: 0.33;
`;

const uploadButtonForm = css`
  position: relative;
`;

const uploadIcon = css`
  font-size: 100px;
  max-width: 100px;
`;

const h2Text = css`
  margin: 0;
  font-size: 1rem;
`;

const exampleImages = css`
  background-color: ${s.COLORS.themeTeal};
  border-radius: ${s.borderRadius("l")} ${s.borderRadius("l")} 0 0;
  padding-top: ${s.spacing(5)};
`;

const imagesGrid = css`
  display: grid;
  justify-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: ${s.spacing(5)} 0;
  grid-template-columns: repeat(3, 1fr);
  max-width: 450px;
`;

const dropStyle = css`
  overflow: hidden;
  touch-action: none;
  height: 100%;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    display: block;
    left: 10px;
    top: 10px;
    right: 10px;
    bottom: 10px;
    pointer-events: none;
    background-color: ${s.COLORS.themePurple}28;
    border: 2px dashed ${s.COLORS.themePurple};
    border-radius: 10px;
    opacity: 0;
    transform: scale(0.95);
    transition: all ${s.ANIMATION.fast} ease-in;
    transition-property: transform, opacity;
  }

  &.drop-valid::after {
    opacity: 1;
    transform: scale(1);
    transition-timing-function: ease-out;
  }
`;

interface Props {
  isOpen: boolean;
  // setImage: () => void;
}

const getExampleAsFile = async (img: ExampleImage) => {
  // try {
  // this.setState({ fetchingDemoIndex: index });
  const blob = await fetch(img.url).then((r) => r.blob());
  const filename = img.url.substring(img.url.lastIndexOf("/") + 1);
  return new File([blob], filename, { type: blob.type });
  // TODO error handling
  // this.props.onFile!(file);
  // } catch (err) {
  // this.setState({ fetchingDemoIndex: undefined });
  // this.props.showSnack!("Couldn't fetch demo image");
  // }
};


export const WelcomeModal: FC<Props> = ({ isOpen }) => {
  const rectShared = {
    class: purpleRect,
    rx: s.borderRadius("m"),
    ry: s.borderRadius("m"),
    width: 350,
    height: 200,
  };

  const fileInputEl = useRef<HTMLInputElement>();
  const handleOpenClick = () => {
    fileInputEl.current && fileInputEl.current.click();
  };

  const startEditorWithFile = useCallback((file: File, isExample: boolean) => {
    console.log("SELECTED", file);
    fileInputEl.current && (fileInputEl.current.value = "");
    const abortCtrl = new AbortController();
    decodeImage(abortCtrl.signal, file).then((d) => {
      console.log(d); // TODO error handling
    });
  }, []);

  const handleDemoClick = useCallback((img: ExampleImage) => {
    getExampleAsFile(img).then((f) => startEditorWithFile(f, true));
  }, []);

  const handleFileChange = useCallback((event: Event): void => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    startEditorWithFile(file, false);
  }, []);

  const handleFileDrop = useCallback(({ files }: FileDropEvent) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    startEditorWithFile(file, false);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div class={cx(s.fillAbsolute, dimmer)}>
      <file-drop onfiledrop={handleFileDrop} accept="image/*" class={dropStyle}>
        <div class={modal}>
          <input
            class={s.hide}
            ref={fileInputEl}
            type="file"
            onChange={handleFileChange}
          />

          <h1 class={cx(s.textCenter, s.noMargins, header)}>
            Texture extractor
          </h1>

          <section class={cx(s.flexCenter, uploadImage)}>
            <div
              class={cx(
                s.size("250px"),
                s.flexCenter,
                s.flexAltCenter,
                uploadImageContent,
              )}
            >
              <svg
                class={cx(purpleSvg, s.size("100%"))}
                preserveAspectRatio="xMidYMid slice"
              >
                <g transform="translate(-100 0)">
                  <rect {...rectShared} x="0" y="30" />
                  <rect {...rectShared} x="85" y="0" />
                  <rect {...rectShared} x="50" y="55" />
                </g>
              </svg>
              <div class={cx(s.textWhite, s.textCenter, uploadButtonForm)}>
                <button class={s.invisibleBtn} onClick={handleOpenClick}>
                  <Icon
                    name="image_plus"
                    className={cx(s.textWhite, uploadIcon)}
                  />
                </button>
                <h2 class={cx(s.fontNormal, h2Text)}>Drop image here</h2>
              </div>
            </div>
          </section>

          <section class={cx(s.textWhite, exampleImages)}>
            <h2 class={cx(s.fontNormal, s.textCenter, h2Text)}>
              Or try one of these:
            </h2>
            <ul class={imagesGrid}>
              {EXAMPLE_IMAGES.map((eImg) => (
                <ImageAvatar imageData={eImg} setImage={handleDemoClick} />
              ))}
            </ul>
          </section>
        </div>
      </file-drop>
    </div>
  );
};
