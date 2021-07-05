import{h as k,Fragment as f}from"../../snowpack/pkg/preact.js";import{css as h}from"../../snowpack/pkg/@emotion/css.js";import{midpoint2d as s,svgLinePath as i}from"../utils/index.js";export const RectGridSvg=({rect:o,color:d,scaleIndependent:n})=>{const t=s(o[2],o[3]),m=s(o[0],o[1]),a=s(o[0],o[2]),p=s(o[1],o[3]),r=h`
    fill: none;
    pointer-events: none;
    stroke: ${d}80;
    stroke-dasharray: ${n(15)};
    stroke-width: ${n(2)};
  `,l=h`
    fill: none;
    pointer-events: none;
    stroke: ${d}60;
    stroke-dasharray: ${n(5)};
    stroke-width: ${n(1.5)};
  `;return k(f,null,k("path",{d:[i(t,m),i(a,p)].join(" "),class:r}),k("path",{d:[i(s(a,o[2]),s(p,o[3])),i(s(a,o[0]),s(p,o[1])),i(s(t,o[2]),s(m,o[0])),i(s(t,o[3]),s(m,o[1]))].join(" "),class:l}))};
