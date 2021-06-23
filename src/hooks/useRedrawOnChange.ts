import { useEffect, useState } from "preact/hooks";

export const useRedrawOnChange = <T>(value: T): T => {
  const [v, setV] = useState<T>(value);
  useEffect(() => setV(value), [value]);
  return value;
};
