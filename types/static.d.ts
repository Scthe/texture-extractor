/* eslint-disable import/no-unused-modules */
/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */

/* CSS MODULES */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

/* CSS */
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

/* IMAGES */
declare module '*.svg' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.png' {
  const ref: string;
  export default ref;
}

/* CUSTOM: ADD YOUR OWN HERE */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Webgl extends WebGL2RenderingContext {
}
declare module '*.vert' {
  const ref: string;
  export default ref;
}
declare module '*.frag' {
  const ref: string;
  export default ref;
}
type vec3 = [number, number, number];

interface Point2d { x: number; y: number; }
type Rect = [Point2d, Point2d, Point2d, Point2d];

interface SelectionRect {
  id: number;
  points: Rect;
  color: string;
}

interface AppImageData {
  data: ImageData;
  isExample: boolean;
  filename: string;
}

type RectMoveCb = (id: number, rect: Rect) => void;