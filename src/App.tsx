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
const orgImagePinchZoomStyle = css`
  position: relative;
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
    // { x: 0.0, y: 0.0 },
    // { x: 150.0, y: 20.0 },
    // { x: 120.0, y: 200.0 },
    // { x: 10.0, y: 180.0 },
    // { x: 0, y: 0 },
    // { x: ww, y: 0 },
    // { x: 0, y: hh },
    // { x: ww, y: hh },
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

  const scaleRef = useRef(1.0);
  const onPinchZoomLeftChange = (e: any) => {
    try {
      const scale = e.target.style.getPropertyValue("--scale");
      scaleRef.current = scale;
    } catch (e) {
      scaleRef.current = 1.0;
    }
  };

  return (
    <div class={containterStyle}>
      <div class={cx(columnStyle)}>
        <canvas ref={canvasRef} class={canvasStyle} />
      </div>

      <div class={cx(columnStyle)}>
        <pinch-zoom
          class={orgImagePinchZoomStyle}
          onChange={onPinchZoomLeftChange}
        // ref={linkRef(this, 'pinchZoomLeft')}
        >
          <div>
            <img src={testImageUrl} alt="test" class={rightImageStyle} />
            <svg class={svgStyle}>
              <RectSvg
                rect={points}
                updateRect={setPoints}
                onPreviewUpdate={onPreviewUpdate}
                scaleRef={scaleRef}
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

