import { css, cx } from "@emotion/css";

export const relative = css`
  position: relative;
`;

export const wh100 = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const size = (w: number | string, h?: number | string): string => css`
  width: ${w};
  height: ${h != null ? h : w};
`;

export const noMargins = css`
  padding: 0;
  margin: 0;
  outline: 0;
`;

export const fillAbsolute = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const hide = css`
  display: none;
`;

export const fontNormal = css`
  font-weight: normal;
`;
export const fontBold = css`
  font-weight: bold;
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
`;
export const flexSides = css`
  display: flex;
  justify-content: space-between;
`;
export const flexAltCenter = css`
  // on alternative/secondary axis
  align-items: center;
`;

export const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const appColumnStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  width: 0;
  max-height: 100vh;
  height: 100vh;
  position: relative;
`;

export const COLORS = {
  themeTeal: "#13A3BB",
  themePurple: "#CB1482",

  white: "white", // TODO make it off-white, like opening modal
  dirtyWhite: "#EAEAEA",
  greyLight: "#B2B2B2",
  greyMid: "#858585",
  greyDark: "#6A6A6A",
};

export const RECTANGLE_COLORS = [
  COLORS.themePurple,
  COLORS.themeTeal,
  "#10b918",
  "#1454cb",
  "#9114cb",
  "#cb5d14",
  "#b31847",
  "#8dbe18",
];

export const ANIMATION = { fast: "0.2s" };

export const textWhite = css`
  color: ${COLORS.white};
`;
export const textCenter = css`
  text-align: center;
`;

export const textNormal = cx(textWhite);

export const spacing = (...a: number[]): string =>
  a.map((n) => `${n * 4}px`).join(" ");

export const borderRadius = (size: "s" | "m" | "l"): string =>
  size === "s" ? "4px" : size === "m" ? "8px" : "50px";

export const activableHover = css`
  transition: opacity ${ANIMATION.fast};
  &:hover {
    opacity: 0.6;
  }
`;

export const invisibleBtn = css`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  font: inherit;
  padding: 0;
  margin: 0;
`;

export const offScreen = css`
  position: absolute;
  left: -9999px;
`;

export const pinchZoomStyle = cx(relative, wh100);

export const imageInfoTopStyle = (theme: AppTheme): string => css`
  position: absolute;
  top: 0;
  background-color: ${theme.primary};
  padding: ${spacing(0.5, 4, 1)};
`;

export interface AppTheme {
  primary: string;
}

export const ThemeTeal: AppTheme = {
  primary: COLORS.themeTeal,
};
export const ThemePurple: AppTheme = {
  primary: COLORS.themePurple,
};