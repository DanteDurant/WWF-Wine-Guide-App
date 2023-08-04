import {Pressable,StyleSheet,Text,useColorScheme
} from "react-native";
import { fontColor, fontLightAlt } from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function ReadMore(props: any) {
  const dark = useColorScheme() === "dark";
  return (
    <Pressable
      style={({ pressed }) => [{
          backgroundColor: pressed
            ? dark
              ? "rgba(230,230,230,.2)"
              : "rgba(230,230,230,.6)"
            : "rgba(0,0,0,0)",
        },styles.container
      ]}
      onPress={() => props.onToggle()}
    >
      <Text style={[dark?styles.fontLiAlt:styles.fontReg,styles.text]}>
        {props.expanded?'Read less':'Read more'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: "center",
    ...Styles.center,
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    lineHeight: 24,
    textTransform: "uppercase",
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
});
