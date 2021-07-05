import{h as r}from"../../snowpack/pkg/preact.js";import{createPortal as c}from"../../snowpack/pkg/preact/compat.js";import{css as t,cx as l}from"../../snowpack/pkg/@emotion/css.js";import*as o from"../style.js";import{useBoolState as m}from"../hooks/useBoolState.js";import{modalContainer as d}from"../App.js";import{HelpModal as f}from"./HelpModal.js";import{Icon as u}from"./Icon.js";const g=t`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`,k=t`
  background-color: var(--primary);
  padding: ${o.spacing(.5,4,1)};
  text-align: center;
  border-bottom-left-radius: ${o.borderRadius("m")};
  border-bottom-right-radius: ${o.borderRadius("m")};
  cursor: pointer;

  transition-property: background-color, transform;
  transition-duration: ${o.ANIMATION.fast};
  transform-origin: top center;
  &:hover {
    transform: scale(1.3);
    background-color: var(--primary-light);
  }
`,b=t`
  margin-left: ${o.spacing(2)};
  position: relative;
  top: 3px;
  font-size: 15px;
`;export const ScreenName=({name:s,helpText:e,theme:a})=>{const{value:n,setTrue:i,setFalse:p}=m(!1);return r("div",{class:l(o.textNormal,g),onClick:i,title:"Show instructions"},r("div",{class:k},s,r(u,{name:"help",className:b}),c(r(f,{isOpen:n,setClosed:p,text:e,theme:a}),d)))};
