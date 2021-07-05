import{css as r,cx as i}from"../../../snowpack/pkg/@emotion/css.js";import{h as t}from"../../../snowpack/pkg/preact.js";import*as o from"../../style.js";const e=r`
  display: block;
`,a=r`
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  transition: transform ${o.ANIMATION.fast};
  button:hover & {
    transform: scale(1.1);
  }
`,c=r`
  display: block;
`,l=r`
  text-transform: capitalize;
  margin-top: ${o.spacing(2)};
`;export const ImageAvatar=({imageData:s,setImage:n})=>t("li",{class:e},t("button",{title:s.tooltip,class:i(o.invisibleBtn),onClick:()=>n(s)},t("div",{class:a},t("img",{src:s.thumbUrl,alt:`Example image - ${s.name}`,class:i(c,o.size("100px"))})),t("div",{class:i(o.textWhite,l)},s.name)));
