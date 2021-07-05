import{h as s}from"../../snowpack/pkg/preact.js";import{css as t,cx as a}from"../../snowpack/pkg/@emotion/css.js";import*as o from"../style.js";const i=t`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--primary);
  padding: ${o.spacing(.5,4,1)};
  border-bottom-left-radius: ${o.borderRadius("s")};
  ${o.mqW(800)} {
    display: none;
  }
`;export const ZoomNumber=({zoom:r})=>s("div",{class:a(o.textNormal,i)},`zoom ${Math.floor(r*100)}%`);
