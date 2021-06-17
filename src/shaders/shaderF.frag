#version 300 es
precision highp float;
precision highp int;
precision highp usampler2D;

// uniform float u_gamma;
// uniform vec2 u_viewport;
// uniform int u_displayMode;
uniform usampler2D u_image;

in vec2 v_position;
in vec2 v_uv;

layout(location = 0) out vec4 color1;

float to_0_1 (float v) { return 0.5 * v + 0.5; }
vec2 to_0_1  (vec2  v) { return 0.5 * v + 0.5; }
vec3 to_0_1  (vec3  v) { return 0.5 * v + 0.5; }
vec4 to_0_1  (vec4  v) { return 0.5 * v + 0.5; }

vec2 fixOpenGLTextureCoords_AxisY(vec2 uv) {
  return vec2(uv.x, 1.0 - uv.y);
}

vec3 readModelTexture_RGB8UI(usampler2D tex, vec2 coords) {
  coords = fixOpenGLTextureCoords_AxisY(coords);
  uvec3 texAsUint = texture(tex, coords).rgb; // as uint [0-255]
  return vec3(texAsUint) / 255.0;
}

void main() {
  // vec2 uv = to_0_1(v_position);
  // uvec3 result = texture(u_image, uv).xyz;
  // vec3 texAsFloat = vec3(result) / 255.0;
  vec3 result = readModelTexture_RGB8UI(u_image, v_uv);
  color1 = vec4(result, 1.0f);
}