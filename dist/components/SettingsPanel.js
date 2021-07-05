import{h as t}from"../../snowpack/pkg/preact.js";import{useCallback as d}from"../../snowpack/pkg/preact/hooks.js";import{css as e,cx as r}from"../../snowpack/pkg/@emotion/css.js";import*as o from"../style.js";import{Icon as m}from"./Icon.js";const h=e`
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 16px;
  font-weight: normal;
`,f=e`
  flex-grow: 0;
  flex-shrink: 0;
  padding: ${o.spacing(0,1,0,2)};
  cursor: pointer;
`;export const SettingsPanel=({isOpen:i,setSettingsOpen:s,title:n,children:a})=>{const c=d(()=>s(!1),[s]),l=e`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${o.COLORS.white};
    border-top-left-radius: ${o.borderRadius("m")};
    width: 240px;
    max-width: 100%;
  `,p=e`
    background-color: var(--primary);
    border-top-left-radius: ${o.borderRadius("m")};
    width: 100%;
    height: 32px;
    padding: ${o.spacing(3,4)};
  `;return i?t("div",{class:r(l)},t("div",{class:r(o.flexSides,o.flexAltCenter,p)},t("h2",{class:r(o.textWhite,h)},n),t(m,{name:"expand_more",title:"Hide settings panel",className:r(o.textWhite,o.activableHover,f),onClick:c})),a):null};
