import { Image, StyleSheet, View } from "react-native";

import walker from "../../assets/images/walker.png";
import bicycle from "../../assets/images/bicycle.png";
import baby from "../../assets/images/baby.png";
import bed from "../../assets/images/bed.png";
import eat from "../../assets/images/eat.png";

export type IconsProps = {
  walk?: boolean;
  bike?: boolean;
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
      {props.walk ? <Icon source={walker} /> : <></>}
      {props.bike ? <Icon source={bicycle} /> : <></>}
      {props.restaurant ? <Icon source={eat} /> : <></>}
      {props.childFriendly ? <Icon source={bed} /> : <></>}
      {props.accommodation ? <Icon source={baby} /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 8,
  },
});
