import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";

import walker from "../../assets/images/walker.png";
import bicycle from "../../assets/images/bicycle.png";
import baby from "../../assets/images/baby.png";
import bed from "../../assets/images/bed.png";
import eat from "../../assets/images/eat.png";
import Styles from "../../constants/Styles";
import { fontColor, fontLightAlt } from "../../constants/Colors";

export type IconsProps = {
  walking?: boolean;
  cycling?: boolean;
  restaurant?: boolean;
  childFriendly?: boolean;
  accommodation?: boolean;
};

const Icon = (props: any) => (
  <Image style={styles.icon} source={props.source} />
);

export default function Icons(props: IconsProps) {
  return (
    <View style={styles.container}>
      {props.walking ? <Icon source={walker} /> : <></>}
      {props.cycling ? <Icon source={bicycle} /> : <></>}
      {props.restaurant ? <Icon source={eat} /> : <></>}
      {props.accommodation ? <Icon source={bed} /> : <></>}
      {props.childFriendly ? <Icon source={baby} /> : <></>}
    </View>
  );
}
export function IconDes(props: IconsProps) {
  const dark = useColorScheme() === "dark";
  const Description = (props: any) => (
    <Text style={[dark ? styles.fontLiAlt : styles.fontReg, styles.text]}>
      {props.text}
    </Text>
  );
  return (
    <View style={styles.container}>
      {props.walking ? <Description text="Exo Tours / Nature Walks" /> : <></>}
      {props.cycling ? <Description text="Bike Route" /> : <></>}
      {props.restaurant ? <Description text="Restaurant" /> : <></>}
      {props.accommodation ? <Description text="Accommodation" /> : <></>}
      {props.childFriendly ? <Description text="Child Friendly" /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  icon: {
    ...Styles.icon24,
    marginBottom: 8,
  },
  text: {
    fontFamily: "RobotoRegular",
    height: 25,
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 8,
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
});
