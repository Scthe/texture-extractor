import{captureException as a,addBreadcrumb as n,Severity as o}from"../../snowpack/pkg/@sentry/react.js";import{useAppState as g}from"../state/AppState.js";export const logEvent=(e,t={})=>{n({type:"app_event",message:e,level:o.Log,data:t}),window.gtag!=null?gtag("event",e,t):console.log("[EVENT]",e,t)},getZustandState=()=>{try{const e=g.getState();return{selectedRectangleId:e.selectedRectangleId,rectangles:e.rectangles,borderSafeSpace:e.borderSafeSpace,pinkBackground:e.pinkBackground,renderSmooth:e.renderSmooth,image:e.image!=null?{isExample:e.image.isExample,width:e.image.data.width,height:e.image.data.height}:null}}catch(e){return{}}},logError=(e,t,r={})=>{console.group(`[ERROR] ${e} : ${t.message}`),console.error("Params",r),console.error(t),console.groupEnd(),a(t,{fingerprint:[e,t.message],extra:{...getZustandState(),...r,custom_error_name:e},level:o.Error})};