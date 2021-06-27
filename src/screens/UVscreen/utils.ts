import { GlContext, redraw } from "../../gl";
import { sub2d } from "../../utils";

interface RedrawParams {
  ctx: GlContext | null;
  borderSafeSpace: number;
  rect: Rect | undefined;
  renderSmooth: boolean;
}

export const redrawUVview = ({
  ctx,
  borderSafeSpace,
  rect,
  renderSmooth,
}: RedrawParams): void => {
  if (rect != null && ctx != null) {
    const rectNoPadding = rect.map((p) =>
      sub2d(p, { x: borderSafeSpace, y: borderSafeSpace }),
    ) as Rect;
    redraw(ctx, rectNoPadding, renderSmooth);
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
