import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {width} from "../utils/screen";
import Touchable from './Touchable'

export const Line = ({text, extra, extraStyle,rightStyle, border, arrow, icon, children, style, textStyle, ...rest}) => {
  return (
    <Touchable style={[styles.line, style]} {...rest}>
      <View style={styles.lineLeft}>
        {icon && icon}
        <Text style={[styles.lText, textStyle]}>{text || children}</Text>
      </View>
      <View style={[styles.lineRight,rightStyle]}>
        {extra && <Text style={[styles.rText, arrow && {color: "#BBB"}, extraStyle]}>{extra}</Text>}
        {arrow && <Image style={styles.rArrow} source={require('../../assets/account/icon-arrow.png')}/>}
      </View>
      {border && <View style={styles.border}></View>}
    </Touchable>
  )
};

const styles = StyleSheet.create({
  line: {
    position: 'relative',
    width,
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  border: {
    position: 'absolute',
    left: 17,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    width: width - 34,
    backgroundColor: "#e9e9e9"
  },
  lineLeft: {
    position: 'relative',
    width:104,
    flexDirection: 'row',
    alignItems: 'center'
  },
  lText: {
    fontSize: 15,
    color: "#212121"
  },
  lineRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rText: {
    fontSize: 15,
    color: "#808080"
  },
  rArrow: {
    marginLeft: 6
  }
});

export default Line
