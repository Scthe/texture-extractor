import { h } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { css, cx } from "@emotion/css";
import "pinch-zoom-element";

import testImageUrl from "./test-image.jpg";
import { GlContext, initializeGlView, redraw } from "./gl";
import { RectSvg } from "./components/RectSvg";
import { useLatest } from "./hooks/useLatest";
import { sub2d } from "./utils";

const BORDER_SAFE_SPACE = 20;

export interface AppImageData {
  width: number;
  height: number;
  borderSafeSpace: number;
}

const containterStyle = css`
  display: flex;
  flex-direction: row;
`;
const columnStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  width: 0;
  max-height: 100vh;
  height: 100vh;
  position: relative;
`;
const rightImageStyle = css`
  opacity: .2;
`;
const canvasStyle = css`
  width: 100%;
  height: 100%;
`;
const pinchZoomStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`;
const svgStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;


function App() {
  // TODO into separate hook
  const imageData = {
    width: 800, height: 1137, borderSafeSpace: BORDER_SAFE_SPACE,
  }
  const [points, setPoints] = useState<Rect>([
    { x: BORDER_SAFE_SPACE, y: imageData.height / 2 },
    { x: imageData.width / 3, y: imageData.height / 2 },
    { x: BORDER_SAFE_SPACE, y: BORDER_SAFE_SPACE },
    { x: imageData.width / 3, y: BORDER_SAFE_SPACE },
  ]);
  const pointsRef = useLatest(points);
  const redrawUVview = useLatest((rect: Rect) => {
    if (glContextRef.current != null) {
      const rectNoPadding = rect.map(
        p => sub2d(p, { x: BORDER_SAFE_SPACE, y: BORDER_SAFE_SPACE })
      ) as Rect;
      redraw(glContextRef.current, rectNoPadding);
    }
  });

  const canvasRef = useRef<HTMLCanvasElement>();
  const glContextRef = useRef<GlContext | null>();
  useEffect(() => {
    initializeGlView(canvasRef.current).then(ctx => {
      glContextRef.current = ctx;
      redrawUVview.current(pointsRef.current);
    })
  }, []);

  const onPreviewUpdate = useCallback((newState: Rect) => {
    redrawUVview.current(newState);
  }, []);

  const [scale, setScale] = useState(1.0);
  const onPinchZoomChange = useCallback((e: any) => {
    try {
      const scale = e.target.style.getPropertyValue("--scale");
      setScale(scale);
    } catch (e) {
      setScale(1.0);
    }
  }, []);

  return (
    <div class={containterStyle}>
      <div class={cx(columnStyle)}>
        <pinch-zoom class={pinchZoomStyle}>
          <canvas ref={canvasRef} class={canvasStyle} />
        </pinch-zoom>
      </div>

      <div class={cx(columnStyle)}>
        <pinch-zoom
          class={pinchZoomStyle}
          onChange={onPinchZoomChange}
        // ref={linkRef(this, 'pinchZoomLeft')}
        >
          <div style={[
            `width: ${imageData.width + 2 * imageData.borderSafeSpace}px;`,
            `height: ${imageData.height + 2 * imageData.borderSafeSpace}px;`
          ].join(" ")}>
            <img
              src={testImageUrl}
              alt="test"
              class={rightImageStyle}
              style={`padding: ${imageData.borderSafeSpace}px;`}
            />
            <svg class={svgStyle}>
              <RectSvg
                rect={points}
                updateRect={setPoints}
                onPreviewUpdate={onPreviewUpdate}
                scale={scale}
                imageData={imageData}
              />
            </svg>
          </div>
        </pinch-zoom>
      </div>
    </div>
  );
}

export default App;

