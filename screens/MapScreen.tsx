import React, { useState, useEffect, useRef } from "react";
import { Animated, Image, Platform, Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-map-clustering";
import { Callout, Marker } from "react-native-maps";

import Card from "../components/Card";

import Spacer16 from "../components/reuseable/Spacer16";

import Styles from "../constants/Styles";
import { darkAltBG, darkBG, greenAlt, lightAltBG, purpleAlt } from "../constants/Colors";

import mapPinLight from "../assets/images/mapPinLight.png"
import mapPinDark from "../assets/images/mapPinDark.png"

import { isMobile } from "../constants/Layout";
import { isPortrait } from "../hooks/isPortrait";

import { useDatabase } from "../hooks/useDatabase";
import { useLocation } from "../hooks/useLocation";

import { getBoundsOfDistance } from 'geolib';

import compass from "../assets/images/compass.png"
import BtnMap from "../assets/images/icnMap.png"
import Pin from "../assets/images/Pin.png"

export default function MapScreen(Markers: any, props: any) {

  const [vineyard, setVineyard] = useState<any>(null)
  const [vineId, setVineId] = useState<any>(null)

  const userLocation = useLocation()

  let card = <></>
  if (vineyard) {
    card = (
      <React.Fragment key={vineyard.id}>
        <Pressable
          onPress={() => navigation.navigate("FarmModal", { vineyard } as any)}
          style={({ pressed }) => ([
            { opacity: pressed ? 0.5 : 1, marginBottom: isMobile() ? 8 : 0 },
            isMobile() ? styles.cardMobile : (isPortrait() ? styles.cardTabPort : styles.cardTabLand)
          ])}>
          <Card vineyard={vineyard} />
        </Pressable>
        <Spacer16 />
      </React.Fragment>
    )
  }

  const dark = useColorScheme() === "dark";

  const db: any = useDatabase()
  const vineyards = db.sortedVineyards
  const markers = []
  let mapRef: any = null

  const minC = { lat: 1e6, lng: 1e6 },
    maxC = { lat: -1e6, lng: -1e6 },
    avg = { lat: 0, lng: 0 }

  let count = 0
  for (const v of vineyards) {
    if ((v?.location?.gps) && (v?.location?.gps[0]) && (v?.location?.gps[1])) {
      const g = v.location.gps
      minC.lat = Math.min(minC.lat, g[0]); minC.lng = Math.min(minC.lng, g[1])
      maxC.lat = Math.max(maxC.lat, g[0]); maxC.lng = Math.max(maxC.lng, g[1])
      avg.lat += g[0]; avg.lng += g[1]
      count++
      markers.push(
        <Marker
          key={v.name} title={v.name}
          onPress={() => {
            setVineyard(v)
            setVineId(v.id)
            const radius = 10;
            const coordinates = { latitude: g[0], longitude: g[1] }
            mapRef.animateCamera({ center: coordinates })
          }}
          onDeselect={() => { vineId == v.id ? setVineyard(null) : "" }}
          coordinate={{ latitude: g[0], longitude: g[1] }}
        >
          <Image
            source={
              dark ?
                Platform.OS === "ios" ?
                  mapPinDark :
                  mapPinLight :
                mapPinLight
            }
            style={
              vineyard && (vineId == v.id) ?
                dark ? styles.IconActDk :
                  styles.IconActli :
                styles.Icon
            }
          />
          <Callout tooltip={true} />
        </Marker>
      )
    }
  }

  avg.lat = (minC.lat + maxC.lat) / 2
  avg.lng = (minC.lng + maxC.lng) / 2

  const navigation = useNavigation();
  const ep = 100

  const resetMap = () => {
    const region = {
      latitude: avg.lat,
      longitude: avg.lng,
      latitudeDelta: maxC.lat - minC.lat + .5,
      longitudeDelta: maxC.lng - minC.lng + .5,
    }
    console.log('resetting map', region)
    mapRef.animateToRegion(region)
  }

  const animateToSelf = () => {
    mapRef.animateToRegion({
      latitude: -33.930189,
      longitude: 18.443388,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    })
  }

  return (
    <View style={styles.container}>
      <MapView

        mapRef={(map) => { mapRef = map }}
        clusterColor={dark ? greenAlt : purpleAlt}
        style={styles.map}
        initialRegion={{
          latitude: avg.lat,
          longitude: avg.lng,
          latitudeDelta: maxC.lat - minC.lat + .5,
          longitudeDelta: maxC.lng - minC.lng + .5,
        }}
        onTouchStart={() => { if (vineyard) setVineyard(null) }}
      >
        {markers}
        <Marker
          coordinate={{ latitude: -33.930189, longitude: 18.443388 }}
        >
          <Image source={Pin}
            style={styles.UserLocation}
          />
        </Marker>

      </MapView>

      <View
        style={[dark ? styles.black : styles.cream, styles.filterContainer]}
      >
      </View>

      <View
        style={[dark ? styles.black : styles.cream,
        styles.PillButton
        ]}
      >
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            width: "100%",
            height: "50%"
          })} onPress={resetMap}>
          <View style={styles.container}>
            <Image
              style={{
                height: 20,
                width: 20
              }}
              source={BtnMap}
            />
          </View>
        </Pressable>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#b4b2b2"
          }}
        />
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            width: "100%",
            height: "50%"
          })} onPress={animateToSelf}>
          <View style={styles.container}>
            <Image
              style={{
                height: 20,
                width: 20
              }}
              source={compass}
            />
          </View>
        </Pressable>

      </View>

      <Animated.View
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          width: "100%",
        }}
      >
        <View
          style={[
            (isMobile()
              ? {}
              : { marginHorizontal: 80, paddingTop: 4, }),
            { flexDirection: "row", flexWrap: "wrap" }
          ]}>
          {card}
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? -16 : 8,
    left: Platform.OS === "ios" ? 0 : 0,
    paddingLeft: Platform.OS === "ios" ? 8 : 0,
    width: "100%",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  Icon: {
    width: 32, height: 32, paddingLeft: 4, paddingTop: 4
  },
  IconActli: {
    width: 32,
    height: 32,
    paddingLeft: 4,
    paddingTop: 4,
    backgroundColor: "#b9ce4d68",
    borderRadius: 50
  },
  IconActDk: {
    width: 32,
    height: 32,
    paddingLeft: 4,
    paddingTop: 4,
    backgroundColor: "#69438770",
    borderRadius: 50
  },
  PillButton: {
    position: "absolute",
    top: 50, // 60,
    // right: 10,
    left: 10,
    width: 44,
    height: 88,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.13,
    shadowRadius: 15,
    elevation: 20,
  },
  UserLocation: {
    width: 118, height: 118,
  },

  cardMobile: {
    // marginTop: 8,
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

  timeOrange: {
    ...Styles.timeOrange,
  },
  black: { backgroundColor: darkAltBG },
  cream: { backgroundColor: lightAltBG },
});
