import {StyleSheet,ScrollView,Pressable,View,Text,useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import directions from "../assets/images/directions.png";
import website from "../assets/images/website.png";
import email from "../assets/images/email.png";
import call from "../assets/images/call.png";
import share from "../assets/images/share.png";
import info from "../assets/images/info.png";

import Spacer16 from "./reuseable/Spacer16";
import Spacer24 from "./reuseable/Spacer24";
import Spacer72 from "./reuseable/Spacer72";
import ReadMore from "./reuseable/ReadMore";
import BGImage from "./reuseable/Image";
import Button from "./reuseable/Button";
import Icons from "./reuseable/Icons";
import Back from "./reuseable/Back";
import Line from "./reuseable/Line";
import Header from "./farm/Header";

import Styles from "../constants/Styles";
import { darkBG, fontColor, fontLightAlt, lightBG } from "../constants/Colors";
import ShareButton from "./reuseable/ShareButton";

export default function Special(props: any) {
  const navigation = useNavigation();
  const dark = useColorScheme() === "dark";

  return (
    <ScrollView
      style={dark?{backgroundColor: darkBG}:{backgroundColor:lightBG}}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          {opacity: pressed ? 0.5 : 1,},styles.back
        ]}
      >
        <Back/>
      </Pressable>
      <BGImage ImageBG={props.ImageBG} ImageCon={styles.backGround}/>
      <Header title={props.title}/>
      <Text style={[dark ? styles.fontLiAlt : styles.fontReg, styles.paraSt]}>
        {props.para1}
      </Text>
      <ReadMore/>
      <Spacer24/>
      <Button icon={info} buttonText="Info and Bookings"/>
      <Spacer16/>
      <View style={styles.CTA}>
        <Line/>
        <Icons icon={directions} name="Directions"/>
        <Line/>
        <Icons icon={email} name="Email"/>
        <Line/>
        <Icons icon={call} name="Call"/>
        <Line/>
        <Icons icon={website} name="Visit Website"/>
        <Line/>
        <Spacer24/>
        <ShareButton icon={share} buttonText="Share"/>
        <Spacer72/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backGround: {
    height: 240,
    ...Styles.center,
  },
  paraSt: {
    fontFamily: "RobotoRegular",
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  CTA: {
    paddingHorizontal: 24,
  },
  back: {
    ...Styles.back,
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
});
