#version 300 es
precision highp float;
precision highp int;

vec2 getFullscreenPositionFromVertexId () {
  vec2 pos;
  pos.x = -1.0 + float((gl_VertexID & 1) << 2);
  pos.y = -1.0 + float((gl_VertexID & 2) << 1);
  return pos;
}

int getVertIdx() {
  if (gl_VertexID == 3) { return 1; }
  if (gl_VertexID == 4) { return 3; }
  if (gl_VertexID == 5) { return 2; }
  return gl_VertexID;
}

uniform vec4 u_uv_X;
uniform vec4 u_uv_Y;
out vec2 v_position;
out vec2 v_uv;

void main() {
  const vec2 positions[4] = vec2[](
    vec2(-1, -1),
    vec2( 1, -1),
    vec2(-1,  1),
    vec2( 1,  1)
  );
  int idx = getVertIdx();
  vec2 pos = positions[idx];

  gl_Position = vec4(pos, 0.0f, 1.0f);
  v_position = pos;
  v_uv = vec2(u_uv_X[idx], u_uv_Y[idx]);
}