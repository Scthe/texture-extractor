import { h, FunctionComponent as FC } from "preact";
import { cx } from "@emotion/css";

interface Props {
  name: string;
  className?: string;
  title?: string;
  onClick?: h.JSX.MouseEventHandler<HTMLElement>;
}

export const Icon: FC<Props> = ({ name, title, onClick, className }) => {
  return (
    <span
      class={cx("material-icons", className)}
      title={title}
      onClick={onClick}
    >
      {name}
    </span>
  );
};
