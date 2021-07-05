import{h as a}from"../../snowpack/pkg/preact.js";import{css as r,cx as e}from"../../snowpack/pkg/@emotion/css.js";const i=r`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -moz-font-feature-settings: "liga";
  -moz-osx-font-smoothing: grayscale;
`;export const Icon=({name:o,title:n,onClick:t,className:s})=>a("span",{class:e(i,s),title:n,onClick:t},o);
