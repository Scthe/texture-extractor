import { h, FunctionComponent as FC } from "preact";
import { css } from "@emotion/css";

import { RectSvg } from "../../components/RectSvg";
import { ZoomNumber } from "../../components/ZoomNumber";
import { ScreenName } from "../../components/ScreenName";
import { SettingsOpenButton } from "../../components/SettingsOpenButton";
import { usePinchScaleChange } from "../../hooks/usePinchScaleChange";
import { useBoolState } from "../../hooks/useBoolState";
import { ImageSettings } from "./ImageSettings";

import * as s from "../../style";

const dimedImage = css`
  opacity: 0.4;
`;

interface Props {
  points: Rect;
  imageData: AppImageData;
  imageUrl: string;
  setPoints: (rect: Rect) => void;
  onPreviewUpdate: (rect: Rect) => void;
}

export const ImageScreen: FC<Props> = ({
  points,
  imageData,
  imageUrl,
  setPoints,
  onPreviewUpdate,
}) => {
  const { width: imgWidth, height: imgHeight, borderSafeSpace } = imageData;
  const [isSettingsOpen, setSettingsOpen] = useBoolState(false);

  const [isDimed, setIsDimed] = useBoolState(true);

  const [zoom, onPinchZoomChange] = usePinchScaleChange();

  return (
    <div class={s.appColumnStyle}>
      <pinch-zoom class={s.pinchZoomStyle} onChange={onPinchZoomChange}>
        <div
          style={[
            `width: ${imgWidth + 2 * borderSafeSpace}px;`,
            `height: ${imgHeight + 2 * borderSafeSpace}px;`,
          ].join(" ")}
        >
          <img
            src={imageUrl}
            alt="test"
            class={isDimed ? dimedImage : ""}
            style={`padding: ${borderSafeSpace}px;`}
          />
          <svg class={s.fillAbsolute}>
            <RectSvg
              rect={points}
              updateRect={setPoints}
              onPreviewUpdate={onPreviewUpdate}
              scale={zoom}
              imageData={imageData}
            />
          </svg>
        </div>
      </pinch-zoom>

      <ZoomNumber theme={s.ThemePurple} zoom={zoom} />
      <ScreenName theme={s.ThemePurple} name="Input Image" />
      <SettingsOpenButton
        theme={s.ThemePurple}
        setSettingsOpen={setSettingsOpen}
      />
      <ImageSettings
        theme={s.ThemePurple}
        isOpen={isSettingsOpen}
        setSettingsOpen={setSettingsOpen}
        isDimed={isDimed}
        setIsDimed={setIsDimed}
      />
    </div>
  );
};
