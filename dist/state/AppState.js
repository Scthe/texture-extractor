import R from"../../snowpack/pkg/zustand.js";import S from"../../snowpack/pkg/lodash.clonedeep.js";import{RECTANGLE_COLORS as a}from"../style.js";import{ensurePointInsideImage as i,getFromArray as m}from"../utils/index.js";const f=-999,s=e=>`image--${e.filename}`;export const resetImageStorage=e=>{e!=null&&localStorage.removeItem(s(e))};const b=(e,n,t)=>{const r=()=>({x:Math.floor(Math.random()*n.data.width),y:Math.floor(Math.random()*n.data.height)}),o=[r(),r(),r(),r()];return o.forEach(c=>i(c,n,t)),{id:e,points:o,color:a[Math.floor(Math.random()*a.length)]}},h=(e,n,t)=>{const r=t,o=n.data.width/3,c=t,d=n.data.height/2,u=[{x:r,y:d},{x:o,y:d},{x:r,y:c},{x:o,y:c}];return u.forEach(p=>i(p,n,t)),{id:e,points:u,color:m(a,e)}},I=e=>e.length<1?1:1+Math.max(...e.map(n=>n.id)),y=(e,n,t)=>{if(e==null)return[];function r(o){return o!=null&&Array.isArray(o)&&o.length>0}if(r(n))return n.map((o,c)=>({id:c,color:m(a,c),points:S(o)}));try{const o=localStorage.getItem(s(e)),c=o!=null?JSON.parse(o):null;if(r(c))return c}catch(o){}return[h(0,e,t)]},g=(e,n)=>{e!=null&&n.length>0&&localStorage.setItem(s(e),JSON.stringify(n))};function l(e){return e}const x=(e,n,t)=>{const r=y(n,t,e.borderSafeSpace);return l({...e,selectedRectangleId:r.length>0?r[0].id:f,rectangles:r,image:n})},k=e=>{if(e.image==null)return e;const n=I(e.rectangles),t=h(n,e.image,e.borderSafeSpace),r=[...e.rectangles,t];return g(e.image,r),l({...e,selectedRectangleId:t.id,rectangles:r})},E=(e,n)=>{if(e.rectangles.length===1)return e;const t=e.rectangles.filter(o=>o.id!==n),r=n===e.selectedRectangleId?t[0].id:e.selectedRectangleId;return g(e.image,t),l({...e,rectangles:t,selectedRectangleId:r})},M=(e,n)=>{const t=e.rectangles.find(r=>r.id===n);return l({...e,selectedRectangleId:t!=null?n:e.selectedRectangleId})},A=(e,n,t)=>{const r=e.rectangles.map(o=>o.id===n?{...o,points:t}:o);return g(e.image,r),l({...e,selectedRectangleId:n,rectangles:r})};export const useAppState=R(e=>({selectedRectangleId:f,rectangles:[],borderSafeSpace:20,image:null,renderSmooth:!1,pinkBackground:!1,setImage:(n,t)=>e(r=>x(r,n,t)),addRectangle:()=>e(n=>k(n)),removeRectangle:n=>e(t=>E(t,n)),selectRectangle:n=>e(t=>M(t,n)),moveRectangle:(n,t)=>e(r=>A(r,n,t)),setRenderSmooth:n=>e(t=>({...t,renderSmooth:n})),setPinkBackground:n=>e(t=>({...t,pinkBackground:n}))})),useAppStatePartial=(...e)=>useAppState(n=>e.reduce((t,r)=>(t[r]=n[r],t),{}));