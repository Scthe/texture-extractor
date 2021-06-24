import { css } from "@emotion/css";
import { h, FunctionComponent as FC } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useAppStatePartial } from "../../state/AppState";
import { RectSvg } from "../../components/RectSvg";
import * as s from "../../style";

const dimedImage = css`
  opacity: 0.4;
`;

interface Props {
  imageData: AppImageData;
  borderSafeSpace: number;
  isDimed: boolean;
  zoom: number;
  onDragging: RectMoveCb;
  onDragEnd: RectMoveCb;
}

export const ImageWorkspace: FC<Props> = ({
  borderSafeSpace,
  imageData,
  isDimed,
  zoom,
  onDragEnd,
  onDragging,
}) => {
  const { rectangles } = useAppStatePartial("rectangles");

  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = imageData.data.width;
    canvas.height = imageData.data.height;
    const ctx = canvas.getContext("2d")!;
    ctx.putImageData(imageData.data, 0, 0);
  }, [imageData]);

  const { width: imgWidth, height: imgHeight } = imageData.data;

  return (
    <div
      style={[
        `width: ${imgWidth + 2 * borderSafeSpace}px;`,
        `height: ${imgHeight + 2 * borderSafeSpace}px;`,
      ].join(" ")}
    >
      <canvas
        ref={canvasRef}
        class={isDimed ? dimedImage : ""}
        style={`padding: ${borderSafeSpace}px;`}
      />

      <svg class={s.fillAbsolute}>
        {(rectangles || []).map((rect) => (
          <RectSvg
            rect={rect}
            scale={zoom}
            imageData={imageData}
            onDragEnd={onDragEnd}
            onDragging={onDragging}
          />
        ))}
      </svg>
    </div>
  );
};
