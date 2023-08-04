import { StyleSheet, useColorScheme, View, Dimensions, ImageBackground, Pressable, Text } from "react-native";
import { darkBG, fontColor, fontDark, lightAltBG, lightAltBG2 } from "../constants/Colors";
import { useLocation } from "../hooks/useLocation";
import { distanceToVineyard, getBadgeIcons, getOpenStatus, getVineyardImage, handleSpecialClick } from "../util/util";
import Header from "./card/Header";
import Info from "./card/Info";
import {isTabPort} from "../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "../hooks/useDatabase";
import Spacer8 from "./reuseable/Spacer8";
import backendURL from "../constants/backendURL";

export default function SpecialCard(props: { special: any, showDesc?:boolean}) {
  const darkMode = useColorScheme() === "dark";
  const special = props.special
  const navigation = useNavigation()
  const db = useDatabase()

  return (
    <Pressable style={{width: '100%'}} onPress={() => handleSpecialClick(special, navigation, db)}>
      <View style={[darkMode ? styles.black : styles.cream, isTabPort() ? styles.parentTablet : styles.parentMobile]}>
        <View style={styles.container}>
          <ImageBackground source={{uri: `${backendURL}/media/${special.thumbnail}`}} style={styles.container}/>
          {props.showDesc 
            ? 
              <>
                <Spacer8/>
                <Text style={[styles.paraSt, darkMode ? styles.fontDark : styles.fontReg]}>{special.description}</Text>
              </>
            : <></>
          }
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  parentMobile: {
    marginHorizontal: 8,
  },
  parentTablet: {
    padding: 4,
  },
  container: {
    borderRadius: 4,
    minHeight: 192,
    width: '100%',
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-end",
  },  

  black: { backgroundColor: darkBG },
  cream: { backgroundColor: '#ACABA6' },
  // cream: { backgroundColor: 'transparent' },

  paraSt: {
    fontFamily: "RobotoRegular",
    lineHeight: 24,
    paddingHorizontal: 16,
    // color: 'rgba(0, 0, 0, 0.87)'
  },
  fontReg: { color: fontColor },
  fontDark: {color: fontDark },
});
