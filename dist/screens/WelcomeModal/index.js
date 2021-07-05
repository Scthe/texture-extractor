import{h as e}from"../../../snowpack/pkg/preact.js";import{useCallback as g,useRef as $}from"../../../snowpack/pkg/preact/hooks.js";import{css as n,cx as s}from"../../../snowpack/pkg/@emotion/css.js";import"../../../snowpack/pkg/file-drop-element.js";import*as t from"../../style.js";import{Icon as O}from"../../components/Icon.js";import{decodeImage as S}from"../../utils/decodeImage.js";import{useAppStatePartial as E}from"../../state/AppState.js";import{useBoolState as R}from"../../hooks/useBoolState.js";import{logError as v,logEvent as u}from"../../utils/log.js";import{ImageAvatar as A}from"./ImageAvatar.js";import{EXAMPLE_IMAGES as j}from"./exampleImages.js";const f=a=>({m_fileSizeKB:Math.floor(a.size/1024),m_fileType:a.type}),I=n`
  max-width: 600px;
  padding-top: ${t.spacing(4)};
  ${t.mqH(650)} {
    margin-top: 0;
  }
`,M=n`
  color: #464646;
  font-size: 1.85rem;
  font-weight: normal;
`,B=n`
  position: absolute;
  top: 0;
  right: ${t.spacing(2)};

  a {
    color: ${t.COLORS.greyDark};
    font-size: 0.85rem;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`,L=n`
  fill: ${t.COLORS.greyDark};
  position: relative;
  top: 6px;
  margin-right: ${t.spacing(1)};
  width: 18px;
`,F=n`
  padding: ${t.spacing(8)} 0;
`,z=n`
  position: relative;
  height: 250px;
  ${t.mqH(650)} {
    height: 150px;
  }
`,N=n`
  overflow: initial;
  max-height: 100%;
`,T=n`
  fill: ${t.COLORS.themePurple};
  opacity: 0.33;
`,P=n`
  position: absolute;
`,W=n`
  font-size: 100px;
  max-width: 100px;
`,y=n`
  margin: 0;
  font-size: 1rem;
`,D=n`
  background-color: ${t.COLORS.themeTeal};
  border-radius: ${t.borderRadius("l")} ${t.borderRadius("l")} 0 0;
  padding-top: ${t.spacing(5)};
`,G=n`
  display: grid;
  justify-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: ${t.spacing(5)} 0;
  grid-template-columns: repeat(3, 1fr);
  max-width: 450px;
`,H=n`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`,q=n`
  background-color: ${t.COLORS.error};
  padding: ${t.spacing(.5,4,1)};
  border-bottom-left-radius: ${t.borderRadius("m")};
  border-bottom-right-radius: ${t.borderRadius("m")};
  transform-origin: top center;
  animation-duration: ${t.ANIMATION.fast};
  animation-name: slidein;

  @keyframes slidein {
    from {
      transform: scale(0);
    }
    75% {
      transform: scale(1.3);
    }
    to {
      transform: scale(1);
    }
  }
`,X=n`
  overflow: hidden;
  touch-action: none;
  height: 100%;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    display: block;
    left: 10px;
    top: 10px;
    right: 10px;
    bottom: 10px;
    pointer-events: none;
    background-color: ${t.COLORS.themePurple}28;
    border: 2px dashed ${t.COLORS.themePurple};
    border-radius: 10px;
    opacity: 0;
    transform: scale(0.95);
    transition: all ${t.ANIMATION.fast} ease-in;
    transition-property: transform, opacity;
  }

  &.drop-valid::after {
    opacity: 1;
    transform: scale(1);
    transition-timing-function: ease-out;
  }
`,K=async a=>{const p=await fetch(a.url).then(i=>i.blob()),x=a.url.substring(a.url.lastIndexOf("/")+1);return new File([p],x,{type:p.type})};export const WelcomeModal=()=>{const{image:a,setImage:p}=E("image","setImage"),{value:x,setTrue:i,setFalse:l}=R(!1),b={class:T,rx:t.borderRadius("m"),ry:t.borderRadius("m"),width:350,height:200},d=$(),k=()=>{d.current&&d.current.click()},c=g((r,o)=>{d.current&&(d.current.value="");const m=new AbortController;S(m.signal,r).then(h=>{u("image_open",{...f(r),m_example_name:o==null?void 0:o.name,m_image_width:h.width,m_image_height:h.height,m_isExample:o!=null}),p({data:h,isExample:o!=null,filename:o!=null?o.name:r.name},o==null?void 0:o.points)}).catch(h=>{i(),v("Error decoding image",h,{...f(r),exampleImg:o})})},[p,i]),C=g(r=>{l(),u("example_picked",{m_example_type:r.name}),K(r).then(o=>c(o,r)).catch(o=>{i(),v("Example picking error",o,{type:r.name,exampleImg:r})})},[l,i,c]),w=g(r=>{l();const o=r.target,m=o.files&&o.files[0];!m||(u("file_selected_browser",f(m)),c(m,null))},[l,c]),_=g(({files:r})=>{if(l(),!r||r.length===0)return;const o=r[0];u("file_selected_drag_and_dropped",f(o)),c(o,null)},[l,c]);return a!=null?null:e("div",{class:t.modalDimmer},e("file-drop",{onfiledrop:_,accept:"image/*",class:X},e("div",{class:s(t.modal,I)},e("input",{class:t.hide,ref:d,type:"file",onChange:w}),e("h1",{class:s(t.textCenter,t.noMargins,M)},"Texture Extractor"),e("div",{class:B},e("a",{href:"https://github.com/Scthe/texture-extractor",target:"_blank",rel:"noopener noreferrer",onClick:()=>{u("github_outgoing")}},e("svg",{class:L,width:"24",height:"24",viewBox:"0 0 24 24"},e("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})),e("span",null,"Source on GitHub"))),e("section",{class:s(t.flexCenter,F)},e("div",{class:s(t.flexCenter,t.flexAltCenter,z)},e("svg",{class:s(N),preserveAspectRatio:"xMidYMid meet",width:"435",height:"255",viewBox:"0 0 435 255"},e("g",{transform:"translate(0 0)"},e("rect",{...b,x:"0",y:"30"}),e("rect",{...b,x:"85",y:"0"}),e("rect",{...b,x:"50",y:"55"}))),e("div",{class:s(t.textWhite,t.textCenter,P)},e("button",{class:t.invisibleBtn,onClick:k},e(O,{name:"image_plus",className:s(t.textWhite,W)})),e("h2",{class:s(t.fontNormal,y)},"Drop image here")))),e("section",{class:s(t.textWhite,D)},e("h2",{class:s(t.fontNormal,t.textCenter,y)},"Or try one of these:"),e("ul",{class:G},j.map(r=>e(A,{imageData:r,setImage:C})))))),x&&e("div",{class:H},e("div",{class:s(t.textWhite,t.textCenter,q)},"Could not load the image")))};
