import { useState } from "preact/hooks";

export const useBoolState = (
  initVal: boolean,
): [boolean, (v: boolean) => void] => {
  const [v, setV] = useState(initVal);
  return [v, (nextVal: boolean) => setV(nextVal)];
};
