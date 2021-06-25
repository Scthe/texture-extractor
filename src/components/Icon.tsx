import { h, FunctionComponent as FC } from "preact";
import { cx } from "@emotion/css";

interface Props {
  name: string;
  className?: string;
  onClick?: h.JSX.MouseEventHandler<HTMLElement>;
}

export const Icon: FC<Props> = ({ name, onClick, className }) => {
  return (
    <span class={cx("material-icons", className)} onClick={onClick}>
      {name}
    </span>
  );
};
