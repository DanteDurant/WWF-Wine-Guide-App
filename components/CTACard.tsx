import {StyleSheet,View,Image,Text} from "react-native";
import {white} from "../constants/Colors";
import arrowR from "../assets/images/arrowR.png"
import { isMobile } from "../constants/Layout";

export default function CTACard(props: any ) {
  return (
    <View style={isMobile()?{paddingHorizontal: 8}:{paddingHorizontal: 4}}>
      <View style={[styles.container, props.bgColor]}>    
        <View style={{height: 80,width: 80}}>
          <Image style={props.imageStyle} source={props.image}/> 
        </View>
        <View style={{marginLeft: 8}}>
          <Text style={styles.title}>
            {props.title}
          </Text>
          <Text style={styles.text}>
            {props.text}
          </Text>
        </View>
        <Image resizeMode="contain" style={styles.arrow} source={arrowR}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
    flexDirection: "row",
    minWidth: "100%",
    borderRadius: 8,
    minHeight: 96,
    alignItems: "center",
    justifyContent: "flex-start",
  },
	title:{
		color: white,
		fontSize: 12,
		fontWeight: "900",
		fontFamily: "RobotoMedium",
		textTransform: "uppercase",
		marginBottom: 4,
		letterSpacing: 1,
	},
	text:{
		color: white,
		fontSize: 24,
		textTransform: "uppercase",
		lineHeight: 24,
		fontFamily: "WWFWebfontRegular",
		letterSpacing: 0,
	},
	arrow:{
		position: "absolute", 
		right: -4, 
		height: 26
	},
});
