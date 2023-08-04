import {
  Image, Pressable, StyleSheet,
  Text,
  useColorScheme
} from "react-native";

import {darkAltBG,darkBG,fontDark,fontLightAlt,grayLight,lightBG2
} from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function Icons(props: any) {
  const dark = useColorScheme() === "dark";

  return (
    <Pressable
      style={({ pressed }) => [{
          backgroundColor: pressed
            ? dark
              ? darkAltBG
              : grayLight
            : dark
            ? darkBG
            : lightBG2,
        },styles.container
      ]}
      onPress={() => props.onPress ? props.onPress() : null}
    >
      <Image style={styles.icon} source={props.icon} />
      <Text style={[dark ? styles.fontLiAlt : styles.fontDark, styles.name]}>
        {props.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    ...Styles.icon24,
  },
  name: {
    marginLeft: 16,
    fontFamily: "RobotoRegular",
  },
  fontDark: { color: fontDark },
  fontLiAlt: { color: fontLightAlt },
});
