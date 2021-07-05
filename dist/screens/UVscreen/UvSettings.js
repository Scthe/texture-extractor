import{css as l,cx as a}from"../../../snowpack/pkg/@emotion/css.js";import{h as e}from"../../../snowpack/pkg/preact.js";import{SettingsPanel as k}from"../../components/SettingsPanel.js";import{SettingsSection as n}from"../../components/SettingsSection.js";import{Button as c}from"../../components/Button.js";import{Checkbox as r,CheckboxLabel as i}from"../../components/Checkbox.js";import{useAppStatePartial as f}from"../../state/AppState.js";import*as o from"../../style.js";import{useResultDownload as h}from"./useResultDownload.js";const S=l`
  display: block;
`,d=l`
  display: block;
  margin: 0 auto;

  &:not(:last-child) {
    margin-bottom: ${o.spacing(3)};
  }
`;export const UvSettings=({isOpen:m,setSettingsOpen:p})=>{const t=f("renderSmooth","setRenderSmooth","pinkBackground","setPinkBackground","rectangles"),{downloadSelectedRect:g,downloadAllRects:u}=h(),s=t.rectangles.length<2;return e(k,{title:"Output Settings",isOpen:m,setSettingsOpen:p},e(n,{className:S},e(c,{icon:"file_download",title:"Download the result image for current selection area",onClick:g,className:d},"Download Current"),e(c,{icon:"download",title:"Download all selected area results on a single image",onClick:()=>{s||u()},className:d,disabled:s},"Download All")),e(n,{className:a(o.flexSides,o.flexAltCenter)},e(i,{id:"uv-soften-checkbox",title:"Blur image. May improve result for certain types of content."},"Smooth"),e(r,{id:"uv-soften-checkbox",title:"Blur image. May improve result for certain types of content.",checked:t.renderSmooth,onChecked:t.setRenderSmooth})),e(n,{className:a(o.flexSides,o.flexAltCenter)},e(i,{id:"uv-alt-bg-checkbox",title:"Alternative background for 'Download All' image."},"Alt. Background"),e(r,{id:"uv-alt-bg-checkbox",title:"Alternative background for 'Download All' image.",checked:t.pinkBackground,onChecked:t.setPinkBackground})))};
