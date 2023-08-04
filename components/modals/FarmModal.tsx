import { StyleSheet } from "react-native";
import Styles from "../../constants/Styles";
import Farm from "../Farm";

export default function FarmModal(props:any) { 
  const vineyard = props.route.params.vineyard
  return (
    <Farm
      vineyard={vineyard}
      farmStyle={styles.timeSt}
    />
  );
}
const styles = StyleSheet.create({
  timeSt: {
    ...Styles.farmStyle,
    ...Styles.timeRed,
  },
});
