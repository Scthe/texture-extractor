import { cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";
import { SettingsPanel } from "../../components/SettingsPanel";
import { SettingsSection } from "../../components/SettingsSection";
import { Button } from "../../components/Button";
import { Checkbox, CheckboxLabel } from "../../components/Checkbox";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { useResultDownload } from "./useResultDownload";

interface Props {
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
}

/*
TODO download button
if > 1: Download All: .zip
if > 1: Download All: .png
Download Current
*/

export const UvSettings: FC<Props> = ({ isOpen, setSettingsOpen }) => {
  const { renderSmooth, setRenderSmooth } = useAppStatePartial(
    "renderSmooth",
    "setRenderSmooth",
  );
  const { downloadSelectedRect } = useResultDownload();

  return (
    <SettingsPanel
      title="Output Settings"
      isOpen={isOpen}
      setSettingsOpen={setSettingsOpen}
    >
      <SettingsSection className={s.flexCenter}>
        <Button
          icon="file_download"
          title="Download the result image for current selection area"
          onClick={downloadSelectedRect}
        >
          Download Image
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
          checked={renderSmooth}
          onChecked={setRenderSmooth}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
