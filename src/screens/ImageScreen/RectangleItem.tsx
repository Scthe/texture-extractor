import { css, cx } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";
import { useCallback } from "preact/hooks";

import { SETTINGS_SECTION_PADDING_H } from "../../components/SettingsSection";
import { Icon } from "../../components/Icon";
import { useAppStatePartial } from "../../state/AppState";
import { cancelEvent } from "../../utils";
import * as s from "../../style";

const COLOR_SIZE = "24px";

const rectItem = css`
  margin-bottom: ${s.spacing(1)};
  cursor: pointer;
  transition: background-color ${s.ANIMATION.fast};
  padding: ${s.spacing(1, SETTINGS_SECTION_PADDING_H)};
  &:hover {
    background-color: ${s.COLORS.dirtyWhite};
  }
`;

const rectItemSelected = css`
  background-color: ${s.COLORS.themePurple}20;
`;

const rectColor = css`
  flex-shrink: 0;
`;

const iconClass = css``;

const rectName = css`
  flex-grow: 1;
  padding: ${s.spacing(0, 2)};
`;

const rectDelete = css`
  flex-shrink: 0;
  color: ${s.COLORS.greyDark};
`;

const rectDeleteable = css`
  cursor: pointer;
  transition: color ${s.ANIMATION.fast};
  &:hover {
    color: var(--primary);
  }
`;

const rectNotDeleteable = css`
  cursor: not-allowed;
`;

interface Props {
  rect: SelectionRect;
  isDeletable: boolean;
}

export const RectangleItem: FC<Props> = ({ rect, isDeletable }) => {
  const { removeRectangle, selectRectangle, selectedRectangleId } =
    useAppStatePartial(
      "removeRectangle",
      "selectRectangle",
      "selectedRectangleId",
    );
  const isSelected = selectedRectangleId === rect.id;

  const remove = useCallback(
    (e: Event) => {
      removeRectangle(rect.id);
      return cancelEvent(e);
    },
    [rect.id, removeRectangle],
  );

  const select = useCallback(() => {
    selectRectangle(rect.id);
  }, [rect.id, selectRectangle]);

  return (
    <li
      class={cx(s.flexSides, rectItem, isSelected && rectItemSelected)}
      onClick={select}
    >
      <div
        class={cx(s.size(COLOR_SIZE), rectColor)}
        style={`background-color: ${rect.color}`}
      >
        {isSelected ? (
          <Icon name="check" className={cx(s.textWhite, iconClass)} />
        ) : null}
      </div>

      <div class={cx(s.ellipsis, rectName)}>{rect.id}</div>

      <Icon
        name="delete"
        title="Delete area"
        onClick={remove}
        className={cx(
          rectDelete,
          isDeletable ? rectDeleteable : rectNotDeleteable,
        )}
      />
    </li>
  );
};
