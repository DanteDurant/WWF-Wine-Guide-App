import React, { useState } from "react";
import cancel from "../../assets/images/cancel.png";

import { WebView } from "react-native-webview";

import { Image, Platform, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ModalWeb(props:any) {
  const url = props.route.params.url
  const nav = useNavigation()
  const [closeVisible, setCloseVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={{zIndex: 1, width: '100%', height: '100%'}}>
        <WebView source={{ uri: url }} style={{zIndex: 2}} onScroll={(e) => setCloseVisible(e.nativeEvent.contentOffset.y > 64)}/>
      </View>
      {closeVisible
        ? <View style={styles.closeButton}>
            <TouchableHighlight style={styles.buttonBG} onPress={() => nav.goBack()}>
              <Image source={cancel} resizeMode={'contain'} style={{width: 24, height: 24, zIndex: 100}}/>
            </TouchableHighlight>
          </View>
        : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : 30,
    height: "100%",
    width: "100%",
    zIndex: 1,
  },

  closeButton: {
    width: 40, height: 40,
    borderRadius: 24,
    position: 'absolute',    
    right: 16, top: 20,
    zIndex: 100,
  },

  buttonBG: {
    width: 40, height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
