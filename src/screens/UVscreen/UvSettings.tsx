import { css, cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";

import { SettingsPanel } from "../../components/SettingsPanel";
import { SettingsSection } from "../../components/SettingsSection";
import { Button } from "../../components/Button";
import { Checkbox, CheckboxLabel } from "../../components/Checkbox";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { useResultDownload } from "./useResultDownload";

const buttonsSection = css`
  display: block;
`;

const downloadBtn = css`
  display: block;
  margin: 0 auto;

  &:not(:last-child) {
    margin-bottom: ${s.spacing(3)};
  }
`;

interface Props {
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
}

// TODO Download All as .zip?

export const UvSettings: FC<Props> = ({ isOpen, setSettingsOpen }) => {
  const appState = useAppStatePartial(
    "renderSmooth",
    "setRenderSmooth",
    "pinkBackground",
    "setPinkBackground",
    "rectangles",
  );
  const { downloadSelectedRect, downloadAllRects } = useResultDownload();
  const hasOneRectangle = appState.rectangles.length < 2;

  return (
    <SettingsPanel
      title="Output Settings"
      isOpen={isOpen}
      setSettingsOpen={setSettingsOpen}
    >
      <SettingsSection className={buttonsSection}>
        <Button
          icon="file_download"
          title="Download the result image for current selection area"
          onClick={downloadSelectedRect}
          className={downloadBtn}
        >
          Download Current
        </Button>
        <Button
          icon="download"
          title="Download all selected area results on a single image"
          onClick={() => {
            if (!hasOneRectangle) {
              downloadAllRects();
            }
          }}
          className={downloadBtn}
          disabled={hasOneRectangle}
        >
          Download All
        </Button>
      </SettingsSection>

      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
        <CheckboxLabel
          id="uv-soften-checkbox"
          title="Blur image. May improve result for certain types of content."
        >
          Smooth
        </CheckboxLabel>
        <Checkbox
          id="uv-soften-checkbox"
          title="Blur image. May improve result for certain types of content."
          checked={appState.renderSmooth}
          onChecked={appState.setRenderSmooth}
        />
      </SettingsSection>

      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
        <CheckboxLabel
          id="uv-alt-bg-checkbox"
          title="Alternative background for 'Download All' image."
        >
          Alt. Background
        </CheckboxLabel>
        <Checkbox
          id="uv-alt-bg-checkbox"
          title="Alternative background for 'Download All' image."
          checked={appState.pinkBackground}
          onChecked={appState.setPinkBackground}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
