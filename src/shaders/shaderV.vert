#version 300 es
precision highp float;
precision highp int;

vec2 getFullscreenPositionFromVertexId () {
  vec2 pos;
  pos.x = -1.0 + float((gl_VertexID & 1) << 2);
  pos.y = -1.0 + float((gl_VertexID & 2) << 1);
  return pos;
}

int getVertIdx(int vertexID) {
  if (vertexID == 3) { return 1; }
  if (vertexID == 4) { return 3; }
  if (vertexID == 5) { return 2; }
  return vertexID;
}

vec2 to_minus1_1 (vec2 a) {
  return a * 2.0f - 1.0f;
}

#define MINI_PLANES (5)

uniform vec4 u_uv_X;
uniform vec4 u_uv_Y;
// out vec2 v_position;
out vec2 v_uv;
flat out int v_miniPlaneID;

void main() {
  const vec2 positions_0_1[4] = vec2[](
    vec2( 0, 0),
    vec2( 1, 0),
    vec2( 0,  1),
    vec2( 1,  1)
  );

  int vertIdxInMiniPlane = getVertIdx(gl_VertexID % 6); // in range [0, 3]
  v_miniPlaneID = gl_VertexID / 6;
  vec2 columnRow = vec2( // in which column and row we are e.g. (1, 3) // TODO debug
    float(v_miniPlaneID % MINI_PLANES),
    float(v_miniPlaneID / MINI_PLANES)
  );

  // position
  vec2 miniPlaneSize = vec2(1.0f / float(MINI_PLANES), 1.0f / float(MINI_PLANES)); // TODO debug
  vec2 miniPlaneBase = miniPlaneSize * columnRow;
  vec2 offsetInsideMiniPlane = miniPlaneSize * positions_0_1[vertIdxInMiniPlane];
  vec2 pos = miniPlaneBase + offsetInsideMiniPlane;
  gl_Position = vec4(to_minus1_1(pos), 0.0f, 1.0f);

  // uv corners
  vec2 cornerUV_bl = vec2(u_uv_X.x, u_uv_Y.x);
  vec2 cornerUV_br = vec2(u_uv_X.y, u_uv_Y.y);
  vec2 cornerUV_tl = vec2(u_uv_X.z, u_uv_Y.z);
  vec2 cornerUV_tr = vec2(u_uv_X.w, u_uv_Y.w);

  // uv
  vec2 uvPos = (columnRow + positions_0_1[vertIdxInMiniPlane]) / float(MINI_PLANES); // in [0, 1]
  vec2 topPoint = mix(cornerUV_tl, cornerUV_tr, uvPos.x);
  vec2 bottomPoint = mix(cornerUV_bl, cornerUV_br, uvPos.x);
  v_uv = mix(topPoint, bottomPoint, 1.0f -  uvPos.y);
}