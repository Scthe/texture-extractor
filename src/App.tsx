// import * as React from "preact/compat";
import { h, FunctionComponent as FC } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { css, cx } from "@emotion/css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "pinch-zoom-element";

import testImageUrl from "./test-image.jpg";
import { GlContext, initializeGlView, redraw } from "./gl";
import PointerTracker from "pointer-tracker";

const myStyle = css`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: white;
  }
`;
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
const rectSvgStyle = css`
  stroke-width: 5;
  fill: none;
  pointer-events: none;
  stroke-dasharray: 10;
  animation: dash 5s infinite linear;
`;

const Aa: FC<{ name: string }> = ({ name }) => <span>{name}</span>;
interface Point { x: number; y: number; };

function App() {
  // TODO into separate hook
  const canvasRef = useRef<HTMLCanvasElement>();
  const glContextRef = useRef<GlContext>();
  useEffect(() => {
    glContextRef.current = initializeGlView(canvasRef.current);
    // redraw(glContextRef.current);
  }, []);

  const point0SvgRef = useRef<SVGEllipseElement>();
  const point1SvgRef = useRef<SVGEllipseElement>();
  const point2SvgRef = useRef<SVGEllipseElement>();
  const point3SvgRef = useRef<SVGEllipseElement>();
  const pointRefs = [
    point0SvgRef,
    point1SvgRef,
    point2SvgRef,
    point3SvgRef,
  ];
  const [points, setPoints] = useState<[Point, Point, Point, Point]>([
    { x: 0.0, y: 0.0 },
    { x: 150.0, y: 20.0 },
    { x: 120.0, y: 200.0 },
    { x: 10.0, y: 180.0 },
  ]);
  const coord = (p: Point) => `${p.x}, ${p.y}`;
  const p = points;

  function cancelEvent(e: Event) {
    e.stopPropagation();
    return false;
  }

  useEffect(() => {
    const trackers = pointRefs.map(pr => {
      return new PointerTracker(pr.current as any, {
        start(pointer, event) {
          console.log("start", { pointer, event });
          cancelEvent(event);
          return true;
        },
        move(previousPointers, changedPointers, event) {
          console.log("move", { previousPointers, changedPointers, event });
          cancelEvent(event);
        },
        end(pointer, event, cancelled) {
          console.log("end", { pointer, event, cancelled });
          cancelEvent(event);
        },
        rawUpdates: false,
      });
    });

    return () => {
      trackers.forEach(t => t.stop())
    };
  }, []);

  return (
    <div class={containterStyle}>
      <div class={cx(columnStyle)}>
        <canvas ref={canvasRef} class={canvasStyle} />
      </div>

      <div class={cx(columnStyle)}>
        <pinch-zoom
          class={orgImagePinchZoomStyle}
        // onChange={this.onPinchZoomLeftChange}
        // ref={linkRef(this, 'pinchZoomLeft')}
        >
          <div>
            <img src={testImageUrl} alt="test" class={rightImageStyle} />
            <svg class={svgStyle}>
              <title>happy_news</title>
              <path
                d={`M ${coord(p[0])} ${p.slice(1).map(pp => `L ${coord(pp)}`).join(" ")} L ${coord(p[0])}`}
                stroke="#a557b8"
                class={rectSvgStyle}
              />
              {/* TODO do not cover the corner */}
              {p.map((pp, idx) =>
                <ellipse cx={pp.x} cy={pp.y} rx="10" ry="10" fill="#57b87c"
                  ref={pointRefs[idx]}
                  onClick={e => {
                    console.log("Clicked");
                    e.stopPropagation();
                    return false;
                  }}
                />
              )}
              {/*
              <path
                d="M 0.0,0.0 L 150.0,200.0"
                stroke="#a557b8"
                class={rectSvgStyle}
              />
              <ellipse cx="0.0" cy="0.0" rx="10" ry="10" fill="#57b87c" />
              <ellipse cx="150.0" cy="200.0" rx="10" ry="10" fill="#57b87c" onClick={() => {
                console.log("Clicked");
              }} />
              */}
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

function drawDataToCanvas(canvas: HTMLCanvasElement, data: ImageData) {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw Error('Canvas not initialized');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(data, 0, 0);
}