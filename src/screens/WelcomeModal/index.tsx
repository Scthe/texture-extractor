import { h, FunctionComponent as FC } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { css, cx } from "@emotion/css";
import type { FileDropEvent } from "file-drop-element";
import "file-drop-element";

import * as s from "../../style";
import { Icon } from "../../components/Icon";
import { decodeImage } from "../../utils/decodeImage";
import { useAppStatePartial } from "../../state/AppState";
import { useBoolState } from "../../hooks/useBoolState";
import { logError, logEvent } from "../../utils/log";
import { ImageAvatar } from "./ImageAvatar";
import { ExampleImage, EXAMPLE_IMAGES } from "./exampleImages";

const getFileAnalytics = (f: File) => ({ fileSize: f.size, fileType: f.type });

const modal = css`
  max-width: 600px;
  padding-top: ${s.spacing(4)};
`;

const header = css`
  color: #464646;
  font-size: 30px;
  font-weight: normal;
`;

const githubLink = css`
  position: absolute;
  top: 0;
  right: ${s.spacing(2)};

  a {
    color: ${s.COLORS.greyDark};
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const githubIcon = css`
  fill: ${s.COLORS.greyDark};
  position: relative;
  top: 6px;
  margin-right: ${s.spacing(1)};
  width: 18px;
`;

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

const errorBoxContainer = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const errorBox = css`
  background-color: ${s.COLORS.error};
  padding: ${s.spacing(0.5, 4, 1)};
  border-bottom-left-radius: ${s.borderRadius("m")};
  border-bottom-right-radius: ${s.borderRadius("m")};
  transform-origin: top center;
  animation-duration: ${s.ANIMATION.fast};
  animation-name: slidein;

  @keyframes slidein {
    from {
      transform: scale(0);
    }
    75% {
      transform: scale(1.3);
    }
    to {
      transform: scale(1);
    }
  }
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

const getExampleAsFile = async (img: ExampleImage) => {
  const blob = await fetch(img.url).then((r) => r.blob());
  const filename = img.url.substring(img.url.lastIndexOf("/") + 1);
  return new File([blob], filename, { type: blob.type });
};

export const WelcomeModal: FC<unknown> = () => {
  const { image, setImage } = useAppStatePartial("image", "setImage");
  const {
    value: hasError,
    setTrue: showError,
    setFalse: hideError,
  } = useBoolState(false);

  const rectSharedProps = {
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

  const startEditorWithFile = useCallback(
    (file: File, exampleImg: ExampleImage | null) => {
      fileInputEl.current && (fileInputEl.current.value = "");

      const abortCtrl = new AbortController();
      decodeImage(abortCtrl.signal, file)
        .then((imageData) => {
          logEvent("image_open", {
            ...getFileAnalytics(file),
            exampleImg: exampleImg?.name,
            width: imageData.width,
            height: imageData.height,
          });
          setImage({
            data: imageData,
            isExample: exampleImg != null,
            filename: exampleImg != null ? exampleImg.name : file.name,
          });
        })
        .catch((e) => {
          showError();
          logError("Error decoding image", e, {
            ...getFileAnalytics(file),
            exampleImg: exampleImg,
          });
        });
    },
    [setImage, showError],
  );

  const handleDemoClick = useCallback(
    (img: ExampleImage) => {
      hideError();
      logEvent("example_picked", { type: img.name });

      getExampleAsFile(img)
        .then((f) => startEditorWithFile(f, img))
        .catch((e) => {
          showError();
          logError("Example picking error", e, {
            type: img.name,
            exampleImg: img,
          });
        });
    },
    [hideError, showError, startEditorWithFile],
  );

  const handleFileChange = useCallback(
    (event: Event): void => {
      hideError();
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;

      logEvent("file_selected_browser", getFileAnalytics(file));
      startEditorWithFile(file, null);
    },
    [hideError, startEditorWithFile],
  );

  const handleFileDrop = useCallback(
    ({ files }: FileDropEvent) => {
      hideError();
      if (!files || files.length === 0) return;
      const file = files[0];

      logEvent("file_selected_drag_and_dropped", getFileAnalytics(file));
      startEditorWithFile(file, null);
    },
    [hideError, startEditorWithFile],
  );

  if (image != null) {
    return null;
  }

  return (
    <div class={s.modalDimmer}>
      <file-drop onfiledrop={handleFileDrop} accept="image/*" class={dropStyle}>
        <div class={cx(s.modal, modal)}>
          <input
            class={s.hide}
            ref={fileInputEl}
            type="file"
            onChange={handleFileChange}
          />

          <h1 class={cx(s.textCenter, s.noMargins, header)}>
            Texture Extractor
          </h1>

          <div class={githubLink}>
            <a
              href="https://github.com/Scthe/texture-extractor"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                logEvent("github_outgoing");
              }}
            >
              <svg
                class={githubIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Source on GitHub</span>
            </a>
          </div>

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
                  <rect {...rectSharedProps} x="0" y="30" />
                  <rect {...rectSharedProps} x="85" y="0" />
                  <rect {...rectSharedProps} x="50" y="55" />
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

      {hasError && (
        <div class={errorBoxContainer}>
          <div class={cx(s.textWhite, s.textCenter, errorBox)}>
            Could not load the image
          </div>
        </div>
      )}
    </div>
  );
};
