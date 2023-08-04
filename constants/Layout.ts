import { Dimensions } from 'react-native';
const width = () => Dimensions.get('window').width;
const height = () => Dimensions.get('window').height;

export default {
  window: {width,height},
  isSmallDevice: () => width() < 375,
};

export const isTabLand = () => width() > 1200
export const isTabPort = () => width() > 500 && width() < 1100
export const isMobile = () => width() < 500
// console.log(width());