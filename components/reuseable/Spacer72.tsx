import { View, StyleSheet } from "react-native";

export default function Spacer72(props: any) {
  return <View {...props} style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    height: 72,
    maxWidth: "100%",
  },
});
