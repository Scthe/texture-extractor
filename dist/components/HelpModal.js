import{h as s}from"../../snowpack/pkg/preact.js";import{css as t,cx as a}from"../../snowpack/pkg/@emotion/css.js";import*as o from"../style.js";import{Button as r}from"./Button.js";const e=t`
  max-width: 600px;
  padding: ${o.spacing(4)};
`,d=t`
  margin-bottom: ${o.spacing(4)};
`,g=t`
  display: block;
  margin: 0 auto;
`;export const HelpModal=({theme:m,text:n,isOpen:c,setClosed:i})=>c?s("div",{class:o.modalDimmer},s("div",{class:a(o.theme(m),o.modal,e)},n.map((l,p)=>s("p",{key:p,class:a(o.noMargins,d)},l)),s(r,{onClick:i,className:g},"Close"))):null;
