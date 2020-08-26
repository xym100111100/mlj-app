import {Dimensions, Platform} from 'react-native';

export const width = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const height = screenHeight;

export const imgMode = Platform.OS === 'ios' ? 'cover' : 'cover';
const ScreenWidth = Math.min( width, 540);
//db数值转化
export function getPixel(num, designWidth = 375) {
    return num * ScreenWidth / designWidth ;
}




