import { StatusBar, StyleSheet, View } from "react-native";

import bgSpier from "../../assets/images/bgSpier.png";
import mapGroot from "../../assets/images/mapGroot.png";

import Farm from "../Farm";
import Styles from "../../constants/Styles";

export default function ModalSpier() {
  return (
    <View>
      <StatusBar barStyle="light-content" hidden={false} />
      <Farm
        ImageBG={bgSpier}
        title="Spier"
        time="OPEN"
        farmStyle={styles.timeSt}
        icons={{
          walking: true,
          cycling: true,
          restaurant: true,
          accommodation: true,
          childFriendly: true,
        }}
        mainText="Farmed since 1692, Spier has a wealth of history as well as a vibrant vision for a sustainable future of ethical farming, healthy soil and happy people. We are renowned for our approach to responsible tourism. This Stellenbosch wine farm has many environmental initiatives, ranging from the development of an indigenous nursery to reducing water usage. All of Spier’s wastewater and 90 percent of its solid waste is recycled."
        ImageBG2={mapGroot}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  timeSt: {
    ...Styles.farmStyle,
    ...Styles.timeGreen,
  },
});
