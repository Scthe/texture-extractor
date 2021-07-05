import{useCallback as w}from"../../../snowpack/pkg/preact/hooks.js";import{useLatest as k}from"../../hooks/useLatest.js";import{useAppStatePartial as R}from"../../state/AppState.js";import{getRectDimensions as g}from"../../gl.js";import{logEvent as p,logError as _}from"../../utils/log.js";import{downloadCanvasAsImage as A,getSelectedRect as B,redrawUVview as C,withGlContext as j}from"./utils.js";const i=10;function d(o,e){var t,a,n;return{m_isExample:(t=e.image)==null?void 0:t.isExample,m_image_width:(a=e.image)==null?void 0:a.data.width,m_image_height:(n=e.image)==null?void 0:n.data.height,m_renderSmooth:e.renderSmooth,m_pinkBackground:e.pinkBackground,m_selections:o.map(r=>g(r.points))}}const D=o=>{const e=o.map(r=>g(r.points)),t=e.reduce((r,s)=>r+s[0],0),a=(o.length-1)*i,n=i*2;return[t+a+n,Math.max(...e.map(r=>r[1]))]},f=(o,e)=>{try{const{image:t,renderSmooth:a,borderSafeSpace:n}=e;if(o.length===0||!(t==null?void 0:t.data))return;p("download",d(o,e));const[r,s]=D(o);j(r,s,t==null?void 0:t.data,(c,l)=>{e.pinkBackground?l.gl.clearColor(1,0,1,1):l.gl.clearColor(0,0,0,1),l.gl.clear(l.gl.COLOR_BUFFER_BIT);let u=i;for(let m=0;m<o.length;m++){const h=o[m];C(l,h.points,{borderSafeSpace:n,renderSmooth:a,start:{x:u,y:0},clear:!1}),u+=g(h.points)[0]+i}const S=o.length===1?`-${o[0].id}`:"";A(c,`${t.filename}${S}`)})}catch(t){_("Download error",t,d(o,e))}};export const useResultDownload=()=>{const o=R("image","rectangles","selectedRectangleId","renderSmooth","borderSafeSpace","pinkBackground"),e=k(o),t=w(()=>{const{rectangles:n,selectedRectangleId:r}=e.current,s=B(n,r),c=s!=null?[s]:[];p("download_selected",d(c,e.current)),f(c,e.current)},[e]),a=w(()=>{const{rectangles:n}=e.current;p("download_all",d(n,e.current)),f(n,e.current)},[e]);return{downloadSelectedRect:t,downloadAllRects:a}};
