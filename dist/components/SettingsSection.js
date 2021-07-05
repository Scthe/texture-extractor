import{h as o}from"../../snowpack/pkg/preact.js";import{css as s,cx as n}from"../../snowpack/pkg/@emotion/css.js";import*as t from"../style.js";export const SETTINGS_SECTION_PADDING_H=4;const i=s`
  border-bottom: 1px solid ${t.COLORS.greyLight};
  &:last-child {
    border-bottom: 0px;
  }
`,p=s`
  padding: ${t.spacing(3,SETTINGS_SECTION_PADDING_H)};
  display: flex;
`;export const SettingsSection=({className:c,children:r})=>o("div",{class:i},o("div",{class:n(p,c)},r));
