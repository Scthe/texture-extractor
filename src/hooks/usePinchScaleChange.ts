import { useCallback, useState } from "preact/hooks";

export const usePinchScaleChange = (): [number, (e: Event) => void] => {
  const [scale, setScale] = useState(1.0);
  const cb = useCallback((e: any) => {
    try {
      const scale = e.target.style.getPropertyValue("--scale");
      setScale(scale);
    } catch (e) {
      setScale(1.0);
    }
  }, []);

  return [scale, cb];
};
