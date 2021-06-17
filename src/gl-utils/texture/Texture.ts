import { assertUnreachable } from "../../utils";
import STATIC_GL, { getGlConstName } from "../gimme_gl";
import type { TextureOpts } from "./TextureOpts";
import {
  getDepthStencilGlTexImageParams,
  isSizedTextureFormatInteger,
} from "./utils";

export enum TextureType {
  Texture2d = STATIC_GL.TEXTURE_2D,
  Texture3d = STATIC_GL.TEXTURE_3D,
  Texture2dArray = STATIC_GL.TEXTURE_2D_ARRAY,
}

const BORDER_ALWAYS_0 = 0; // required by webgl

type TexturePoint = vec3;
type TextureDimensions = vec3;
interface TextureBox {
  start: TexturePoint;
  dimensions: TextureDimensions;
}

interface WriteSource {
  unsizedPixelFormat: number; // GL_R, GL_RG, GL_RGB, GL_RGBA etc. - channels only
  perChannelType: number;
  data: any;
}

/*
 *
 * Unsized vs Sized and format vs internal format (in normalized environment)
 *
 * INTERNAL FORMAT is how memory will be allocated on GPU. It is expressed
 * in 'SIZED' GLenum e.g. GL_RGBA8 (4 channels of unsigned byte each).
 *
 * On the other hand, when WRITING/READING we usualy provide 3 arguments
 *    (GLenum format, GLenum type, GLvoid * pixels), where
 *    * 'format' is 'UNSIZED' info about channels (e.g. GL_R, GL_RG, GL_RGB, GL_RGBA),
 *    * 'type' is type in each channel
 *    * 'pixels' is data.
 * UNSIZED are used to describe data that we provide so it can be written
 * or texture format that we want to read.
 *
 * level:
 *  - lvl0 - original,
 *  - lvl1 - 1st mipmap (each dimension halfed)
 *  - lvl2 - 2st mipmap (each dimension is quater of original) etc.
 *
 */
export class Texture {
  private glId_: WebGLTexture | null;

  constructor(
    gl: Webgl,
    public readonly type: TextureType,
    public readonly dimensions: vec3,
    public readonly mipmapLevels: number, // use 0 for no mipmaps (or just NO_MIPMAPS const)
    public readonly sizedPixelFormat: number, // GL_R8 / GL_RGBA8 / GL_RGBA32F / GL_DEPTH_COMPONENT16 / GL_DEPTH24_STENCIL8 etc.
    public readonly opts: TextureOpts,
  ) {
    this.glId_ = gl.createTexture()!;
    this.applyOptions(gl, this.opts);
    this.allocate(gl);
  }

  private allocate(gl: Webgl): void {
    // this.bindAsActive(gl); already done
    this.checkAllocationSize(gl);

    switch (this.type) {
      case TextureType.Texture2d:
        this.allocateTeture2d(gl, this.type);
        return;
      case TextureType.Texture3d:
      case TextureType.Texture2dArray:
        gl.texStorage3D(
          this.type,
          this.mipmapLevels + 1,
          this.sizedPixelFormat,
          this.width,
          this.height,
          this.depth,
        );
        return;
      default:
        assertUnreachable();
    }
  }

  private allocateTeture2d(gl: Webgl, type: TextureType): void {
    const depthOpts = getDepthStencilGlTexImageParams(
      gl,
      this.sizedPixelFormat,
    );
    if (depthOpts) {
      gl.texImage2D(
        type,
        0, // mipmapLevels 0 cause this is depth
        depthOpts.internalformat,
        this.width,
        this.height,
        BORDER_ALWAYS_0,
        depthOpts.format,
        depthOpts.type,
        null,
      );
    } else {
      gl.texStorage2D(
        type,
        this.mipmapLevels + 1,
        this.sizedPixelFormat,
        this.width,
        this.height,
      );
    }
  }

