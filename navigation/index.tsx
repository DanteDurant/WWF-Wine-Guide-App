import {
  AntDesign, FontAwesome5,
  MaterialCommunityIcons, MaterialIcons, Foundation, Ionicons
} from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme, DefaultTheme, NavigationContainer
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";

import Colors, { darkBG, lightAltBG } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import Filter from "../components/modals/Filter";
import ModalCloof from "../components/modals/ModalCloof";
import ModalGroot from "../components/modals/ModalGroot";
import ModalGMT from "../components/modals/ModalGTM";
import ModalSpier from "../components/modals/ModalSpier";
import ModalWeb from "../components/modals/ModalWeb";

import GuideScreen from "../screens/GuideScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

import FarmModal from "../components/modals/FarmModal";
import AboutScreen from "../screens/AboutScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import SpecialsScreen from "../screens/SpecialsScreen";
import {
  RootTabParamList,
  RootTabScreenProps
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SpecialModal from "../components/modals/SpecialModal";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const dark = useColorScheme() === "dark";
  const theme = { ...(colorScheme === "dark" ? DarkTheme : DefaultTheme) };
  theme.colors.background = dark ? "#000" : "#EAE7D8";

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<any>();

function RootNavigator(props: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops" }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen
          name="ModalGroot"
          component={ModalGroot}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ModalSpier"
          component={ModalSpier}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModalCloof"
          component={ModalCloof}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModalGMT"
          component={ModalGMT}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="ModalWeb"
          component={ModalWeb}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="FarmModal"
          component={FarmModal}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="SpecialModal"
          component={SpecialModal}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{
            animation: "fade",
            headerShown: false,
            presentation: "transparentModal",
            contentStyle: { backfaceVisibility: "hidden" },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const tabBarLabelStyle: any = { fontSize: 10, position: 'relative', top: -2 }

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarIconStyle: { fontSize: 1 },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({ navigation }: any) => ({
          title: "HOME",
          headerShown: false,
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        })}
      />

      <BottomTab.Screen
        name="TabOne"
        component={GuideScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "GUIDE",
          headerShown: false,
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="wine-bar" size={24} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={MapScreen}
        options={{
          title: "MAP",
          headerShown: false,
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={SpecialsScreen}
        options={{
          title: "SPECIALS",
          headerShown: false,
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <AntDesign name="star" size={24} color={color} />,
          // tabBarIcon: ({ color }) => <Ionicons name="star" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={AboutScreen}
        options={{
          title: "ABOUT",
          headerShown: false,
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <MaterialI name="info" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function Awesome5(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={24} style={{ marginBottom: -4 }} {...props} />;
}

function Material(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={24} style={{ marginBottom: -4 }} {...props} />
  );
}

function Ant(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={24} style={{ marginBottom: -4 }} {...props} />;
}

function MaterialI(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={24} style={{ marginBottom: -4 }} {...props} />;
}

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
  black: { backgroundColor: darkBG },
  cream: { backgroundColor: lightAltBG },
});
