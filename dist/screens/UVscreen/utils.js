import{initializeGlView as s,destroyGlContext as c,redraw as d}from"../../gl.js";import{sub2d as u}from"../../utils/index.js";export const redrawUVview=(e,n,{borderSafeSpace:t,renderSmooth:o,start:a,clear:i})=>{if(n!=null&&e!=null){const r=n.map(l=>u(l,{x:t,y:t}));d(e,r,{isSmooth:o,start:a,clear:i})}},getSelectedRect=(e,n)=>{const t=e.find(o=>o.id===n);return t!=null?t:e[0]},getRectToDraw=(e,n,t)=>{var o;return e!=null?e:(o=getSelectedRect(n,t))==null?void 0:o.points},withGlContext=(e,n,t,o)=>{let a;try{const i=document.createElement("canvas");i.width=e,i.height=n,a=s(i,t),o(i,a)}finally{a&&c(a)}};export function downloadCanvasAsImage(e,n){const t=document.createElement("a");t.setAttribute("download",`${n}.png`);const a=e.toDataURL("image/png").replace(/^data:image\/png/,"data:application/octet-stream");t.setAttribute("href",a),t.click()}
