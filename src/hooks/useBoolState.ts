import { useCallback, useState } from "preact/hooks";

interface Result {
  value: boolean;
  setValue: (currentValue: boolean) => void;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

export const useBoolState = (initVal: boolean): Result => {
  const [value, setValue] = useState(initVal);

  const toggle = useCallback(() => setValue((s) => !s), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTrue = useCallback(() => setValue(true), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setFalse = useCallback(() => setValue(false), []);

  return { value, setValue, toggle, setTrue, setFalse };
};
