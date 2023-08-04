

import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View
} from "react-native";

import React, { useState } from "react";

import Card from "../components/Card";
import FeaturedHeading from "../components/headings/FeaturedHeading";
import MainHeading from "../components/headings/MainHeading";
import SpecialsHeading from "../components/headings/SpecialsHeading";
import SpecialCard from "../components/SpecialCard";
import CTACard from "../components/CTACard";

import Spacer8 from "../components/reuseable/Spacer8";
import Spacer16 from "../components/reuseable/Spacer16";
import Spacer24 from "../components/reuseable/Spacer24";

import bgGMT from "./../assets/images/bgGMT.png";
import searchLogo from "../assets/images/searchLogo.png";
import wineMark from "../assets/images/wineMark.png";
import starRounded from "../assets/images/starRounded.png";

import {
  blue, darkBG, grayDark, green, greenLight,
  lightAltBG, lightBG, purple, white
} from "../constants/Colors";

import Styles from "../constants/Styles";

import { useDatabase } from "../hooks/useDatabase";
import { isTabPort, isTabLand, isMobile } from "../constants/Layout";
import { isPortrait } from "../hooks/isPortrait";

export default function HomeScreen(props: any) {
  const navigation = useNavigation();
  const darkMode = useColorScheme() === "dark";
  const db = useDatabase((state: any) => state)

  const cards = db?.homeScreen?.vineyards.map((vineyard: any) => {
    if (!vineyard)
      return <></>
    return (
      <React.Fragment key={`fragment-${vineyard.id}`}>
        <Pressable
          onPress={() => navigation.navigate("FarmModal", { vineyard } as any)}
          style={({ pressed }) => ([
            {
              opacity: pressed ? 0.5 : 1,
              marginBottom: isMobile() ? 8 : 0
            },
            isMobile()
              ? styles.cardMobile
              : isPortrait()
                ? styles.cardTabPort
                : styles.cardTabLand
          ])} key={`pressable-${vineyard.id}`}>
          <Card vineyard={vineyard} key={`card-${vineyard.id}`} />
        </Pressable>
        <Spacer16 key={`spacer-${vineyard.id}`} />
      </React.Fragment>
    );
  })

  const specials = db?.homeScreen?.specials.map((special: any, index: number) => {
    if (!special)
      return <></>
    return (
      <>
        <SpecialCard key={special.id} special={special} />
        {index < db.homeScreen.specials.length - 1 ? <Spacer8 key={`${special.name}-spacer`} style={{ width: '100%' }} /> : <></>}
      </>
    )
  })


  return (
    <ScrollView
      contentContainerStyle={[
        darkMode ? styles.black : styles.cream,
        styles.container,
      ]}
    >
      {useIsFocused() ? (
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={
            "transparent"
          }
        />
      ) : null}
      <MainHeading styleProp={styles.mainHeader} />

      {isMobile() === true
        ? <Spacer24 style={{ height: Platform.OS === "ios" ? 44 : 68 }} />
        : <Spacer8 />
      }

      <View style={[isMobile() ? {} : { marginHorizontal: 80, marginTop: 8 },
      { flexDirection: "row", flexWrap: "wrap", flex: 1 }
      ]}>

        <Pressable
          onPress={() => navigation.navigate("TabOne" as any)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            width: isMobile() ? "100%" : isPortrait() ? "50%" : "33%",
            marginBottom: 8
          })}
        >
          <CTACard
            imageStyle={styles.searchLogo}
            image={searchLogo}
            title="farm guide"
            text={"Search and filter over 40 \nWWF endorsed wine farms"}
            bgColor={styles.green}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("TabTwo" as any)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            width: isMobile() ? "100%" : isPortrait() ? "50%" : "33%",
            marginBottom: 8
          })}
        >
          <CTACard
            imageStyle={styles.wineMark}
            image={wineMark}
            title="map"
            text="find farms near you"
            bgColor={styles.purple}
          />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("TabThree" as any)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            width: isMobile() ? "100%" : isPortrait() ? "50%" : "33%",
            // marginBottom: 8
          })}
        >
          <CTACard
            imageStyle={styles.wineMark}
            image={starRounded}
            title="specials"
            text="view more"
            bgColor={styles.blue}
          />
        </Pressable>
      </View>

      <Spacer16 />
      <FeaturedHeading />
      <Spacer16 />

      <View
        style={[
          isMobile() ? {}
            : { marginHorizontal: 80, paddingTop: 4, },
          { flexDirection: "row", flexWrap: "wrap" }
        ]}
      >
        {cards}
      </View>

      <SpecialsHeading />

      <View style={{
        flexDirection: "row",
        // flexDirection: "column",
        flexWrap: "wrap",
        alignSelf: "flex-start",
        marginHorizontal: isMobile() ? 0 : 80,
      }}>
        {specials}

      </View>

      <Spacer16 />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  //                     MAIN  HEADING
  container: {
    ...Styles.center,
  },
  mainHeader: {
    width: "100%",
    transform: ([{ translateX: 0 }]),
  },

  searchLogo: {
    height: 80,
    width: 80,
    marginLeft: 8,

  },
  wineMark: {
    height: 78,
    width: 53,
    marginLeft: 21,
  },

  //                    SPECIALS CARD

  cardMobile: {
    width: "100%",
  },
  cardTabPort: {
    width: "50%",
    height: 200,
  },
  cardTabLand: {
    height: 200,
    width: "33%",
  },
  preHeader: {
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

  timeGreen: {
    ...Styles.timeGreen,
  },
  timeOrange: {
    ...Styles.timeOrange,
  },
  timeRed: {
    ...Styles.timeRed,
  },
  white: { backgroundColor: lightBG },
  black: { backgroundColor: darkBG },
  cream: { backgroundColor: lightAltBG },
  grayDark: { backgroundColor: grayDark },
  purple: { backgroundColor: purple },
  green: { backgroundColor: green },
  blue: { backgroundColor: blue },
});
