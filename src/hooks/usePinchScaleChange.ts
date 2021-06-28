import { useCallback, useState } from "preact/hooks";
import debounce from "lodash.debounce";

import { useLatest } from "./useLatest";

const DEBOUNCE = 10;

export const usePinchScaleChange = (): [number, (e: Event) => void] => {
  const [scale, setScale] = useState(1.0);
  const scaleRef = useLatest(scale);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateScale = useCallback(
    debounce((scale: number) => {
      setScale(scale);
    }, DEBOUNCE),
    [],
  );

  // this is called on move too
  const cb = useCallback(
    (e: Event) => {
      const scaleRaw = (e.target! as HTMLElement).style.getPropertyValue(
        "--scale",
      );
      const scale = parseFloat(scaleRaw);
      if (scale != scaleRef.current) {
        updateScale(scale);
      }
    },
    [scaleRef, updateScale],
  );

  return [scale, cb];
};
