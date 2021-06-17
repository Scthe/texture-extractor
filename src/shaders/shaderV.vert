#version 300 es
precision highp float;
precision highp int;

vec2 getFullscreenPositionFromVertexId () {
  vec2 pos;
  pos.x = -1.0 + float((gl_VertexID & 1) << 2);
  pos.y = -1.0 + float((gl_VertexID & 2) << 1);
  return pos;
}


uniform vec4 u_uv_X;
uniform vec4 u_uv_Y;
out vec2 v_position;
out vec2 v_uv;

void main() {
  const vec2 positions[4] = vec2[](
    vec2(-1, -1),
    vec2(+1, -1),
    vec2(-1, +1),
    vec2(+1, +1)
  );
  /*
  const vec2 positions[3] = vec2[](
    vec2(-1, -1), // vec2(-1, -1),
    vec2(+3, -1), // vec2(+1, -1),
    vec2(-1, +3) // vec2(-1, +1)
  );*/
  vec2 pos = positions[gl_VertexID];

  gl_Position = vec4(pos, 0.0f, 1.0f);
  v_position = pos;
  v_uv = vec2(u_uv_X[gl_VertexID], u_uv_Y[gl_VertexID]);
}