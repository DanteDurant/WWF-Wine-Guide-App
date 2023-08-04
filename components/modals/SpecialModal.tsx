import { StyleSheet } from "react-native";
import Styles from "../../constants/Styles";
import Special from "../Special";

export default function SpecialModal(props:any) { 
  const special = props.route.params.special
  return (
    <Special special={special} />
  );
}
const styles = StyleSheet.create({
  timeSt: {
    ...Styles.farmStyle,
    ...Styles.timeRed,
  },
});
