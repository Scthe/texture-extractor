import { useCallback } from "preact/hooks";
import { useLatest } from "../../hooks/useLatest";
import { AppState, useAppStatePartial } from "../../state/AppState";
import { getRectDimensions } from "../../gl";
import { logEvent, logError } from "../../utils/log";
import {
  downloadCanvasAsImage,
  getSelectedRect,
  redrawUVview,
  withGlContext,
} from "./utils";

const PADDING = 10; // in pixels

type DownloadData = Pick<
  AppState,
  "image" | "renderSmooth" | "borderSafeSpace"
>;

function getAnalyticsParams(rects: SelectionRect[], data: DownloadData) {
  return {
    isExample: data.image?.isExample,
    image: [data.image?.data.width, data.image?.data.height],
    renderSmooth: data.renderSmooth,
    selections: rects.map((r) => getRectDimensions(r.points)),
  };
}

const getAllRectsCanvasSize = (rects: SelectionRect[]): [number, number] => {
  const dims = rects.map((r) => getRectDimensions(r.points));
  const rawWidth = dims.reduce((acc, r) => acc + r[0], 0);
  const padding = (rects.length - 1) * PADDING;
  const paddingBorderLeftRight = PADDING * 2;
  return [
    rawWidth + padding + paddingBorderLeftRight,
    Math.max(...dims.map((d) => d[1])),
  ];
};

const downloadRectangles = (rects: SelectionRect[], data: DownloadData) => {
  try {
    const { image, renderSmooth, borderSafeSpace } = data;
    if (rects.length === 0 || !image?.data) {
      return;
    }
    logEvent("download", getAnalyticsParams(rects, data));

    const [w, h] = getAllRectsCanvasSize(rects);

    withGlContext(w, h, image?.data, (canvas, ctx) => {
      // clear
      ctx.gl.clearColor(1, 0, 1, 1);
      ctx.gl.clear(ctx.gl.COLOR_BUFFER_BIT);

      let currentX = PADDING;
      for (let index = 0; index < rects.length; index++) {
        // I don't even closures..
        const rect = rects[index];
        redrawUVview(ctx, rect.points, {
          borderSafeSpace,
          renderSmooth,
          start: { x: currentX, y: 0 },
          clear: false,
        });

        // shift to the right for next image area
        const dims = getRectDimensions(rect.points);
        currentX += dims[0] + PADDING;
      }

      // aaaand we done
      const rectSufix = rects.length === 1 ? `-${rects[0].id}` : "";
      downloadCanvasAsImage(canvas, `${image.filename}${rectSufix}`);
    });
  } catch (e) {
    logError("Download error", e, getAnalyticsParams(rects, data));
  }
};

interface Result {
  downloadSelectedRect: () => void;
  downloadAllRects: () => void;
}

export const useResultDownload = (): Result => {
  const rawData = useAppStatePartial(
    "image",
    "rectangles",
    "selectedRectangleId",
    "renderSmooth",
    "borderSafeSpace",
  );
  const dataRef = useLatest(rawData);

  const downloadSelectedRect = useCallback(() => {
    const { rectangles, selectedRectangleId } = dataRef.current;
    const rect = getSelectedRect(rectangles, selectedRectangleId);
    const rects = rect != null ? [rect] : [];

    logEvent("download_selected", getAnalyticsParams(rects, dataRef.current));
    downloadRectangles(rects, dataRef.current);
  }, [dataRef]);

  const downloadAllRects = useCallback(() => {
    const { rectangles } = dataRef.current;
    logEvent("download_all", getAnalyticsParams(rectangles, dataRef.current));
    downloadRectangles(rectangles, dataRef.current);
  }, [dataRef]);

  return { downloadSelectedRect, downloadAllRects };
};
