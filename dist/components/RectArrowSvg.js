import{h as j}from"../../snowpack/pkg/preact.js";import{useRef as v}from"../../snowpack/pkg/preact/hooks.js";import{css as D}from"../../snowpack/pkg/@emotion/css.js";import"../../snowpack/pkg/pinch-zoom-element.js";import{add2d as l,between2d as n,midpoint2d as i,sub2d as f,svgPolygonPoints as R}from"../utils/index.js";import{useDrag as $}from"../hooks/useDrag.js";export const RectArrowSvg=({rect:o,color:p,scaleIndependent:k,onDrag:w,onDragEnd:h})=>{const m=v();$(m.current,{onDrag:e=>w(e.delta),onDragEnd:e=>h(e.delta)});const u=D`
    cursor: pointer;
    fill: ${p}30;
    stroke: ${p}80;
    transition: fill 0.5s;
    stroke-width: ${k(2)};
    &:hover {
      fill: ${p}80;
    }
  `,a=i(o[2],o[3]),d=i(o[0],o[1]),s=i(o[0],o[2]),t=i(o[1],o[3]),r=.1,g=.2,c=n(a,d,.5+g);return j("polygon",{ref:m,points:R(n(s,t,.5-r),n(a,d,.5-g/2),n(s,t,.5+r),n(s,t,.5+r/3),l(c,f(n(s,t,.5+r/3),i(s,t))),l(c,f(n(s,t,.5-r/3),i(s,t))),n(s,t,.5-r/3)),class:u})};
