import {
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  View,
  Text,
  useColorScheme,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import bgGMT from "./../assets/images/bgGMT.png";
import panda from "./../assets/images/panda.png";
import barrels from "./../assets/images/barrels.png";
import grapeEscape from "./../assets/images/grapeEscape.png";
import tasteLearn from "./../assets/images/tasteLearn.png";
import wineOnRoute from "./../assets/images/wineOnRoute.png";
import workshop from "./../assets/images/workshop.png";
import cederberg from "./../assets/images/cederberg.png";

import Styles from "../constants/Styles";
import { lightAltBG, greenLight, white, darkBG } from "../constants/Colors";

import Special from "../components/SpecialCard";
import MainHeading from "../components/headings/MainHeading";
import SpecialsHeading from "../components/headings/SpecialsHeading";
import Spacer24 from "../components/reuseable/Spacer24";
import Spacer16 from "../components/reuseable/Spacer16";
import Spacer8 from "../components/reuseable/Spacer8";
import { useDatabase } from "../hooks/useDatabase";
import SpecialCard from "../components/SpecialCard";

export default function MapScreen(props: any) {
  const darkMode = useColorScheme() === "dark";
  const navigation = useNavigation();
  const db = useDatabase()

  const specials = []
  for (let i in db.specialsScreen.specials) {
    const special = db.specialsScreen.specials[i]
    // const special = db.getSpecialById(specialId)
    specials.push(<SpecialCard key={special.name} special={special} />)
    if (i < db.specialsScreen.specials.length - 1)
      specials.push(<Spacer8 key={`${special.name}-spacer`} style={{ width: '100%' }} />)
  }


  return (
    <ScrollView>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
      <View style={[darkMode ? styles.black : styles.cream, styles.container]}>
        <MainHeading />
        <Spacer24 />
        <Spacer16 />
        {Platform.OS === "android"
          ? <Spacer24 />
          : <></>}
        <SpecialsHeading />
        {specials}


        <Spacer24 style={{ height: 4 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Styles.center,
  },
  preStyle: {
    position: "absolute",
    textTransform: "uppercase",
    fontFamily: "MontserratBold",
    color: greenLight,
    fontSize: 12,
    top: 66,
    left: 24,
  },
  header: {
    position: "absolute",
    fontFamily: "MontserratLight",
    color: white,
    fontSize: 32,
    lineHeight: 32,
    top: 88,
    left: 24,
  },

  black: { backgroundColor: darkBG },
  cream: { backgroundColor: lightAltBG },

  //
});
