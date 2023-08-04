import React from "react";
import { View, Image, StyleSheet } from "react-native";
import back from "../../assets/images/chevLeft.png";
import Styles from "../../constants/Styles";

export default function Back(props: any) {
  return (
    <View style={{...styles.backSt, ...props.style}}>
      <Image source={back} style={styles.iconSt} />
    </View>
  );
}

const styles = StyleSheet.create({
  backSt: {
    width: 32,
    height: 32,
    borderRadius: 30,
    zIndex: 998,
    backgroundColor: "#4A4A4AA4",
  },
  iconSt: {
    position: "relative",
    left: 3.25,
    top: 5.25,
    ...Styles.icon24,
  },
});
