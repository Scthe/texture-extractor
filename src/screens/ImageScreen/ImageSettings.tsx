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
  const { setImage } = useAppStatePartial("setImage");

  return (
    <SettingsPanel
      theme={theme}
      title="Input Settings"
      isOpen={isOpen}
      setSettingsOpen={setSettingsOpen}
    >
      <SettingsSection className={s.flexCenter}>
        <Button
          theme={theme}
          icon="close"
          title="Close current image and start with a new one"
          onClick={() => {
            setImage(null);
          }}
        >
          Close Image
        </Button>
      </SettingsSection>

      {/* TODO Rectangle selection
      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
        <Button>Add new selection</Button>
        <ul> (shows only 4.5lines) </ul>
      </SettingsSection>
       */}

      <SettingsSection className={cx(s.flexSides, s.flexAltCenter)}>
        <CheckboxLabel
          id="image-dim-checkbox"
          title="Shade the image for easier selection"
        >
          Dim
        </CheckboxLabel>
        <Checkbox
          id="image-dim-checkbox"
          title="Shade the image for easier selection"
          theme={theme}
          checked={isDimed}
          onChecked={setIsDimed}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
