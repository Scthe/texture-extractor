import{css as t,cx as s}from"../../../snowpack/pkg/@emotion/css.js";import{h as c}from"../../../snowpack/pkg/preact.js";import{useCallback as a}from"../../../snowpack/pkg/preact/hooks.js";import{SETTINGS_SECTION_PADDING_H as f}from"../../components/SettingsSection.js";import{Icon as i}from"../../components/Icon.js";import{useAppStatePartial as I}from"../../state/AppState.js";import{cancelEvent as u}from"../../utils/index.js";import*as e from"../../style.js";const S="24px",C=t`
  margin-bottom: ${e.spacing(1)};
  cursor: pointer;
  transition: background-color ${e.ANIMATION.fast};
  padding: ${e.spacing(1,f)};
  &:hover {
    background-color: ${e.COLORS.dirtyWhite};
  }
`,N=t`
  background-color: ${e.COLORS.themePurple}20;
`,O=t`
  flex-shrink: 0;
`,R=t``,h=t`
  flex-grow: 1;
  padding: ${e.spacing(0,2)};
`,x=t`
  flex-shrink: 0;
  color: ${e.COLORS.greyDark};
`,v=t`
  cursor: pointer;
  transition: color ${e.ANIMATION.fast};
  &:hover {
    color: var(--primary);
  }
`,$=t`
  cursor: not-allowed;
`;export const RectangleItem=({rect:o,isDeletable:m})=>{const{removeRectangle:r,selectRectangle:n,selectedRectangleId:p}=I("removeRectangle","selectRectangle","selectedRectangleId"),l=p===o.id,d=a(k=>(r(o.id),u(k)),[o.id,r]),g=a(()=>{n(o.id)},[o.id,n]);return c("li",{class:s(e.flexSides,e.flexAltCenter,C,l&&N),onClick:g},c("div",{class:s(e.size(S),O),style:`background-color: ${o.color}`},l?c(i,{name:"check",className:s(e.textWhite,R)}):null),c("div",{class:s(e.ellipsis,h)},o.id),c(i,{name:"delete",title:"Delete area",onClick:d,className:s(x,m?v:$)}))};
