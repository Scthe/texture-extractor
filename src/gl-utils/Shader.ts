import STATIC_GL from "./gimme_gl";

enum ShaderStage {
  VertexShader = STATIC_GL.VERTEX_SHADER,
  FragmentShader = STATIC_GL.FRAGMENT_SHADER,
}

const parseCompileErrorLog = (source: string, errorLog: string) => {
  const ERROR_PARSE_REGEX = /\d+:(\d+):(.*)$/; // NVIDIA, may differ
  const srcLines = source.split("\n");
  const logLines = errorLog.split("\n");
  return logLines.map((line) => {
    const groups = ERROR_PARSE_REGEX.exec(line);
    if (groups && groups.length === 3) {
      const lineNo = parseInt(groups[1], 10) - 1;
      const srcLine = srcLines[lineNo].trim();
      return `> ${srcLine}\n  L${lineNo}: ${groups[2].trim()}`;
    } else {
      return line;
    }
  });
};

const compileShaderStage = (gl: Webgl, stage: ShaderStage, source: string) => {
  const glId = gl.createShader(stage)!;
  gl.shaderSource(glId, source);
  gl.compileShader(glId);
  const isOk = gl.getShaderParameter(glId, gl.COMPILE_STATUS);

  if (!isOk) {
    console.error(`${ShaderStage[stage]} compile error:`);
    const logText = gl.getShaderInfoLog(glId) || "";
    parseCompileErrorLog(source, logText).forEach((line) => {
      line = line.trim();
      if (line.length > 0) {
        console.log(`%c${line}`, "color: #FA5858");
      }
    });
    gl.deleteShader(glId);
    return undefined;
  } else {
    return glId;
  }
};

interface ActiveInfo {
  name: string;
  size: number;
  type: GLenum;
  location: GLint;
}
type ActiveResourceMap = { [name: string]: ActiveInfo };

const introspectAttrs = (gl: Webgl, shader: Shader) => {
  const attribCount = gl.getProgramParameter(shader.glId, gl.ACTIVE_ATTRIBUTES);
  const attrs: ActiveResourceMap = {};

  for (let i = 0; i < attribCount; i++) {
    const attribInfo = gl.getActiveAttrib(shader.glId, i)!;
    attrs[attribInfo.name] = {
      size: attribInfo.size, // cannot use spread :(
      name: attribInfo.name,
      type: attribInfo.type,
      location: gl.getAttribLocation(shader.glId, attribInfo.name),
    };
  }

  return attrs;
};

const introspectUniforms = (gl: Webgl, shader: Shader) => {
  const uniformCount = gl.getProgramParameter(shader.glId, gl.ACTIVE_UNIFORMS);
  const uniforms: ActiveResourceMap = {};

  for (let i = 0; i < uniformCount; i++) {
    const uniformInfo = gl.getActiveUniform(shader.glId, i)!;
    const uniformQueryName = uniformInfo.name.replace('[0]', '');
    uniforms[uniformInfo.name] = {
      size: uniformInfo.size, // cannot use spread :(
      name: uniformInfo.name,
      type: uniformInfo.type,
      location: gl.getUniformLocation(shader.glId, uniformQueryName) as any, // technically WebGLUniformLocation ./shrug
    };
  }

  return uniforms;
};

export class Shader {
  private glId_: WebGLProgram | null;

  private attrs: ActiveResourceMap = {};
  private uniforms: ActiveResourceMap = {};

  constructor(gl: Webgl, vertText: string, fragText: string) {
    this.glId_ = gl.createProgram()!;

    const vertGlID = compileShaderStage(gl, ShaderStage.VertexShader, vertText);
    const fragGlID = compileShaderStage(
      gl,
      ShaderStage.FragmentShader,
      fragText,
    );
    if (!vertGlID || !fragGlID) {
      this.destroy(gl);
      return;
    }

    gl.attachShader(this.glId, vertGlID);
    gl.attachShader(this.glId, fragGlID);
    gl.linkProgram(this.glId);
    gl.deleteShader(vertGlID);
    gl.deleteShader(fragGlID);

    const isOk = gl.getProgramParameter(this.glId, gl.LINK_STATUS);
    if (!isOk) {
      this.destroy(gl);
    } else {
      this.attrs = introspectAttrs(gl, this);
      this.uniforms = introspectUniforms(gl, this);
      // console.log("attrs", this.attrs);
      // console.log("uniforms", this.uniforms);
    }
  }

  use(gl: Webgl) {
    gl.useProgram(this.glId);
  }

  getAttr(name: string) { return this.attrs[name]; }
  getUniform(name: string) { return this.uniforms[name]; }

  destroy(gl: Webgl) {
    gl.deleteProgram(this.glId);
    this.glId_ = null;
  }

  get glId() {
    if (this.glId_ == null) {
      throw new Error("Tried to use deleted shader");
    }
    return this.glId_;
  }
}
