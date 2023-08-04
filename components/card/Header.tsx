import { ImageBackground, StyleSheet, Text, useColorScheme } from "react-native";
import { white } from "../../constants/Colors";


export default function Header(props: any) {
  const dark = useColorScheme() === "dark";
  return (
    <ImageBackground source={props.image} style={[dark ? styles.darkBG : styles.lightBG, styles.container]}>
      <Text style={styles.heading}>{props.title}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 104,
    top: 0,
    flexDirection: "column-reverse",
    flexShrink: 1,
  },
  heading: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexShrink: 1,
    color: white,
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "WWFWebfontRegular",
  },
  lightBG: {
    backgroundColor: '#ACABA6',
  },
  darkBG: {
    backgroundColor: '#383838',
  }
});
