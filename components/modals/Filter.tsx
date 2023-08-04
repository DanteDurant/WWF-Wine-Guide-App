import {
  Image,
  Platform,
  Pressable, StyleSheet, Text, useColorScheme,
  View
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";

import filterIcon from "../../assets/images/filter.png";

import checked from "../../assets/images/checked.png";
import checkedDark from "../../assets/images/checkedDark.png";
import unchecked from "../../assets/images/unchecked.png";
import uncheckedDark from "../../assets/images/uncheckedDark.png";

import { BlurView } from "expo-blur";
import {
  darkBG, fontColor, fontDark, fontLight, fontLightAlt,
  gray, grayDark, green, greenDark, lightBG, white
} from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { useDatabase } from "../../hooks/useDatabase";
import Spacer24 from "../reuseable/Spacer24";
import { filterOptions } from "../../constants/FilterOptions";


export default function Filter(props: any) {
  const navigation = useNavigation();
  const { vineyardFilter, setVineyardFilter, updateUI, countByFilter, sortedVineyards, filterVineyards } = useDatabase() as any
  const [initialFilter, setInitialFilter] = useState([])

  useEffect(() => {
    setInitialFilter(vineyardFilter.slice())
  }, [])

  const options = filterOptions

  const darkMode = useColorScheme() === "dark";

  const getBGColor = (state: any) => state
    ? darkMode
      ? styles.gray
      : styles.gray
    : darkMode
      ? styles.grayDark
      : styles.white
  const getFGColor = (state: any) => state
    ? darkMode
      ? styles.fontLi
      : styles.fontLi
    : darkMode
      ? styles.fontLiAlt
      : styles.fontReg;

  const optionLoop = options.map((option) => {
    const isEnabled = vineyardFilter.indexOf(option.key) >= 0
    const dark = useColorScheme() === "dark";
    const checkImage = isEnabled
      ? dark
        ? checkedDark
        : checked
      : dark
        ? uncheckedDark
        : unchecked;
    const toggle = () => {
      if (isEnabled)
        vineyardFilter.splice(vineyardFilter.indexOf(option.key), 1)
      else
        vineyardFilter.push(option.key)
      setVineyardFilter(vineyardFilter)
    }

    return (
      <View
        style={{ ...styles.optionSt, borderBottomWidth: 1 }}
        key={option.title}
      >
        <Pressable
          onPress={toggle}
          style={({ pressed }) => [{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            opacity: pressed ? 0.9 : 1,
            ...styles.optionPressable
          }
          ]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={option.image} style={styles.icon} />
            <Text style={{ paddingLeft: 16, color: fontColor }}>
              {option.title}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ alignSelf: "center", marginRight: 16, color: fontColor }}>{countByFilter[option.key]}</Text>
            <Image style={styles.check} source={checkImage} />
          </View>
        </Pressable>
      </View>
    );
  });

  const dark = useColorScheme() === "dark";
  const showCount = filterVineyards(sortedVineyards, vineyardFilter).length

  return (
    <BlurView style={styles.blur} intensity={30}>
      <View style={[dark ? styles.black : styles.white, styles.container]}>
        <View style={[dark ? styles.grayDark : styles.white, styles.top]}>
          <View style={styles.headerContainer}>
            <Image resizeMode="contain" style={{ height: 24 }} source={filterIcon} />
            <Text style={styles.header}>
              filter
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [{
              opacity: pressed ? 0.5 : 1,
              backgroundColor: pressed
                ? "rgba(0, 0, 0, .1)"
                : "rgba(0, 0, 0,0)",
            }, styles.cancelButton
            ]}>
            <Text style={[
              dark ? styles.fontLiAlt : styles.fontReg, styles.cancel
            ]}>
              cancel
            </Text>
          </Pressable>
        </View>
        <View style={styles.optionsSt}>{optionLoop}</View>
        <Spacer24 />
        <View style={styles.bot}>
          <Pressable
            onPress={() => {
              setVineyardFilter([])
              updateUI()
              navigation.goBack()
            }}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              styles.black, styles.center, styles.show,
            ]}
          >
            <Text style={styles.text}>clear filters</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              updateUI()
              navigation.goBack()
            }}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              dark ? styles.greenDark : styles.green,
              styles.show, styles.center
            ]}
          >
            <Text style={styles.text}>show {showCount} result{showCount == 1 ? '' : 's'}</Text>
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  container: {
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  top: {
    width: "100%",
    height: 88,
    ...Styles.center,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#c8cbcf",
    paddingBottom: 24,
  },
  headerContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: -8,
    marginLeft: -50,
  },
  header: {
    textTransform: "uppercase",
    fontFamily: "RobotoRegular",
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 3,
    color: fontDark,
    marginLeft: -2,
  },
  cancelButton: {
    position: "absolute",
    alignSelf: "flex-end",
    borderRadius: 8,
    right: 8,
    bottom: 9,
  },
  cancel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    textTransform: "uppercase",
    fontFamily: "RobotoMedium",
    fontSize: 12,
  },

  optionsSt: {
    justifyContent: "flex-end",
  },
  optionSt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
  },
  optionPressable: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  check: {
    ...Styles.icon24,
  },

  bot: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clear: {
    width: "50%",
  },
  show: {
    width: "50%",
  },
  text: {
    fontFamily: "WWFWebfontRegular",
    textTransform: "uppercase",
    color: white,
    fontSize: 20,
    marginTop: -2,
  },

  // REUSABLE
  center: {
    ...Styles.center,
  },

  icon: {
    width: 24,
    height: 24,
  },
  row: { flexDirection: "row" },
  noBorder: { borderBottomWidth: 0 },
  white: { backgroundColor: lightBG },
  gray: { backgroundColor: gray },
  grayDark: { backgroundColor: grayDark },
  black: { backgroundColor: darkBG },
  green: { backgroundColor: green },
  greenDark: { backgroundColor: greenDark },
  fontReg: { color: fontColor },
  fontDark: { color: fontDark },
  fontLi: { color: fontLight },
  fontLiAlt: { color: fontLightAlt },
});