  private checkAllocationSize(gl: Webgl) {
    const check = (ds: number[], maxSize: number) => {
      if (!ds.every((d) => d <= maxSize)) {
        console.warn(
          `Tried to allocate texture of size [${ds.join(
            ", ",
          )}]px, while max for single dimension is ${maxSize}px. This will not work correctly`,
        );
      }
    };

    switch (this.type) {
      case TextureType.Texture2d:
        check([this.width, this.height], gl.getParameter(gl.MAX_TEXTURE_SIZE));
        break;
      case TextureType.Texture3d:
        check(
          [this.width, this.height, this.depth],
          gl.getParameter(gl.MAX_3D_TEXTURE_SIZE),
        );
        break;
      case TextureType.Texture2dArray:
        check([this.width, this.height], gl.getParameter(gl.MAX_TEXTURE_SIZE));
        check([this.depth], gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS));
        break;
    }
  }

  private checkIntegerWrite(unsizedPixelFormat: GLenum) {
    const isSizedAnIntegerTex = isSizedTextureFormatInteger(
      this.sizedPixelFormat,
    ); // getGlConstName(this.sizedPixelFormat).endsWith('I'); // *UI or *I
    const isUnsiedAnIntegerTex =
      getGlConstName(unsizedPixelFormat).endsWith("_INTEGER");
    if (isSizedAnIntegerTex && !isUnsiedAnIntegerTex) {
      console.warn(
        "Texture.write: Tried to write non _INTEGER texture data into texture that uses internally integers",
      );
    }
  }

  write(
    gl: Webgl,
    mipmapLevel: number,
    targetPos: TextureBox,
    source: WriteSource,
  ) {
    if (this.isDepth) {
      throw `Tried to write into depth texture. What?`;
    }
    this.checkIntegerWrite(source.unsizedPixelFormat);

    this.bindAsActive(gl);

    const { start, dimensions } = targetPos;
    const { unsizedPixelFormat: format, perChannelType: type, data } = source;

    switch (this.type) {
      case TextureType.Texture2d:
        gl.texSubImage2D(
          this.type,
          mipmapLevel,
          start[0],
          start[1],
          dimensions[0],
          dimensions[1],
          format,
          type,
          data,
        );
        return;
      case TextureType.Texture3d:
      case TextureType.Texture2dArray:
        gl.texSubImage3D(
          this.type,
          mipmapLevel,
          start[0],
          start[1],
          start[2],
          dimensions[0],
          dimensions[1],
          dimensions[2],
          format,
          type,
          data,
        );
        return;
      default:
        assertUnreachable();
        return;
    }
  }

  get width() {
    return this.dimensions[0];
  }
  get height() {
    return this.dimensions[1];
  }
  get depth() {
    return this.dimensions[2];
  } // also array size

  get glId() {
    if (this.glId_ == null) {
      throw new Error(
        `Tried to use deleted texture with dimensions ${this.width}x${this.height}`,
      );
    }
    return this.glId_;
  }

  get isDepth() {
    const depthFormats = [
      STATIC_GL.DEPTH_COMPONENT16,
      STATIC_GL.DEPTH24_STENCIL8,
    ];
    return depthFormats.includes(this.sizedPixelFormat);
  }

  get isDepthStencil() {
    const depthFormats = [STATIC_GL.DEPTH24_STENCIL8];
    return depthFormats.includes(this.sizedPixelFormat);
  }

  bindAsActive(gl: Webgl) {
    const bindIdx = 0;
    gl.activeTexture(gl.TEXTURE0 + bindIdx);
    gl.bindTexture(this.type, this.glId);
  }

  destroy(gl: Webgl) {
    gl.deleteTexture(this.glId);
  }

  private applyOptions(gl: Webgl, opts: TextureOpts) {
    this.bindAsActive(gl);
    // docs as helpful as always...
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
    gl.texParameteri(this.type, gl.TEXTURE_BASE_LEVEL, opts.mipmapBaseLevel);
    gl.texParameteri(this.type, gl.TEXTURE_MAX_LEVEL, opts.mipmapMaxLevel);
    gl.texParameteri(this.type, gl.TEXTURE_MIN_LOD, opts.lodMin);
    gl.texParameteri(this.type, gl.TEXTURE_MAX_LOD, opts.lodMax);
    gl.texParameteri(this.type, gl.TEXTURE_MIN_FILTER, opts.filterMin);
    gl.texParameteri(this.type, gl.TEXTURE_MAG_FILTER, opts.filterMag);
    gl.texParameteri(this.type, gl.TEXTURE_WRAP_R, opts.wrap[0]);
    gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, opts.wrap[1]);
    gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, opts.wrap[2]);
  }
}
