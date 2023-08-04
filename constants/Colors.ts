const tintColorLight = "#5D4D8E";
const tintColorDark = "#5e3487";

export const lightBG = "#F8F7F2";
export const lightAltBG = "#EAE7D8";
export const brownAltBG = "#cfc5aa";
export const lightBG2 = "#ffffff";
export const lightAltBG2 = "#F8F7F2";

export const darkBG = "#000";
export const darkAltBG = "#212529";

export const fontColor = "#696861";
export const fontDark = "#4a4a4a";

export const fontLight = "#f1f3f5";
export const fontLightAlt = "#adb5bd";

export const grayLight = "#f7f7f7";
export const grayLightAlt = "#c5cdd5";
export const grayLightTr = "rgba(230,230,230, 0.5)";
export const gray = "#5D6b74";
export const grayDark = "#212529";
export const grayDarkTr = "rgba(33, 37, 41, 0.5)";

export const white = "#fff";
export const purple = "#6A4B89"
export const purpleAlt = "#5e3487"
export const greenLight = "#39B230";
export const green = "#6F9A2E"; 
export const greenAlt = "#b9ce4d"; 
export const greenDark = "#1E5128";
export const red = "#E4006E";
export const orange = "#F5A623";
export const blue = "#336eac";
export const transparent = "rgba(0,0,0,0)";

export default {
  light: {
  text: fontDark,
  textAlt: fontColor,
  background: lightBG,
  backgroundAlt: lightAltBG,
  filterGreen: green,
  filterGray: gray,
  backgroundCard: lightBG,
  backgroundButton: lightAltBG,
  tint: tintColorLight,
  tabIconDefault: "#000",
  tabIconSelected: tintColorLight,
  },

  dark: {
    text: fontLight,
    textAlt: fontLightAlt,
    background: darkBG,
    backgroundAlt: darkBG,
    filterGreen: greenDark,
    filterGray: grayDark,
    backgroundCard: darkAltBG,
    backgroundButton: darkAltBG,
    tint: tintColorDark,
    tabIconDefault: fontDark,
    tabIconSelected: tintColorDark,
  },
};
