import { View, StyleSheet } from "react-native";

export default function Spacer24(props: any) {
  return <View {...props} style={[styles.line, props.style]}  />;
}

const styles = StyleSheet.create({
  line: {
    height: 24,
    maxWidth: "100%",
  },
});
