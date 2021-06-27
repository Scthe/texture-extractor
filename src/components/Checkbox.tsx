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

const checkedClass = css`
  background-color: var(--primary);
  border-color: var(--primary);
`;

interface Props {
  id: string;
  title?: string;
  className?: string;
  checked: boolean;
  onChecked: (nextValue: boolean) => void;
}

export const Checkbox: FC<Props> = ({
  id,
  title,
  className,
  onChecked,
  checked,
}) => {
  const handler = useCallback(() => {
    if (onChecked) {
      onChecked(!checked);
    }
  }, [checked, onChecked]);

  return (
    <div
      className={cx(className, baseClass, checked && checkedClass)}
      onClick={handler}
      title={title}
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

export const CheckboxLabel: FC<{ id: string; title?: string }> = ({
  id,
  title,
  children,
}) => {
  return (
    <label for={id} style="cursor: pointer; flex-grow: 1" title={title}>
      {children}
    </label>
  );
};
