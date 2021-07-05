import{css as t,cx as r}from"../snowpack/pkg/@emotion/css.js";export const relative=t`
  position: relative;
`,wh100=t`
  position: relative;
  width: 100%;
  height: 100%;
`,size=(e,o)=>t`
  width: ${e};
  height: ${o!=null?o:e};
`,noMargins=t`
  padding: 0;
  margin: 0;
  outline: 0;
`,fillAbsolute=t`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`,hide=t`
  display: none;
`,fontNormal=t`
  font-weight: normal;
`,fontBold=t`
  font-weight: bold;
`,flexCenter=t`
  display: flex;
  justify-content: center;
`,flexSides=t`
  display: flex;
  justify-content: space-between;
`,flexAltCenter=t`
  // on alternative/secondary axis
  align-items: center;
`,ellipsis=t`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,appColumnStyle=t`
  flex-grow: 1;
  flex-shrink: 1;
  width: 0;
  max-height: 100vh;
  height: 100vh;
  position: relative;
`,ANIMATION={fast:"0.2s"},spacing=(...e)=>e.map(o=>`${o*4}px`).join(" "),borderRadius=e=>e==="s"?"4px":e==="m"?"8px":"50px",activableHover=t`
  cursor: pointer;
  transition: opacity ${ANIMATION.fast};
  &:hover {
    opacity: 0.6;
  }
`,invisibleBtn=t`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  font: inherit;
  padding: 0;
  margin: 0;
`,offScreen=t`
  position: absolute;
  left: -9999px;
`,modalDimmer=r(fillAbsolute,t`
    background-color: rgba(0, 0, 0, 0.5);
  `),pinchZoomStyle=r(relative,wh100),mqH=e=>`@media (max-height: ${e}px)`,mqW=e=>`@media (max-width: ${e}px)`,ThemeTeal={primary:"hsl(189, 82%, 40%)",primaryLight:"hsl(189, 82%, 50%)"},ThemePurple={primary:"hsl(324, 82%, 44%)",primaryLight:"hsl(324, 82%, 58%)"},COLORS={themeTeal:"#13A3BB",themePurple:"#CB1482",white:"white",dirtyWhite:"#EAEAEA",greyLight:"#B2B2B2",greyMid:"#858585",greyDark:"#6A6A6A",error:"#BB1313"},theme=e=>t`
  --primary: ${e.primary};
  --primary-light: ${e.primaryLight};
`,RECTANGLE_COLORS=[COLORS.themePurple,COLORS.themeTeal,"#10b918","#1454cb","#9114cb","#cb5d14","#b31847","#8dbe18"],textWhite=t`
  color: ${COLORS.white};
`,textNormal=r(textWhite),textCenter=t`
  text-align: center;
`,modal=t`
  margin: 50px auto 0;
  border-radius: ${borderRadius("m")};
  background-color: ${COLORS.dirtyWhite};
  overflow: hidden;
  position: relative;
`;
