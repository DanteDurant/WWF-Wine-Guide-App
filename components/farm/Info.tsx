import React from "react";
import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { fontColor, fontDark, fontLightAlt } from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { getBadgeDescription, getBadgeIcon } from "../../util/util";
import ReadMore from "../reuseable/ReadMore";
import Spacer8 from "../reuseable/Spacer8";

export default function Info(props: any) {
  const dark = useColorScheme() === "dark";

  const icons = Object.keys(props.icons).map((id: any) => {
    const icon = getBadgeIcon(id),
      desc = getBadgeDescription(id)
    return (
      <View key={id} style={styles.iconRow}>
        <Image source={icon} style={{ ...Styles.icon24, marginRight: 16 }} />
        <Text style={[dark ? styles.fontLiAlt : styles.fontDark, styles.iconDesc]}>{desc}</Text>
      </View>
    )
  })
  return (
    <View style={styles.info}>
      <View style={styles.icons}>
        {icons}
      </View>
      <Spacer8 />
      <Text style={[dark ? styles.fontLiAlt : styles.fontReg, styles.paraSt]}>
        {props.mainText}
      </Text>
      <ReadMore onToggle={props.onToggle} expanded={props.expanded} />
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    marginHorizontal: 24,
  },
  icons: {},
  iconRow: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 8,
  },
  iconDesc: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    lineHeight: 24,
  },
  paraSt: {
    fontFamily: "RobotoRegular",
    lineHeight: 24,
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
  fontDark: { color: fontDark },
});
