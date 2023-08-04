import React from "react";
import {
  Image, Pressable, Share, StyleSheet, Text, useColorScheme
} from "react-native";
import {
  darkAltBG, fontDark, fontLightAlt, grayDarkTr, grayLight, grayLightTr
} from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function ShareButton(props: any) {
  const dark = useColorScheme() === "dark";
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.vineyard.name,
        url: props.vineyard.contact.socialURL,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Pressable
      onPress={onShare}
      style={({ pressed }) => [{
        backgroundColor: pressed
          ? dark
            ? grayDarkTr
            : grayLightTr
          : dark
            ? darkAltBG
            : grayLight,
      }, styles.button
      ]}
    >
      <Image source={props.icon} style={styles.icon} />
      <Text style={[dark ? styles.fontLiAlt : styles.fontDark]}>
        {props.buttonText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 113,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    ...Styles.center,
    alignSelf: "center",
    flexDirection: "row",
  },
  icon: {
    ...Styles.icon24,
    marginRight: 12,
  },
  fontDark: { color: fontDark },
  fontLiAlt: { color: fontLightAlt },
});
