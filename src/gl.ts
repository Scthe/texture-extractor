import { createWebGl2Context } from "./gl-utils/createContext";
import { Shader } from "./gl-utils/Shader";

// snowpack has problems with same basename
import shaderVert from "./shaders/shaderV.vert";
import shaderFrag from "./shaders/shaderF.frag";
import { Texture, TextureType } from "./gl-utils/texture/Texture";
import {
  createTextureOpts,
  TextureFilterMag,
  TextureFilterMin,
} from "./gl-utils/texture/TextureOpts";
import { clamp } from "./utils";

export interface GlContext {
  gl: Webgl;
  shader: Shader;
  imageTexture: Texture;
}

export const destroyGlContext = (ctx: GlContext): void => {
  ctx.shader.destroy(ctx.gl);
  ctx.imageTexture.destroy(ctx.gl);
};

const applyDrawPrams = (gl: Webgl) => {
  // https://github.com/Scthe/WebFX/blob/master/src/gl-utils/DrawParams/applyDrawParams.ts
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.STENCIL_TEST);
  gl.disable(gl.CULL_FACE);
  gl.colorMask(true, true, true, true);
  gl.clearColor(0, 0, 0, 0);
};

const loadTexture = (
  gl: Webgl,
  imageData: ImageData,
  sizedPixelFormat: number,
): Texture => {
  const texture = new Texture(
    gl,
    TextureType.Texture2d,
    [imageData.width, imageData.height, 0],
    0,
    sizedPixelFormat,
    createTextureOpts({
      filterMin: TextureFilterMin.Nearest, // TODO or?
      filterMag: TextureFilterMag.Nearest,
    }),
  );

  const writePoint = {
    start: [0, 0, 0] as vec3,
    dimensions: texture.dimensions,
  };
  const writeSource = {
    unsizedPixelFormat: gl.RGB_INTEGER,
    perChannelType: gl.UNSIGNED_BYTE,
    data: imageData,
  };
  texture.write(gl, 0, writePoint, writeSource);

  return texture;
};

export const initializeGlView = (
  canvas: HTMLCanvasElement,
  imageData: ImageData,
): GlContext => {
  const gl = createWebGl2Context(
    canvas,
    {
      alpha: true,
      antialias: false,
      depth: true,
      failIfMajorPerformanceCaveat: true,
      powerPreference: "high-performance",
      stencil: true,
    },
    ["EXT_color_buffer_float", "OES_texture_float_linear"],
  );

  applyDrawPrams(gl);

  const shader = new Shader(gl, shaderVert, shaderFrag);
  shader.use(gl);

  const imageTexture = loadTexture(gl, imageData, gl.RGB8UI);

  return { gl, shader, imageTexture };
};

const renderFullscreenQuad = ({ gl }: GlContext): void => {
  // we don't have to bind anything.
  const miniPlanes = 5;
  const triCnt = 2 * miniPlanes * miniPlanes;
  gl.drawArrays(gl.TRIANGLES, 0, triCnt * 3);
};

const getRectDimensions = (rect: Rect): [number, number] => {
  const w1 = Math.abs(rect[0].x - rect[1].x);
  const w2 = Math.abs(rect[2].x - rect[3].x);
  const h1 = Math.abs(rect[0].y - rect[2].y);
  const h2 = Math.abs(rect[1].y - rect[3].y);
  return [(w1 + w2) / 2, (h1 + h2) / 2];
};

export const redraw = (ctx: GlContext, rect: Rect): void => {
  const { gl, shader, imageTexture } = ctx;

  // clear
  gl.viewport(0, 0, imageTexture.width, imageTexture.height);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // draw
  const rectDims = getRectDimensions(rect);
  gl.viewport(0, 0, rectDims[0], rectDims[1]);

  const points: Point2d[] = rect.map((p) => ({
    x: clamp(p.x / imageTexture.width, 0.0, 1.0),
    y: clamp(p.y / imageTexture.height, 0.0, 1.0),
  }));
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  gl.uniform4fv(shader.getUniform("u_uv_X").location, xs);
  gl.uniform4fv(shader.getUniform("u_uv_Y").location, ys);

  renderFullscreenQuad(ctx);
};
