import { StyleSheet, StatusBar, View } from "react-native";

import mapGroot from "../../assets/images/mapGroot.png";
import bgGMT from "../../assets/images/bgGMT.png";

import { orange, red } from "../../constants/Colors";

import Special from "../Special";
import Styles from "../../constants/Styles";

export default function Special1(props: any) {
  return (
    <View>
      <StatusBar barStyle="dark-content" hidden={false} />
      <Special
        ImageBG={bgGMT}
        title="Green Mountain Trail"
        para1={
          "The Green Mountain Trail is a four day hiking trail around the Green Mountain in the Overberg region of the Western Cape, South Africa. \n\nTraversing a tapestry of fynbos and fruit farms this slackpack trail offers fine food and comfortable overnights in the Cape Winelands of South Africa. Accommodation is in four star country guesthouses. Delicious , wholesome meals are provided throughout."
        }
        ImageBG2={mapGroot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeGreen: {
    ...Styles.timeGreen,
    ...Styles.farmStyle,
  },
  timeRed: {
    color: red,
    top: 16,
    right: 24,
    position: "absolute",
    fontFamily: "RobotoRegular",
  },
  timeOrange: {
    position: "absolute",
    top: 16,
    right: 24,
    color: orange,
    fontFamily: "RobotoRegular",
  },
  bar: {
    color: "#fff",
    backgroundColor: "#fff",
  },
});
