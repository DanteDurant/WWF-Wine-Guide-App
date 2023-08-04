import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "./farm/Header";
import Info from "./farm/Info";

import call from "../assets/images/call.png";
import directions from "../assets/images/directions.png";
import website from "../assets/images/website.png";
import share from "../assets/images/share.png";
import starRounded from "../assets/images/starRounded.png";
import guide from "../assets/images/guide.png";

import BGImage from "./reuseable/Image";
import Back from "./reuseable/Back";
import Icons from "./reuseable/Icons";
import Line from "./reuseable/Line";
import Spacer16 from "./reuseable/Spacer16";
import Spacer24 from "./reuseable/Spacer24";
import ShareButton from "./reuseable/ShareButton";

import { darkBG,fontColor,fontDark,fontLightAlt,lightBG2 } from "../constants/Colors";
import Styles from "../constants/Styles";
import { handleSpecialClick } from "../util/util";
import { useDatabase } from "../hooks/useDatabase";
import backendURL from "../constants/backendURL";

export default function Special(props: any) {
  const navigation = useNavigation();
  const dark = useColorScheme() === "dark";
  const [expanded, setExpanded] = useState(false)
  const db = useDatabase()
  const special = props.special
  const vineyardId = special?.vineyard
  const vineyard = vineyardId ? db.getVineyardById(vineyardId) : null


  // const openWebsite = () => Linking.openURL(vineyard.contact.websiteURL)
  // const makePhoneCall = () => Linking.openURL('tel:' + vineyard.contact.phone.replace(/[^0-9]+/g, '').replace(/^0/, '+27'))

  let [scrollY, setScrollY] = useState(0)

  const handleScroll = (e:any) => {
    setScrollY(e.nativeEvent.contentOffset.y)
    // console.log()
  }

  const scrollStyle:any = dark ? { backgroundColor: darkBG } : { backgroundColor: lightBG2 }
  const imStyle:any = {}
  const backStyle:any = {}
  if (scrollY < 0) {
    imStyle.transform = [{translate: [`0px`, `${scrollY / 2}px)`]}, {scale: (200 - scrollY) / 200}]
    backStyle.transform = [{translate: [`0px`, `${scrollY}px)`]}]
  }

  return (
    <ScrollView
      style={scrollStyle}
      // alwaysBounceVertical={false}
      // bounces={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.back, {position: 'absolute'}]}
      >
        <Back style={backStyle}/>
      </Pressable>
      <BGImage ImageBG={{uri: `${backendURL}/media/${special.thumbnail}`}} ImageCon={styles.background} style={imStyle}/>
      <Header title={special.name} />
      <Spacer16 />
      <View style={{marginHorizontal: 24}}>
        <Text style={[dark ? styles.fontLiAlt : styles.fontReg, styles.paraSt]}>
          {special.description}
        </Text>
      </View>
      <Spacer16 />
      <View style={styles.CTA}>
        <Line compact={true}/>        
          <>
            <Icons icon={special.link.linkType === 'URL' ? website : guide} name={special.link.linkText ? special.link.linkText : 'Find out more'} onPress={() => handleSpecialClick(special, navigation, db, true)}/>
            <Line compact={true}/>
          </> 
          {vineyard && (special.link.linkType !== 'Vineyard')
            ? <>
                <Icons icon={guide} name={`View ${vineyard.name}`} onPress={() => navigation.navigate("FarmModal", { vineyard })}/>
                <Line compact={true}/>
              </> 
            : <></>}
        {/* {vineyard?.contact?.websiteURL */}
          {/* ? <><Icons icon={website} name="Visit website" onPress={openWebsite}/><Line compact={true}/></>  */}
          {/* : <></> } */}
      </View>
      {/* {vineyard?.contact?.socialURL 
        ? <><Spacer24/><ShareButton icon={share} buttonText="Share" vineyard={vineyard}/></> 
        : <></>} */}
      {/* <Spacer24 /> */}
      <Spacer24 />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 200,
    backgroundColor: '#ACABA6',
    ...Styles.center,
  },
  CTA: {
    paddingHorizontal: 16,
  },
  back: {
    ...Styles.back,
  },
  paraSt: {
    fontFamily: "RobotoRegular",
    lineHeight: 24,
    // color: 'rgba(0, 0, 0, 0.87)'
  },
  fontReg: { color: fontColor },
  fontLiAlt: { color: fontLightAlt },
  fontDark: {color: fontDark},

});
