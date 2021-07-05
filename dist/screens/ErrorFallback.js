import{css as n,cx as l}from"../../snowpack/pkg/@emotion/css.js";import{h as t}from"../../snowpack/pkg/preact.js";import{resetImageStorage as p,useAppStatePartial as m}from"../state/AppState.js";import{Button as i}from"../components/Button.js";import*as e from"../style.js";const c=n`
  max-width: 600px;
  padding: ${e.spacing(4)};
  text-align: center;
`;export const ErrorFallback=o=>{const{image:s,setImage:a}=m("setImage","image"),r=()=>{p(s),a(null,void 0),o.resetError()};return t("div",null,t("div",{class:l(e.theme(e.ThemePurple),e.modal,c)},t("h1",null,"Oops!"),t("p",null,"It looks that something went wrong. We will look into that later. Meanwile.."),t(i,{onClick:r},"Restart App")))};
