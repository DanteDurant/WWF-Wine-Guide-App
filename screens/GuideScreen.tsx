import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Platform, Pressable, ScrollView, StatusBar,
  StyleSheet, useColorScheme, View
} from "react-native";

import React, { useState } from "react";

import Card from "../components/Card";
import FilterBar from "../components/FilterBar";
import MainHeading from "../components/headings/MainHeading";
import Spacer8 from "../components/reuseable/Spacer8";
import Spacer16 from "../components/reuseable/Spacer16";

import { isMobile } from "../constants/Layout";
import Styles from "../constants/Styles";

import { useDatabase } from "../hooks/useDatabase";
import { useLocation } from "../hooks/useLocation";
import { isPortrait } from "../hooks/isPortrait";

export default function GuideScreen(props: any) {
  const navigation = useNavigation();
  const darkMode = useColorScheme() === "dark";
  const db = useDatabase((state: any) => state)
  const location = useLocation()

  const [searchText, setSearchText] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  let scrollView: ScrollView;
  const [headingAlpha, setHeadingAlpha] = useState(1);
  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const sticky = y >= 154;
    // console.log('sticky', sticky)

    const headerAlpha = 1 - Math.max(0, Math.min(1, y / 155))

    if (sticky != isSticky) setIsSticky(sticky);
    if (headerAlpha != headingAlpha) setHeadingAlpha(headerAlpha)
  };
  const cards = db?.filteredVineyards ?
    db.filteredVineyards.map((vineyard: any) => {
      return (
        <React.Fragment key={vineyard.id}>
          <Pressable
            onPress={() =>
              navigation.navigate("FarmModal", { vineyard } as any)}
            style={({ pressed }) =>
            ([
              isMobile()
                ? styles.cardMobile
                : isPortrait()
                  ? styles.cardTabPort : styles.cardTabLand,
              { opacity: pressed ? 0.5 : 1 }
            ])}>
            <Card vineyard={vineyard} />
          </Pressable>
          <Spacer16 />
        </React.Fragment>
      );
    }) : <></>

  const statusBg = darkMode
    ? (isSticky ? "#212529" : "#000000")
    : (isSticky ? "#F8F7F2" : "#EAE7D8")

  const focusSearchFunctionWrapper = { setSearchFocus: null }
  return (
    <ScrollView
      stickyHeaderIndices={[2]}
      scrollEventThrottle={1}
      onScroll={handleScroll}>
      <StatusBar backgroundColor={"transparent"} key="statusBar" />

      <MainHeading stylee={isMobile() ? <></> : styles.header} />
      <FilterBar
        style={{ marginTop: Platform.OS === "ios" ? 0 : 35 }}
        searchText={db.searchTerm}
        setSearchText={(text: string) => db.setSearchTerm(text)}
        isSticky={isSticky}
      />
      <View
        style={[
          isMobile() ? { paddingTop: 2 }
            : { marginHorizontal: 80, paddingTop: 4, },
          { flexDirection: "row", flexWrap: "wrap" }
        ]}
      >
        {cards}
      </View>
      <Spacer8 />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardMobile: {
    marginTop: 8,
    width: "100%",
  },
  cardTabPort: {
    width: "50%",
    height: 200,
  },
  cardTabLand: {
    width: "33%",
    height: 200,
  },

  conMobile: {
  },
  conTabPort: {
    paddingHorizontal: 80,
    alignItems: "center",
  },
  conTabLand: {
    paddingHorizontal: 80,
    marginTop: -30
  },

  header: {
    top: 0,
    marginBottom: -35
  },

  subtitle: {
    textTransform: "uppercase",
    marginBottom: 10,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 3,
    ...Styles.fontWWF,
  },

  timeGreen: {
    ...Styles.timeGreen,
  },
  timeOrange: {
    ...Styles.timeOrange,
  },
  timeRed: {
    ...Styles.timeRed,
  },
});
