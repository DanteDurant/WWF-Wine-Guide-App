import { View, StyleSheet } from "react-native";

export default function Spacer16(props: any) {
  return <View style={styles.line} {...props} />;
}

const styles = StyleSheet.create({
  line: {
    height: 16,
    maxWidth: "100%",
  },
});
