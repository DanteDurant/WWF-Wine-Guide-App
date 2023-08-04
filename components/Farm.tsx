import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {Dimensions, Linking,Platform,Pressable,ScrollView,StyleSheet,useColorScheme,View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "./farm/Header";
import Hours from "./farm/Hours";
import Info from "./farm/Info";

import call from "../assets/images/call.png";
import directions from "../assets/images/directions.png";
import share from "../assets/images/share.png";
import website from "../assets/images/website.png";

import BGImage from "./reuseable/Image";
import Back from "./reuseable/Back";
import Icons from "./reuseable/Icons";
import Line from "./reuseable/Line";
import Spacer16 from "./reuseable/Spacer16";
import Spacer24 from "./reuseable/Spacer24";
import ShareButton from "./reuseable/ShareButton";

import {getApps, GetAppResult} from 'react-native-map-link';

import {darkBG,lightBG2
} from "../constants/Colors";
import { getBadgeIcons, getVineyardImage } from "../util/util";
import Styles from "../constants/Styles";
// import { useDatabase } from "../hooks/useDatabase";
import SpecialCard from "./SpecialCard";
import Spacer8 from "./reuseable/Spacer8";
import { useDatabase } from "../hooks/useDatabase";

export default function Farm(props: any) {
  const navigation = useNavigation();
  const dark = useColorScheme() === "dark";
  const [expanded, setExpanded] = useState(false)
  const vineyard = props.vineyard
  const gps = vineyard?.location?.gps
  // const db:any = useDatabase()
  
  const [availableApps, setAvailableApps] = useState<GetAppResult[]>([]);

  let openMap
  if (gps) {
    openMap = async () => {
      const result = await getApps({
        latitude: gps[0],
        longitude: gps[1],
        title: vineyard.name, // optional
        googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
        // alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
        // appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
        directionsMode: "car",
      });
      setAvailableApps(result);
      result[0].open()
    }
    // openMap = () => {
    //   const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    //   const latLng = `${gps[0]},${gps[1]}`;
    //   const label = vineyard.name;
    //   const url = Platform.select({
    //     ios: `${scheme}${label}@${latLng}`,
    //     android: `${scheme}${latLng}(${label})`
    //   });
    //   console.log("OPEN MAP", url)
    //   Linking.openURL(url as any);
    // }
  }

  // const openWebsite = () => Linking.openURL(vineyard.contact.websiteURL)
  const openWebsite = () => navigation.navigate("ModalWeb", {url: vineyard.contact.websiteURL})
  const makePhoneCall = () => Linking.openURL('tel:' + vineyard.contact.phone.replace(/[^0-9]+/g, '').replace(/^0/, '+27'))

  let [scrollY, setScrollY] = useState(0)

  const handleScroll = (e:any) => {
    setScrollY(e.nativeEvent.contentOffset.y)
    // console.log()
  }

  const scrollStyle:any = dark ? { backgroundColor: darkBG } : { backgroundColor: lightBG2 }
  const imStyle:any = {}
  const backStyle:any = {}
  if (scrollY < 0) {
    // scrollStyle.transform = `translate(0px, ${scrollY}px)`
    // scrollStyle.transform = [`translate(0px, ${scrollY}px)`]
    imStyle.transform = [{translate: [`0px`, `${scrollY / 2}px)`]}, {scale: (200 - scrollY) / 200}]
    backStyle.transform = [{translate: [`0px`, `${scrollY}px)`]}]
    // imStyle.transform = [{translate: [`0px`, `${scrollY}px)`, {scale: (200 - scrollY) / 200}]}]
  }
  // console.log(imStyle)
  // console.log(scrollStyle)

  const db = useDatabase((state:any) => state)
  const specials = []
  for (const special of db?.data?.specials) {
    if (special?.vineyard == vineyard?.id) 
      specials.push(special)
  }

  const specialCards:any = []
  for (let i in specials) {
    const special = specials[i]
    console.log(special)
    if (!special.showOnVineyardScreen)
      continue
    const card =       
      <>
        <SpecialCard key={special.name} special={special} showDesc={special.showInlineDescription}/>
        {parseInt(i) < specials.length - 1 ? <Spacer8 key={`${special.name}-spacer`} style={{width: '100%'}}/> : <></>}
      </>
    specialCards.push(card)
  }
  if (specialCards.length > 0)
    specialCards.push(<Spacer24/>)
  


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
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, }, styles.back, {position: 'absolute'}]}
      >
        <Back style={backStyle}/>
      </Pressable>
      <BGImage ImageBG={getVineyardImage(vineyard, 'header')} ImageCon={styles.background} style={imStyle}/>
      <Header title={vineyard.name} />
      <Hours vineyard={vineyard} />
      <Spacer24 />
      <Info 
        icons={getBadgeIcons(props.vineyard)} 
        mainText={expanded ? props.vineyard.summary + "\n\n" + props.vineyard.description : props.vineyard.summary} 
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)} 
      />
      <Spacer16 />
      {specialCards.length > 0
        ? specialCards
        : <></>
      }
      {gps
        ? <MapView
            region={{
              latitude: gps[0],
              longitude: gps[1],
              latitudeDelta: .5,
              longitudeDelta: .5,
            }}
            scrollEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            onPress={openMap}
            style={{width:'100%', height: 240}}>
            <Marker coordinate={{latitude: gps[0], longitude: gps[1]}} />
          </MapView>
        : <></>
      }
      <Spacer16 />
      <View style={styles.CTA}>
        <Line compact={true}/>
        
        {gps 
          ? <><Icons icon={directions}name={"Directions"} onPress={openMap}/><Line compact={true}/></> 
          : <></>}
        {vineyard?.contact?.phone 
          ? <><Icons icon={call} name="Call" onPress={makePhoneCall}/><Line compact={true}/></> 
          : <></> }
        {vineyard?.contact?.websiteURL
          ? <><Icons icon={website} name="Visit website" onPress={openWebsite}/><Line compact={true}/></> 
          : <></>}
      </View>
      {vineyard?.contact?.socialURL 
        ? <><Spacer24/><ShareButton icon={share} buttonText="Share" vineyard={vineyard}/></> 
        : <></>}
      <Spacer24 />
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
});
