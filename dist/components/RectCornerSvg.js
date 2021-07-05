import{h as f}from"../../snowpack/pkg/preact.js";import{useRef as m}from"../../snowpack/pkg/preact/hooks.js";import{css as k}from"../../snowpack/pkg/@emotion/css.js";import{useDrag as g}from"../hooks/useDrag.js";import*as u from"../style.js";const h=20;export const RectCornerSvg=({idx:o,point:t,color:e,scaleIndependent:a,maxRadius:c,onDrag:p,onDragEnd:i})=>{const n=m();g(n.current,{onDrag:s=>p(o,s.delta),onDragEnd:s=>i(o,s.delta)});const r=Math.min(a(h),c-2),l=k`
    cursor: pointer;
    transition: fill ${u.ANIMATION.fast};
    stroke-width: ${r/6};
    stroke: ${e};
    &:hover {
      fill: transparent;
    }
  `;return f("ellipse",{cx:t.x,cy:t.y,rx:r,ry:r,fill:`${e}`,ref:n,class:l})};
