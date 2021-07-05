import{h as s}from"../../snowpack/pkg/preact.js";import{useCallback as l}from"../../snowpack/pkg/preact/hooks.js";import{css as e,cx as i}from"../../snowpack/pkg/@emotion/css.js";import*as r from"../style.js";import{Icon as m}from"./Icon.js";const b=i(r.size("32px"),r.activableHover,e`
    cursor: pointer;
    border: 2px solid #5a5a5a;
    border-radius: 1px;
    transition: all ${r.ANIMATION.fast};
    transition-property: opacity, background-color;
  `),x=e`
  position: relative;
  left: 2px;
  top: 1px;
`,f=e`
  background-color: var(--primary);
  border-color: var(--primary);
`;export const Checkbox=({id:a,title:t,className:p,onChecked:c,checked:o})=>{const n=l(()=>{c&&c(!o)},[o,c]);return s("div",{className:i(p,b,o&&f),onClick:n,title:t},o?s(m,{name:"check",className:i(r.textWhite,x)}):null,s("input",{id:a,type:"checkbox",checked:o,className:r.offScreen}))},CheckboxLabel=({id:a,title:t,children:p})=>s("label",{for:a,style:"cursor: pointer; flex-grow: 1",title:t},p);
