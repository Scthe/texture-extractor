import type { SamplerOpts } from "./TextureOpts";

export class Sampler {
  private glId_: WebGLSampler | null;

  constructor(gl: Webgl, public readonly opts: SamplerOpts) {
    this.glId_ = gl.createSampler()!;
    this.applyOptions(gl, this.opts);
  }

  get glId(): WebGLSampler {
    if (this.glId_ == null) {
      throw new Error(`Tried to use deleted sampler`);
    }
    return this.glId_;
  }

  bindAsActive(gl: Webgl, bindIdx = 0): void {
    gl.bindSampler(bindIdx, this.glId);
  }

  destroy(gl: Webgl): void {
    gl.deleteSampler(this.glId);
  }

  private applyOptions(gl: Webgl, opts: SamplerOpts) {
    this.bindAsActive(gl);
    // docs as helpful as always...
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter

    const sampler = this.glId;
    gl.samplerParameteri(sampler, gl.TEXTURE_MIN_LOD, opts.lodMin);
    gl.samplerParameteri(sampler, gl.TEXTURE_MAX_LOD, opts.lodMax);
    gl.samplerParameteri(sampler, gl.TEXTURE_MIN_FILTER, opts.filterMin);
    gl.samplerParameteri(sampler, gl.TEXTURE_MAG_FILTER, opts.filterMag);
    gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_R, opts.wrap[0]);
    gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_S, opts.wrap[1]);
    gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_T, opts.wrap[2]);
  }
}
