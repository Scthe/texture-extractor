import { h, FunctionComponent as FC } from "preact";
import { cx } from "@emotion/css";

interface Props {
  name: string;
  className?: string;
}

export const Icon: FC<Props> = ({ name, className }) => {
  return <span class={cx("material-icons", className)}>{name}</span>;
};
