import { ImageBackground, Image } from "react-native";
import { CachedImage } from '@georstat/react-native-image-cache';

export default function BGImage(props: any) {
  return (
    <ImageBackground
      resizeMode="cover"
      source={props.ImageBG}
      style={{...props.ImageCon, ...props.style}}
    >
      <Image resizeMode="contain" source={props.logo} style={{...props.logoSt}} />
      {/* <CachedImage resizeMode="contain" source={props.logo} style={{...props.logoSt}} /> */}
    </ImageBackground>
  );
}
export function BGImage2(props: any) {
  return (
    <ImageBackground
      resizeMode="contain"
      source={props.ImageBG2}
      style={props.ImageCon2}
    ></ImageBackground>
  );
}
