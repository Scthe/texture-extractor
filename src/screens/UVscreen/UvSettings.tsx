import { cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";
import { SettingsPanel } from "../../components/SettingsPanel";
import { SettingsSection } from "../../components/SettingsSection";
import { Button } from "../../components/Button";
import { Checkbox, CheckboxLabel } from "../../components/Checkbox";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";

interface Props {
  theme: s.AppTheme;
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
}

/*
TODO download button
if > 1: Download All: .zip
if > 1: Download All: .png
Download Current
*/

export const UvSettings: FC<Props> = ({ theme, isOpen, setSettingsOpen }) => {
  const { renderSmooth, setRenderSmooth } = useAppStatePartial(
    "renderSmooth",
    "setRenderSmooth",
  );

  return (
    <SettingsPanel
      theme={theme}
      title="Output Settings"
      isOpen={isOpen}
      setSettingsOpen={setSettingsOpen}
    >
      <SettingsSection className={s.flexCenter}>
        <Button
          theme={theme}
          icon="file_download"
          title="Download the result image for currently selected area"
          onClick={() => {}} // TODO download image
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
          theme={theme}
          checked={renderSmooth}
          onChecked={setRenderSmooth}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
