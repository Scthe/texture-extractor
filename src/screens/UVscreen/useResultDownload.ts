import { useCallback } from "preact/hooks";
import { useLatest } from "../../hooks/useLatest";
import { useAppStatePartial } from "../../state/AppState";
import {
  destroyGlContext,
  getRectDimensions,
  GlContext,
  initializeGlView,
} from "../../gl";
import { logError } from "../../utils/log";
import { getSelectedRect, redrawUVview } from "./utils";

const withGlContext = (
  width: number,
  height: number,
  imageData: ImageData,
  cb: (canvas: HTMLCanvasElement, ctx: GlContext) => void,
) => {
  let ctx: GlContext | undefined;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = initializeGlView(canvas, imageData);
    cb(canvas, ctx);
  } catch (e) {
    logError("Download error", e);
  } finally {
    if (ctx) {
      destroyGlContext(ctx);
    }
  }
};

function downloadCanvasAsImage(canvas: HTMLCanvasElement, filename: string) {
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

interface Result {
  downloadSelectedRect: () => void;
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
    const {
      image,
      rectangles,
      selectedRectangleId,
      renderSmooth,
      borderSafeSpace,
    } = dataRef.current;
    const rect = getSelectedRect(rectangles, selectedRectangleId);
    if (!rect || !image?.data) {
      return;
    }

    // TODO analytics
    const [w, h] = getRectDimensions(rect.points);
    withGlContext(w, h, image?.data, (canvas, ctx) => {
      redrawUVview({
        ctx,
        borderSafeSpace,
        rect: rect.points,
        renderSmooth,
      });
      downloadCanvasAsImage(canvas, `${image.filename}-${rect.id}`);
    });
  }, [dataRef]);

  return { downloadSelectedRect };
};
