import { StyleSheet, useColorScheme, View, Dimensions } from "react-native";
import { darkBG, lightAltBG } from "../constants/Colors";
import { useLocation } from "../hooks/useLocation";
import {distanceToVineyard,getBadgeIcons,getOpenStatus,getVineyardImage,
} from "../util/util";
import Header from "./card/Header";
import Info from "./card/Info";
import {isTabPort} from "../constants/Layout";



export default function Card(props: { vineyard: any }) {
  const darkMode = useColorScheme() === "dark";
  const vineyard = props.vineyard;

  const _ = useLocation((state: any) => state.location); 
  // not required, but causes component to re-render when location changes

  const distance = distanceToVineyard(vineyard, true);
  const openStatus = getOpenStatus(vineyard);
  const badgeIcons = getBadgeIcons(vineyard);
  console.log(badgeIcons)
    
    return (
      <View style={[darkMode?styles.black:styles.cream, 
      isTabPort()?styles.parentTablet:styles.parentMobile]}>
      <View style={styles.container}>
        <Header
          title={vineyard.name}
          image={getVineyardImage(vineyard, "header")}
          />
        <Info
          address={vineyard.location.address}
          distance={distance}
          closingTime={openStatus.text}
          colorTime={openStatus.style}
          icons={badgeIcons}
        />
      </View>
    </View>
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
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-end",
  },

  black: { backgroundColor: darkBG },
  cream: { backgroundColor: lightAltBG },
});
