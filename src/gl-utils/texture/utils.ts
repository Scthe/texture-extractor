import STATIC_GL from "../gimme_gl";

export const getMipmapSize = (size0: number, mipmapLvl: number) =>
  size0 * Math.pow(0.5, mipmapLvl);

export const isSizedTextureFormatInteger = (sizedPixelFormat: GLenum) => {
  switch (sizedPixelFormat) {
    case STATIC_GL.RGBA32I:
    case STATIC_GL.RGBA32UI:
    case STATIC_GL.RGBA16I:
    case STATIC_GL.RGBA16UI:
    case STATIC_GL.RGBA8I:
    case STATIC_GL.RGBA8UI:
    case STATIC_GL.RGB10_A2UI:
    case STATIC_GL.RG32I:
    case STATIC_GL.RG32UI:
    case STATIC_GL.RG16I:
    case STATIC_GL.RG16UI:
    case STATIC_GL.RG8I:
    case STATIC_GL.RG8UI:
    case STATIC_GL.R32I:
    case STATIC_GL.R32UI:
    case STATIC_GL.R16I:
    case STATIC_GL.R16UI:
    case STATIC_GL.R8I:
    case STATIC_GL.R8UI:
    case STATIC_GL.RGB32I:
    case STATIC_GL.RGB32UI:
    case STATIC_GL.RGB16I:
    case STATIC_GL.RGB16UI:
    case STATIC_GL.RGB8I:
    case STATIC_GL.RGB8UI:
      return true;
    default:
      return false;
  }
};

export const getDepthStencilGlTexImageParams = (gl: Webgl, type: GLenum) => {
  switch (type) {
    case gl.DEPTH_COMPONENT16:
      return {
        internalformat: gl.DEPTH_COMPONENT16,
        format: gl.DEPTH_COMPONENT,
        type: gl.UNSIGNED_SHORT,
      };
    case gl.DEPTH24_STENCIL8:
      return {
        internalformat: gl.DEPTH24_STENCIL8,
        format: gl.DEPTH_STENCIL,
        type: gl.UNSIGNED_INT_24_8,
      };
    case gl.DEPTH_COMPONENT32F:
      return {
        internalformat: gl.DEPTH_COMPONENT32F,
        format: gl.DEPTH_COMPONENT,
        type: gl.FLOAT,
      };
    case gl.DEPTH_COMPONENT:
    case gl.DEPTH_STENCIL:
    case gl.UNSIGNED_INT_24_8:
    case gl.UNSIGNED_SHORT:
      // default: // this will not execute due too 'if (this.isDepth)' in allocate()
      throw [
        "Invalid texture sizedPixelFormat. You probably wanted to create depth buffer.",
        "In that case, use one of [gl.DEPTH_COMPONENT16, gl.DEPTH24_STENCIL8]",
        `Provided '${type}', which is on the blacklist as invalid depth format`,
      ].join("");
    default:
      return null;
  }
};
