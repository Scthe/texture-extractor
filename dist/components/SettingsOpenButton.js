import{h as r}from"../../snowpack/pkg/preact.js";import{css as s,cx as n}from"../../snowpack/pkg/@emotion/css.js";import*as o from"../style.js";import{Icon as e}from"./Icon.js";const t="80px",c=s`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 11px;
  font-size: 40px;

  transition: transform ${o.ANIMATION.fast};
  *:hover > & {
    transform: rotate(90deg);
  }
`,p=s`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--primary);
  border-top-left-radius: ${t};
  width: ${t};
  height: ${t};
  cursor: pointer;

  transition-property: background-color, transform;
  transition-duration: ${o.ANIMATION.fast};
  transform-origin: bottom right;
  &:hover {
    transform: scale(1.3);
    background-color: var(--primary-light);
  }
`;export const SettingsOpenButton=({setSettingsOpen:i})=>{const a=()=>i(!0);return r("div",{class:n(p),onClick:a,title:"Show settings panel"},r(e,{name:"settings",className:n(o.textWhite,c)}))};
