import { StyleSheet, StatusBar, View } from "react-native";
import Farm from "../Farm";

import mapGroot from "../../assets/images/mapGroot.png";
import bgGroot from "../../assets/images/bgGroot.png";
import Styles from "../../constants/Styles";

export default function ModalGroot() {
  return (
    <>
      <StatusBar barStyle="light-content" hidden={false} />

      <Farm
        ImageBG={bgGroot}
        title="Groot Constantia"
        time="OPEN until 16:30"
        farmStyle={styles.timeSt}
        icons={{
          walking: true,
          restaurant: true,
          childFriendly: true,
        }}
        mainText='The oldest wine-producing farm in South Africa. In 1679 Simon van der
Stel was appointed by the Dutch East India Company. After years of loyal
service, he requested land from the Company. He periodically sent out
riders to collect soil samples in 1685. He chose 891 morgen (about 763
ha) situated behind Table Mountain for its wine growing potential and
magnificent scenery. He named his farm "Constantia" - Latin for
constancy or steadfastness - attributes that Van der Stel held in high
esteem.'
        ImageBG2={mapGroot}
      />
    </>
  );
}

const styles = StyleSheet.create({
  timeSt: {
    ...Styles.farmStyle,
    ...Styles.timeOrange,
  },
});
