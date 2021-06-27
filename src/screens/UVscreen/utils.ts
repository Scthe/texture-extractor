import {
  GlContext,
  initializeGlView,
  destroyGlContext,
  redraw,
} from "../../gl";
import { sub2d } from "../../utils";

interface RedrawParams {
  borderSafeSpace: number;
  renderSmooth: boolean;
  start: Point2d;
  clear: boolean;
}

export const redrawUVview = (
  ctx: GlContext | null,
  rect: Rect | undefined,
  { borderSafeSpace, renderSmooth, start, clear }: RedrawParams,
): void => {
  if (rect != null && ctx != null) {
    const rectNoPadding = rect.map((p) =>
      sub2d(p, { x: borderSafeSpace, y: borderSafeSpace }),
    ) as Rect;

    redraw(ctx, rectNoPadding, {
      isSmooth: renderSmooth,
      start,
      clear,
    });
  }
};

export const getSelectedRect = (
  allRects: SelectionRect[],
  selectedRectangleId: number,
): SelectionRect | undefined => {
  const selRect = allRects.find((r) => r.id === selectedRectangleId);
  return selRect != null ? selRect : allRects[0];
};

export const getRectToDraw = (
  rect: Rect | undefined,
  allRects: SelectionRect[],
  selectedRectangleId: number,
): Rect | undefined => {
  if (rect != null) {
    return rect;
  }
  return getSelectedRect(allRects, selectedRectangleId)?.points;
};

export const withGlContext = (
  width: number,
  height: number,
  imageData: ImageData,
  cb: (canvas: HTMLCanvasElement, ctx: GlContext) => void,
): void => {
  let ctx: GlContext | undefined;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = initializeGlView(canvas, imageData);
    cb(canvas, ctx);
  } finally {
    if (ctx) {
      destroyGlContext(ctx);
    }
  }
};

export function downloadCanvasAsImage(
  canvas: HTMLCanvasElement,
  filename: string,
): void {
  const downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", `${filename}.png`);
  const dataURL = canvas.toDataURL("image/png");
  const url = dataURL.replace(
    /^data:image\/png/,
    "data:application/octet-stream",
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
}
