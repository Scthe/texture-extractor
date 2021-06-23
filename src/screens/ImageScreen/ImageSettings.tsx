import { h, FunctionComponent as FC } from "preact";
import { cx } from "@emotion/css";

import { SettingsPanel } from "../../components/SettingsPanel";
import { SettingsSection } from "../../components/SettingsSection";
import { Button } from "../../components/Button";
import { Checkbox, CheckboxLabel } from "../../components/Checkbox";
import * as s from "../../style";

interface Props {
  theme: s.AppTheme;
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
  isDimed: boolean;
  setIsDimed: (v: boolean) => void;
}

export const ImageSettings: FC<Props> = ({
  theme,
  isOpen,
  setSettingsOpen,
  isDimed,
  setIsDimed,
}) => {
  return (
    <SettingsPanel isOpen={isOpen || true} setSettingsOpen={setSettingsOpen}>
      <SettingsSection className={s.flexCenter}>
        <Button
          theme={theme}
          icon="close"
          onClick={() => {}} // TODO close image
        >
          Close Image
        </Button>
      </SettingsSection>

      {/* TODO Rectangle selection
      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
      </SettingsSection>
       */}

      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
        <CheckboxLabel id="image-dim-checkbox">Dim</CheckboxLabel>
        <Checkbox
          id="image-dim-checkbox"
          theme={theme}
          checked={isDimed}
          onChecked={setIsDimed}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
