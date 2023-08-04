import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import {darkAltBG,darkBG,fontColor,fontDark,fontLight,
  fontLightAlt,lightAltBG2,lightBG, white
} from "../../constants/Colors";
import { generateOpeningHours, getOpenStatus } from "../../util/util";
import Spacer16 from "../reuseable/Spacer16";

export default function Hours(props: any) {
  const darkMode = useColorScheme() === "dark";
  const openStatus = getOpenStatus(props.vineyard)
  return (
    <View style={[darkMode ? styles.blackCream : styles.cream, styles.container]} >
      <Text style={[darkMode ? styles.fontWhite : styles.fontDark, styles.open]} >
        Opening Hours
      </Text>
      <Spacer16/>
      <Text style={[darkMode ? styles.fontLiAlt : styles.fontReg, styles.days]}>
        { generateOpeningHours(props.vineyard.hours) }
      </Text>
      <Text style={{...styles.openStatus, ...openStatus.style}}>{ openStatus.text }</Text>
    </View>
  );
}
const baseStyle = {
  fontFamily: "RobotoRegular",
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    padding: 24,
  },
  open: {
    ...baseStyle,
  },
  days: {
    ...baseStyle,
    lineHeight: 24,
  },
  openStatus: {
    ...baseStyle,
    position: 'absolute',
    right: 24, top: 24,
  },
  cream: { backgroundColor: lightAltBG2 },
  blackCream: { backgroundColor: darkAltBG },
  fontWhite: { color: white },
  fontReg: { color: fontColor },
  fontDark: { color: fontDark },
  fontLiAlt: { color: fontLightAlt },
});
