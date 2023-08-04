import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import {
  darkAltBG,
  fontColor,
  fontDark,
  fontLightAlt,
  grayDarkTr,
  grayLight,
  grayLightTr,
} from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function Button(props: any) {
  const dark = useColorScheme() === "dark";

  return (
    <Pressable
      style={({ pressed }) => [{
        backgroundColor: pressed
          ?dark
            ?grayDarkTr
            :grayLightTr
          :dark
            ?darkAltBG
            :grayLight,
        },styles.button
      ]}
    >
      <Image source={props.icon} style={styles.icon} />
      <Text style={[dark ? styles.fontLiAlt : styles.fontDark]}>
        {props.buttonText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 113,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    ...Styles.center,
    alignSelf: "center",
    flexDirection: "row",
  },
  icon: {
    ...Styles.icon24,
    marginRight: 12,
  },

  fontReg: { color: fontColor },
  fontDark: { color: fontDark },
  fontLiAlt: { color: fontLightAlt },
});
