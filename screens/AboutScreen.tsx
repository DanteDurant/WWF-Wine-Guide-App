import {StyleSheet,StatusBar,View,Text,useColorScheme,
} from "react-native";
import { RootTabScreenProps } from "../types";
import BGImage from "../components/reuseable/Image"; 
import aboutBG from "./../assets/images/aboutBG.jpeg";
import logo from "./../assets/images/logo.png";

import {darkBG,fontColor,fontLightAlt,lightBG,
} from "../constants/Colors";
import ReadMore from "../components/reuseable/ReadMore";
import Styles from "../constants/Styles";
import Header from "../components/farm/Header";

import { useIsFocused } from "@react-navigation/native";

export default function AboutScreen({navigation,
}: RootTabScreenProps<"TabFour">) {
  const darkMode = useColorScheme() === "dark";
  return (
    <View style={[darkMode ? styles.black : styles.white, styles.container]}>
      {useIsFocused() ? <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} /> : null}
      <BGImage
        ImageCon={styles.image}
        ImageBG={aboutBG}
        logo={logo}
        logoSt={styles.logo}
      ></BGImage>
      <Header title="Conservation and Wine" />
      <Text style={[darkMode ? styles.fontLiAlt : styles.fontReg, styles.para]}>
        Conservation Champions is a voluntary land and water stewardship
        programme, run by the World wide Fund for Nature South Africa (WWF-SA),
        for wine farms in the Western Cape, South Africa.
      </Text>
      {/* <ReadMore /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 240,
    ...Styles.center,
  },
  logo: {
    height: 100,
  },
  heading: {
    paddingLeft: 24,
    paddingTop: 24,
    fontFamily: "WWFWebfontRegular",
    fontSize: 32,
  },
  para: {
    paddingHorizontal: 24,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "RobotoRegular",
  },
  white: { backgroundColor: lightBG },
  black: { backgroundColor: darkBG },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
});
