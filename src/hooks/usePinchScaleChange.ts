import { useCallback, useState } from "preact/hooks";

export const usePinchScaleChange = (): [number, (e: Event) => void] => {
  const [scale, setScale] = useState(1.0);
  const cb = useCallback((e: Event) => {
    try {
      const scale = (e.target! as HTMLElement).style.getPropertyValue(
        "--scale",
      );
      setScale(parseFloat(scale));
    } catch (e) {
      setScale(1.0);
    }
  }, []);

  return [scale, cb];
};
