import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Animated,Image,Platform,Pressable,StyleSheet,Text,useColorScheme,View
} from "react-native";

import cancel from "../assets/images/cancel.png";
import filterIcon from "../assets/images/filter.png";
import searchIcon from "../assets/images/search.png";
import sortAZ from "../assets/images/sortAZ.png";
import sortAZDark from "../assets/images/sortAZDark.png";
import distanceLight from "../assets/images/distance.png";
import distanceDark from "../assets/images/distanceDark.png";

import {darkBG,fontDark,fontLight,fontLightAlt,gray,grayDark,
grayLight,grayLightAlt,lightBG2,transparent
} from "../constants/Colors";

import SearchBar from "./modals/Search";
import Styles from "../constants/Styles";
import { useDatabase } from "../hooks/useDatabase";
import { isMobile, isTabLand, isTabPort } from "../constants/Layout";
import { isPortrait } from "../hooks/isPortrait";


export default function FilterBar(props: any) {
  const dark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const db = useDatabase() as any
  const { vineyardFilter, filteredVineyards, setVineyardFilter, updateUI } = db
  const translate = React.useRef(new Animated.Value(-600)).current;

  const [AZState, setAZState] = useState(true);
  const [disState, setDisState] = useState(false);
  const getBGColor = (state:any) => state
  ?dark
    ?{backgroundColor: "#656565"}
    :styles.grayLightAlt
  :dark
    ?styles.black
    : styles.grayLight
  const AZBack = getBGColor(AZState)
  const disBack = getBGColor(disState)
  const AZToggle = () => {
    setAZState(true), setDisState(false);
    db.setSortByDistance(false)
  };
  const disToggle = () => {
    setDisState(true), setAZState(false);
    db.setSortByDistance(true)
  };

  const [transState, setTransState] = useState(false);
  const focusSearchFunctionWrapper = {setSearchFocus:null}

  const getBarBGStyle = () => {
    const style:any[] = [
      dark
        ?(props.isSticky
            ?(transState
              ?styles.grayDark
              :[styles.grayDark, styles.shadow])
            :(isMobile()
              ?styles.trans
              :styles.grayDark))
        :(props.isSticky
          ?(transState
            ?styles.pureWhite
            :[styles.pureWhite, styles.shadow])
          :(isMobile()
            ?styles.trans 
            :styles.pureWhite))
    ]
    style.push(isTabPort()
      ? styles.parentTabPort 
      : isTabLand()
        ? styles.parentTabLand 
        : styles.parentMobi
    )
    style.push({ marginTop: Platform.OS === "android" ? -35 : 0,})
    return style
  }
  const getBGStyle = (S1: any, S2: any) => {
    const style:any[] = [dark?S1:S2]
    return style
  }

  const [searchState, setSearchState] = useState(false);
  const translateIn = () => {
    setSearchState(true);
      setTransState(true);
  };
  const translateOut = (props: any) => {
    setSearchState(false);
    setTransState(false);
  };


  return (
    <View  style = {getBarBGStyle()}>
      <View
        style={
          [getBGStyle(styles.grayDark,styles.pureWhite), 
          isMobile()?styles.conMobi:styles.conTabPort]
        }
      >


      {searchState?
        <View
        style={{
          position: "absolute",
          zIndex: 999,
          left:isMobile()?0:330,
          // maxWidth:isMobile()?"99%":isPortrait()?"60%":"80%",
          width: "102%",
          paddingHorizontal:0
        }}
        >
          <SearchBar
          onChangeText={(text: string) => props.setSearchText(text)}
          onCancel={() => {props.setSearchText(''); translateOut()}}
          value={props.searchText}
          isSticky={props.isSticky}
          focusSearchFunctionWrapper={focusSearchFunctionWrapper}
          />
        </View>
        :<></>
      }

        <Pressable
          onPress={() => navigation.navigate("Filter")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <View style={styles.filterContainer}>
            <Image style={
              [styles.searchIcon, {marginLeft:8}]} source={filterIcon}
            />
            <Text
            style={[dark?styles.fontLiAlt:styles.fontDark,styles.filterText]}
            >
              filter
            </Text>
          </View>  
        </Pressable>
        {vineyardFilter.length>0? 
          <Pressable
            onPress={() => {
              setVineyardFilter([])
              updateUI()
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View style={[
              getBGStyle(styles.black,styles.gray),
              styles.countContainer]}
            >
              <Text style=
              {[dark?styles.fontLiAlt:styles.fontWhite,styles.count]}
              >
                {filteredVineyards.length} result{filteredVineyards.length == 1 ? '' : 's'}
              </Text>
              <Image 
              resizeMode="contain" 
              style={{height:14,width:14,marginLeft:6}} 
              source={cancel}
              />
            </View>
          </Pressable>
          :<></>
        } 
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={styles.sortSubCon}>
            <Pressable
            onPress={AZToggle}
            style={({ pressed }) => [{
              justifyContent: 'center',
              opacity: pressed ? 0.5 : 1,
              width: "50%",
            },AZBack]}
            >
              <Image 
                style={styles.sortIcons} 
                source={
                  dark?AZState?sortAZDark 
                    :sortAZ:sortAZ
                }
              />                
            </Pressable>
            <Pressable 
              onPress={disToggle}
              style={({ pressed }) => [{
                justifyContent: 'center',
                opacity: pressed?0.5:1,
                width: "50%",
              },disBack]}
            >
              <Image 
                style={styles.sortIcons} 
                source={
                  dark 
                    ?disState 
                      ?distanceDark 
                      :distanceLight 
                    :distanceLight
                }
              />                
            </Pressable>
          </View>
          <Pressable
            onPress={translateIn}
            style={({pressed})=>({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View style={styles.sortContainer}>
              <Image style={styles.searchIcon} source={searchIcon} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  parentMobi: {
    width: "100%",
    alignItems: "center",
  },
  parentTabPort: {
    width: "110%",
    transform: ([{translateX: -45}]),
    alignItems: "center",
  },
  parentTabLand: {
    width: "120%",
    transform: ([{translateX: -300}]),
    alignItems: "center",
    marginHorizontal: 180,
  },

  conMobi: {
    flexDirection: "row",
    width:Platform.OS==="ios"?"100%":"110%",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: Platform.OS === "ios"?35: 60,
    ...Styles.betweenCenter,
  },
  conTabPort: 
  {
    flexDirection: "row",
    width: 390,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    // marginTop: 35,
    ...Styles.betweenCenter,
  },

  filterContainer: {
    flexDirection: "row",
    paddingLeft: Platform.OS === "android" ? 16 : 0,
  },
  filterText: {
    textTransform: "uppercase",
    alignSelf: "center",
    fontFamily: "RobotoRegular",
    letterSpacing: 3,
    lineHeight: 24,
  },

  countContainer: {
    flexDirection: "row",
    height: 22,
    minWidth: 50,
    paddingHorizontal: 8,
    borderRadius: 15,
    ...Styles.center,
  },
  count: {
    fontFamily: "RobotoRegular",
    fontSize: 12,
    lineHeight: 16,
    marginRight: Platform.OS === "ios" ? -1.5 : 0,
    marginTop: Platform.OS === "ios" ? 0 : -1,
  },

  sortContainer: {
    flexDirection: "row",
    paddingRight: Platform.OS === "android" ? 16 : 0,
    ...Styles.betweenCenter,
  },
  sortSubCon: {
    flexDirection: "row", 
    width: 80, 
    height: 40, 
    borderRadius: 8,
    overflow: "hidden"
  },
  sortIcons: {
    height: 24,
    width: 24,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  searchIcon: {
    height: 30,
    width: 30,
    marginLeft: 16,
    marginRight: 12,
    zIndex: 333,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 20,
  },

  fontLiAlt: { color: fontLightAlt },
  fontWhite: { color: fontLight },
  fontDark: { color: fontDark },
  black: { backgroundColor: darkBG },
  pureWhite: { backgroundColor: lightBG2 },
  gray: { backgroundColor: gray },
  grayDark: { backgroundColor: grayDark },
  grayLight: { backgroundColor: grayLight },
  grayLightAlt: { backgroundColor: grayLightAlt },
  trans: { backgroundColor: transparent }

});
