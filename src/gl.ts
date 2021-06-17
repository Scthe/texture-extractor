import { createWebGl2Context } from "./gl-utils/createContext";
import { Shader } from "./gl-utils/Shader";

// snowpack has problems with same basename
import shaderVert from "./shaders/shaderV.vert";
import shaderFrag from "./shaders/shaderF.frag";
import { Texture, TextureType } from "./gl-utils/texture/Texture";
import { createTextureOpts, TextureFilterMag, TextureFilterMin } from "./gl-utils/texture/TextureOpts";
import testImageUrl from "./test-image.jpg";

export interface GlContext {
  gl: Webgl;
  shader: Shader;
}

const applyDrawPrams = (gl: Webgl) => {
  // https://github.com/Scthe/WebFX/blob/master/src/gl-utils/DrawParams/applyDrawParams.ts
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.STENCIL_TEST);
  gl.disable(gl.CULL_FACE);
  gl.colorMask(true, true, true, true);
};

const loadTexture = (
  gl: Webgl,
  path: string, // TODO loaded twice
  width: number, height: number, sizedPixelFormat: number,
): Promise<Texture> => {
  const texture = new Texture(
    gl,
    TextureType.Texture2d,
    [width, height, 0],
    0,
    sizedPixelFormat,
    createTextureOpts({
      filterMin: TextureFilterMin.Nearest, // TODO or?
      filterMag: TextureFilterMag.Nearest,
    }),
  );

  // https://github.com/Scthe/WebFX/blob/09713a3e7ebaa1484ff53bd8a007908a5340ca8e/src/gl-utils/index.ts#L111
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.addEventListener('load', () => {
      const writePoint = {
        start: [0, 0, 0] as vec3,
        dimensions: texture.dimensions,
      };
      const writeSource = {
        unsizedPixelFormat: gl.RGB_INTEGER,
        perChannelType: gl.UNSIGNED_BYTE,
        data: img,
      };
      texture.write(gl, 0, writePoint, writeSource);

      resolve(texture);
    });

    img.addEventListener('error', reject);

    img.src = path;
  });
}

export const initializeGlView = (canvas: HTMLCanvasElement): GlContext => {
  const gl = createWebGl2Context(
    canvas,
    {
      alpha: false,
      antialias: false,
      depth: true,
      failIfMajorPerformanceCaveat: true,
      powerPreference: "high-performance",
      stencil: true,
    },
    ["EXT_color_buffer_float", "OES_texture_float_linear"],
  );

  applyDrawPrams(gl);
  // gl.viewport(0, 0, 200, 500);

  // console.log("VERT:", shaderVert);
  // console.log("FRAG:", shaderFrag);
  const shader = new Shader(gl, shaderVert, shaderFrag);
  shader.use(gl);

  const ctx: GlContext = { gl, shader };

  loadTexture(
    gl, testImageUrl, 800, 1137, gl.RGB8UI
  ).then(texture => {
    console.log(texture);
    redraw(ctx, texture);
  });

  return ctx;
};

// const sintelTex = createModelTexture(gl, tbs, Vec2(800, 1137), gl.RGB8UI);
// await loadTexture(gl, tbs, TEXTURE_FILES.sintel, sintelTex);

const renderFullscreenQuad = ({ gl }: GlContext): void => {
  // TODO dp.depth.test = DepthTest.AlwaysPass;

  // we don't have to bind anything.
  const triCnt = 2;
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, triCnt * 3);
};

export const redraw = (ctx: GlContext, texture: Texture): void => {
  const { gl, shader } = ctx;
  gl.uniform4fv(shader.getUniform("u_uv_X").location, [0, 1, 0, 1]);
  gl.uniform4fv(shader.getUniform("u_uv_Y").location, [0, 0, 1, 1]);

  renderFullscreenQuad(ctx);
};
