import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        console.log("Loading fonts")
        await Font.loadAsync({
          ...FontAwesome.font,
          "SpaceMono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "WWFWebfontRegular": require("../assets/fonts/wwf-webfont-regular.ttf"),
          "RobotoRegular": require("../assets/fonts/roboto-regular.ttf"),
          "RobotoMedium": require("../assets/fonts/roboto-medium.ttf"),
          "MontserratLight": require("../assets/fonts/montserrat-light.ttf"),
          "MontserratBold": require("../assets/fonts/montserrat-bold.ttf"),
        });
        console.log("Fonts loaded")
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.log("Font load error", e)
        console.warn(e);
      } finally {
        console.log("finished loading fonts")
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
