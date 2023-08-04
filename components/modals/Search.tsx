import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import {Platform, Pressable, StyleSheet, Text, useColorScheme, View
} from "react-native";
import { SearchBar as RNESearchBar } from "react-native-elements";
import {darkBG,fontColor,grayDark,lightAltBG,lightBG2
} from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { isTabPort,isMobile } from "../../constants/Layout";

type SearchBarProps = {
  value: string;
  onChangeText?: Function;
  onCancel?: Function;
  searchText?: string;
  isSticky: boolean;
  focusSearchFunctionWrapper:any
};

export default function SearchBar(props: SearchBarProps) {
  const dark = useColorScheme() === "dark";
  const { value, onChangeText } = props;
  const searchRef = useRef<any>(null)
  props.focusSearchFunctionWrapper.setSearchFocus = (val:any) => {
    if (searchRef.current)
      (searchRef.current as any)[val ? 'focus' : 'blur']()
  } 

  return (
    <View
      style={[
        dark
          ?styles.grayDark
          :(props.isSticky
            ?[isTabPort()
              ?styles.pureWhite
              :styles.shadow,styles.pureWhite]
        : styles.pureWhite), 
        (isMobile() 
          ? styles.conMobi 
          : styles.conTab)
      ]}
    >
      <RNESearchBar
        searchIcon={{ size: 24 } as any}
        leftIconContainerStyle={{
          marginRight: -6,
          marginLeft: 16,
        }}
        containerStyle={[
          dark?styles.grayDark:styles.pureWhite,styles.subContainer
        ]}
        inputContainerStyle={[
          dark?styles.black:props.isSticky?styles.cream:styles.cream,
          styles.input
        ]}
        placeholder="Search"
        value={value}
        autoCompleteType={'off'}
        autoCapitalize={'none'}
        autoComplete={'off'}
        onChangeText={(x) => onChangeText(x)}
        ref={searchRef}
      />
      <Pressable
        onPress={props.onCancel as any}
        style={({ pressed }) => [{
            backgroundColor: pressed
            ?dark
              ?"rgba(230,230,230,.2)"
              :"rgba(230,230,230,.6)"
            :"rgba(0,0,0,0)"
          },styles.cancel
        ]}
      >
        <Text style={styles.text}>cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

  conMobi: {
    paddingTop: 0,
    flexDirection: "row",
    paddingLeft:Platform.OS === "ios" ? 16 : 20,
    width: Platform.OS === "ios" ? "110%" : "100%",
    transform: [{ translateX: Platform.OS === "ios" ? -16 : 0 }],
  },
  conTab: {
    flexDirection: "row",
    paddingLeft: 16,
    width: Platform.OS === "ios" ? "160%" : "100%",
    transform: [{ translateX: Platform.OS === "ios" ? -85 : -69 }],
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 20,
  },
  subContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  input: {
    minWidth: "75%",
    height: 40,
    borderRadius: 8,
  },
  cancel: {
    height: 40,
    width: "19%",
    marginTop: 8,
    borderRadius: 8,
    ...Styles.center,
  },
  text: {
    textTransform: "uppercase",
    fontFamily: "RobotoRegular",
    color: fontColor,
  },
  pureWhite: { backgroundColor: lightBG2 },
  grayDark: { backgroundColor: grayDark },
  black: { backgroundColor: darkBG },
  cream: { backgroundColor: lightAltBG },
});
