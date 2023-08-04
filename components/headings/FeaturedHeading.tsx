import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { fontColor, fontLightAlt } from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function FeaturedHeading(props: any) {
  const darkMode = useColorScheme() === "dark";
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[darkMode ? styles.fontLiAlt : styles.fontReg, styles.heading]}
        >
          featured farms
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 359,
    height: 32,
    ...Styles.center,
  },
  heading: {
    textTransform: "uppercase",
    letterSpacing: 3,
    fontFamily: "RobotoRegular",
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
});
