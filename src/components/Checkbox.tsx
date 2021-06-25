import { h, FunctionComponent as FC } from "preact";
import { useCallback } from "preact/hooks";
import { css, cx } from "@emotion/css";
import * as s from "../style";
import { Icon } from "./Icon";

const baseClass = cx(
  s.size("32px"),
  s.activableHover,
  css`
    cursor: pointer;
    border: 2px solid #5a5a5a;
    border-radius: 1px;
    transition: all ${s.ANIMATION.fast};
    transition-property: opacity, background-color;
  `,
);

const iconClass = css`
  position: relative;
  left: 2px;
  top: 1px;
`;

interface Props {
  id: string;
  theme: s.AppTheme;
  className?: string;
  checked: boolean;
  onChecked: (nextValue: boolean) => void;
}

export const Checkbox: FC<Props> = ({
  id,
  theme,
  className,
  onChecked,
  checked,
}) => {
  const checkedClass = css`
    background-color: ${theme.primary};
    border-color: ${theme.primary};
  `;

  const handler = useCallback(() => {
    if (onChecked) {
      onChecked(!checked);
    }
  }, [checked, onChecked]);

  return (
    <div
      className={cx(className, baseClass, checked && checkedClass)}
      onClick={handler}
    >
      {checked ? (
        <Icon name="check" className={cx(s.textWhite, iconClass)} />
      ) : null}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className={s.offScreen}
      />
    </div>
  );
};

export const CheckboxLabel: FC<{ id: string }> = ({ id, children }) => {
  return (
    <label for={id} style="cursor: pointer; flex-grow: 1">
      {children}
    </label>
  );
};
