import React from "react";

import { StyleSheet, View, Text, useColorScheme, Platform } from "react-native";
import {darkBG,fontDark,fontLight,
} from "../../constants/Colors";

export default function Header(props: any) {
  const darkMode = useColorScheme() === "dark";
  return (
    <View style={[darkMode ? styles.black : styles.trans, styles.container]}>
      <Text style={[darkMode ? styles.fontLi : styles.fontDark, styles.title, {flexWrap: 'wrap'}]} numberOfLines={0}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    minHeight: 80,
  },
  title: {
    fontFamily: "WWFWebfontRegular",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 28,
    fontSize: 32,
    lineHeight: 40,
    flexWrap: 'wrap',
  },
  trans: {backgroundColor: "rgba(0,0,0,0)"},
  black: { backgroundColor: darkBG },
  fontDark: { color: fontDark },
  fontLi: { color: fontLight },

});
