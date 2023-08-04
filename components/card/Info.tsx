import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import {
  darkAltBG, fontColor, fontLightAlt,
  green, lightBG, orange, red,
} from "../../constants/Colors";

import locationPin from "../../assets/images/location.png";
import Icons from "./Icons";

export default function Info(props: any) {
  const darkMode = useColorScheme() === "dark";
  return (
    <View
      style={[
        {},
        darkMode ? styles.blackCream : styles.white, styles.container

      ]}
    >
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text
            style={[
              darkMode ? styles.fontLiAlt : styles.fontReg,
              styles.address,
            ]}
          >
            {props.address}
          </Text>
        </View>
        <View style={styles.topRight}>
          <Text style={props.colorTime}>{props.closingTime} </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <Image style={styles.pin} source={locationPin} />
          <Text style={[darkMode ? styles.fontLiAlt : styles.fontReg]}>
            {props.distance}
          </Text>
        </View>
        <View style={styles.bottomRight}>
          <Icons {...props.icons} />
        </View>
      </View>
    </View>
  );
}

export function farmStyles(props: any) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    maxWidth: "100%",
    minHeight: 88,
    height: 104,
    padding: 16,
  },
  top: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  topLeft: {
    justifyContent: "flex-start",
    flexShrink: 1,
    marginRight: 16,
  },
  topRight: {
    flexDirection: "column",
    maxWidth: "50%",
  },
  address: {
    backgroundColor: "transparent",
    fontFamily: "RobotoRegular",
  },

  bottom: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 20,
    paddingTop: 16,
  },
  bottomLeft: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pin: {
    height: 20,
    width: 20,
  },
  bottomRight: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 4,
    paddingBottom: 8,
  },

  white: { backgroundColor: lightBG },
  blackCream: { backgroundColor: darkAltBG },

  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
});
