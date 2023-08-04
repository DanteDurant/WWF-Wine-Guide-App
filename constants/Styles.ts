import { fontColor, fontDark, green, orange, red } from "./Colors";

const Styles: any = {
  timeOrange: {
    color: orange,
    fontFamily: "RobotoRegular",
  },
  timeRed: {
    color: red,
    fontFamily: "RobotoRegular",
  },
  timeGreen: {
    color: green,
    fontFamily: "RobotoRegular",
  },
  farmStyle: {
    position: "absolute",
    top: 16,
    right: 24,
    fontFamily: "RobotoRegular",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  betweenCenter: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  fontWWF: {
    color: fontColor,
    fontFamily: "WWFWebfontRegular",
  },
  fontDarkWWF: {
    color: fontDark,
    fontFamily: "WWFWebfontRegular",
  },
  fontRobo: {
    fontFamily: "RobotoRegular",
    color: fontColor,
  },
  fontDarkRobo: {
    fontFamily: "RobotoRegular",
    color: fontDark,
  },
  icon24: {
    height: 24,
    width: 24,
  },
  back: {
    position: "absolute",
    top: 40,
    left: 15,
    zIndex: 999,
  },
};
export default Styles;
