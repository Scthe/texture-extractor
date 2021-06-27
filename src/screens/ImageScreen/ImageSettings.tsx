import { css, cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";

import { SettingsPanel } from "../../components/SettingsPanel";
import { SettingsSection } from "../../components/SettingsSection";
import { Button } from "../../components/Button";
import { Checkbox, CheckboxLabel } from "../../components/Checkbox";
import { useAppStatePartial } from "../../state/AppState";
import * as s from "../../style";
import { RectangleItem } from "./RectangleItem";

const rectSection = css`
  display: block;
  padding-right: 0;
  padding-left: 0;
`;

const rectList = css`
  margin-top: ${s.spacing(2)};
  max-height: min(30vh, 150px);
  overflow-y: scroll;
  scrollbar-width: thin; // :)
`;

interface Props {
  isOpen: boolean;
  setSettingsOpen: (nextOpen: boolean) => void;
  isDimed: boolean;
  setIsDimed: (v: boolean) => void;
}

export const ImageSettings: FC<Props> = ({
  isOpen,
  setSettingsOpen,
  isDimed,
  setIsDimed,
}) => {
  const { setImage, rectangles, addRectangle } = useAppStatePartial(
    "setImage",
    "rectangles",
    "addRectangle",
  );

  return (
    <SettingsPanel
      title="Input Settings"
      isOpen={isOpen}
      setSettingsOpen={setSettingsOpen}
    >
      <SettingsSection className={s.flexCenter}>
        <Button
          icon="close"
          title="Close current image and start with a new one"
          onClick={() => {
            setImage(null);
          }}
        >
          Close Image
        </Button>
      </SettingsSection>

      <SettingsSection className={rectSection}>
        <div class={s.flexCenter}>
          <Button
            icon="add"
            title="Add new selection area to extract another part of the image"
            onClick={() => {
              addRectangle();
            }}
          >
            Add New Selection Area
          </Button>
        </div>
        <ul class={cx(s.noMargins, rectList)}>
          {rectangles.map((rect) => (
            <RectangleItem
              key={rect.id}
              rect={rect}
              isDeletable={rectangles.length > 1}
            />
          ))}
        </ul>
      </SettingsSection>

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
          checked={isDimed}
          onChecked={setIsDimed}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};
