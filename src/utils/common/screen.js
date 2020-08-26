/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import { Dimensions, Platform, PixelRatio,StatusBar, } from 'react-native'
import {height} from '../screen';

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1 / PixelRatio.get(),
  statusBarHeight: (Platform.OS === 'ios' ? 20 : 0)
}
