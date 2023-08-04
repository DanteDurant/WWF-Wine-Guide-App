import { View, StyleSheet } from "react-native";

export default function Spacer8(props: any) {
  return <View style={{...styles.line, ...props?.style}} />;
}

const styles = StyleSheet.create({
  line: {
    height: 8,
    maxWidth: "100%",
  },
});
