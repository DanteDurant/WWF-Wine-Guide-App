import { View, StyleSheet, useColorScheme } from "react-native";

export default function LineSpacer(props: any) {
  const darkMode = useColorScheme() === "dark";
  return <View style={[darkMode ? styles.dark : styles.light, styles.line, props.compact ? styles.compact : {}]}/>;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    maxWidth: "100%",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  compact: { 
    marginHorizontal: 0,
    marginVertical: 0 
  },
  light: {
    backgroundColor: "#dee2e6",
  },
  dark: { backgroundColor: "#212529" },
});
