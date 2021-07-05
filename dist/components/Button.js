import{h as s}from"../../snowpack/pkg/preact.js";import{css as t,cx as l}from"../../snowpack/pkg/@emotion/css.js";import*as o from"../style.js";import{Icon as p}from"./Icon.js";const m=t`
  margin: 0;
  padding: ${o.spacing(2,3)};
  background-color: var(--primary);
  cursor: pointer;
  border-style: none;
  border-radius: ${o.borderRadius("s")};
  outline: 0 !important;
  position: relative;

  transition: background-color ${o.ANIMATION.fast};
  &:hover {
    background-color: var(--primary-light);
  }
`,d=t`
  padding-left: 43px;
`,u=t`
  position: absolute;
  top: 4px;
  left: ${o.spacing(3)};
  font-size: 24px;
`,g=t`
  opacity: 0.5;
  cursor: not-allowed;
`;export const Button=({icon:r,title:n,className:a,onClick:e,children:i,disabled:c})=>s("button",{onClick:e,className:l(o.textWhite,m,r!=null&&d,a,c&&g),title:n},r!=null?s(p,{className:u,name:r}):null,i);
