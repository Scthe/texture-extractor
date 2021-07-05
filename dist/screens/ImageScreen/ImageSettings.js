import{css as n,cx as a}from"../../../snowpack/pkg/@emotion/css.js";import{h as e}from"../../../snowpack/pkg/preact.js";import{SettingsPanel as h}from"../../components/SettingsPanel.js";import{SettingsSection as o}from"../../components/SettingsSection.js";import{Button as c}from"../../components/Button.js";import{Checkbox as f,CheckboxLabel as k}from"../../components/Checkbox.js";import{useAppStatePartial as S}from"../../state/AppState.js";import*as t from"../../style.js";import{RectangleItem as x}from"./RectangleItem.js";const C=n`
  display: block;
  padding-right: 0;
  padding-left: 0;
`,b=n`
  margin-top: ${t.spacing(2)};
  max-height: min(30vh, 150px);
  overflow-y: scroll;
  scrollbar-width: thin; // :)
`;export const ImageSettings=({isOpen:l,setSettingsOpen:r,isDimed:m,setIsDimed:g})=>{const{setImage:p,rectangles:s,addRectangle:d}=S("setImage","rectangles","addRectangle");return e(h,{title:"Input Settings",isOpen:l,setSettingsOpen:r},e(o,{className:t.flexCenter},e(c,{icon:"close",title:"Close current image and start with a new one",onClick:()=>{p(null,void 0)}},"Close Image")),e(o,{className:C},e("div",{class:t.flexCenter},e(c,{icon:"add",title:"Add new selection area to extract another part of the image",onClick:()=>{d()}},"Add New Selection Area")),e("ul",{class:a(t.noMargins,b)},s.map(i=>e(x,{key:i.id,rect:i,isDeletable:s.length>1})))),e(o,{className:a(t.flexSides,t.flexAltCenter)},e(k,{id:"image-dim-checkbox",title:"Shade the image for easier selection"},"Dim"),e(f,{id:"image-dim-checkbox",title:"Shade the image for easier selection",checked:m,onChecked:g})))};
