import { h } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { css, cx } from "@emotion/css";
import "pinch-zoom-element";

import testImageUrl from "./test-image.jpg";
import { GlContext, initializeGlView, redraw } from "./gl";
import { RectSvg } from "./components/RectSvg";
import { useLatest } from "./hooks/useLatest";

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
  const ww = 800, hh = 1137;
  const [points, setPoints] = useState<Rect>([
    { x: 0, y: hh },
    { x: ww, y: hh },
    { x: 0, y: 0 },
    { x: ww, y: 0 },
  ]);
  const pointsRef = useLatest(points);

  const canvasRef = useRef<HTMLCanvasElement>();
  const glContextRef = useRef<GlContext | null>();
  useEffect(() => {
    initializeGlView(canvasRef.current).then(ctx => {
      glContextRef.current = ctx;
      redraw(glContextRef.current, pointsRef.current);
    })
  }, []);

  const onPreviewUpdate = useCallback((newState: Rect) => {
    if (glContextRef.current != null) {
      redraw(glContextRef.current, newState);
    }
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

  const imageData = {
    width: ww, height: hh, padding: 0,
  }

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
          <div>
            <img src={testImageUrl} alt="test" class={rightImageStyle} style={`padding: ${imageData.padding}px`} />
            <svg class={svgStyle}>
              <RectSvg
                rect={points}
                updateRect={setPoints}
                onPreviewUpdate={onPreviewUpdate}
                scale={scale}
              />
            </svg>
          </div>
        </pinch-zoom>
      </div>
    </div>
  );
}

/*
        <TransformWrapper>
          <TransformComponent>
            <img src={testImageUrl} alt="test" />
            <div>Example text</div>
          </TransformComponent>
        </TransformWrapper>
        */

{/*
          <canvas
            class={style.pinchTarget}
            ref={linkRef(this, 'canvasLeft')}
            width={leftDraw && leftDraw.width}
            height={leftDraw && leftDraw.height}
            style={{
              width: originalImage ? originalImage.width : '',
              height: originalImage ? originalImage.height : '',
              objectFit: leftImgContain ? 'contain' : '',
            }}
          />
          */}

export default App;

