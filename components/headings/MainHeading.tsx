import { StyleSheet, View, Text, useColorScheme, Image, ImageBackground, Platform } from "react-native";
import { fontColor, fontLight, fontLightAlt, white } from "../../constants/Colors";
import headBG from "../../assets/images/headBG.png"
import birdLogo from "../../assets/images/birdLogo.png"
import { isMobile } from "../../constants/Layout";
import { isPortrait } from "../../hooks/isPortrait";

export default function MainHeading(props: any) {
  const dark = useColorScheme() === "dark";
  return (
    <View style={[isMobile() ? styles.conMobi : isPortrait() ?
      styles.conTabPort : styles.conTabLand, props.styleProp]}
    >
      <ImageBackground source={headBG} style={styles.headBackground}>
        <Image source={birdLogo} style={styles.birdStyle} />
        <Text style={[dark ? styles.fontLi : styles.fontReg, styles.heading]}>
          wwf Champion
        </Text>
        <Text
          style={[dark ? styles.fontLiAlt : styles.fontReg, styles.subHeading,
          ]}
        >
          wine farm guide
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  conMobi: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? -35 : -60,
  },
  conTabPort: {
    width: "110%",
    transform: ([{ translateX: -45 }]),
  },
  conTabLand: {
    width: "110%",
    transform: ([{ translateX: -70 }]),
  },
  headBackground: {
    paddingTop: 40,
    height: 190,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    textTransform: "uppercase",
    letterSpacing: 5.33,
    fontFamily: "WWFWebfontRegular",
    fontSize: 32,
    color: white,
    marginBottom: Platform.OS === "ios" ? -5 : -3,
    marginTop: Platform.OS === "ios" ? -9 : -3,
  },
  birdStyle: {
    height: 69,
    width: 50
  },
  subHeading: {
    paddingHorizontal: 5,
    textTransform: "uppercase",
    letterSpacing: 2.67,
    fontFamily: "WWFWebfontRegular",
    fontSize: 16,
    color: white,
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
  fontLi: { color: fontLight },
  fontWhite: { color: white }
});
