import { cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";
import { SettingsPanel } from "../../components/SettingsPanel";
import { SettingsSection } from "../../components/SettingsSection";
import { Button } from "../../components/Button";
import { Checkbox, CheckboxLabel } from "../../components/Checkbox";
import * as s from "../../style";
import { useBoolState } from "../../hooks/useBoolState";

interface Props {
  theme: s.AppTheme;
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
}
// TODO donwload all, or ziped separate

export const UvSettings: FC<Props> = ({ theme, isOpen, setSettingsOpen }) => {
  const [isSoften, setSoften] = useBoolState(false);

  return (
    <SettingsPanel isOpen={isOpen || true} setSettingsOpen={setSettingsOpen}>
      <SettingsSection className={s.flexCenter}>
        <Button
          theme={theme}
          icon="file_download"
          onClick={() => {}} // TODO download image
        >
          Download Image
        </Button>
      </SettingsSection>

      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
        <CheckboxLabel id="uv-soften-checkbox">Soften</CheckboxLabel>
        <Checkbox
          id="uv-soften-checkbox"
          theme={theme}
          checked={isSoften}
          onChecked={setSoften}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
