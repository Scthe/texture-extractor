import{injectGlobal as o}from"../snowpack/pkg/@emotion/css.js";o`

/* latin-ext */
@font-face {
  font-family: "Oxygen";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(fonts/oxygen-ext.woff2) format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Oxygen";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(fonts/oxygen.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* MATERIAL ICONS */
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(fonts/material-icons.woff2) format("woff2");
}

/* CSS */
body {
  margin: 0;
  font-family: "Oxygen", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #282c34;
}

html {
  width: 100%;
  overflow: hidden;
  /* snowpack has default Segue on windows, so now we have to rescale.. ehhhh.. */
  font-size: 15px;
}
body {
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  overflow-y: hidden;
  color: #121212;
}
@media (max-width: 800px) {
  /* Allow to scroll down to hide address bar*/
  body {
    overflow-y: scroll;
  }
}

* {
  box-sizing: border-box;
}
`;