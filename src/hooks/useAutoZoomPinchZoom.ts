import { Ref, useEffect } from "preact/hooks";
import type { ScaleToOpts } from "pinch-zoom-element";
import type PinchZoom from "pinch-zoom-element";

export const useAutoZoomPinchZoom = (
  image: AppImageData | null,
  pinchZoomRef: Ref<PinchZoom>,
): void => {
  useEffect(() => {
    if (image) {
      const opts: ScaleToOpts = {
        relativeTo: "content",
        allowChangeEvent: true,
      };
      const el = pinchZoomRef.current;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const iw = image.data.width;
      const ih = image.data.height;
      const ratioW = iw / w;
      const ratioH = ih / h;
      // console.log({ w, h, iw, ih, ratioW, ratioH });

      if (ratioW > ratioH) {
        // image is wider than viewport, scale to fit and center vertically
        el.scaleTo(1 / ratioW, opts);
        el.setTransform({ x: 0, y: (h - ih / ratioW) / 2 });
      } else {
        // image is higher than viewport, scale to fit and center horizontally
        el.scaleTo(1 / ratioH, opts);
        el.setTransform({ x: (w - iw / ratioH) / 2, y: 0 });
      }
    }
  }, [image, pinchZoomRef]);
};
