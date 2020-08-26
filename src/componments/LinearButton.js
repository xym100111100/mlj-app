import React from 'react'
import {StyleSheet, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Touchable from './Touchable'

export const Button = ({text, children, style, textStyle, onPress}) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 0.4, y: 1}}
    colors={['#F7991C', '#FD6B00']}
    style={[styles.linearGradient, style]}
  >
    <Touchable
      onPress={() => {
        onPress && onPress();
      }}
      style={[styles.button]}>
      <Text style={[styles.text, textStyle]}>{text || children}</Text>
    </Touchable>
  </LinearGradient>

);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: 40,
    marginHorizontal: 56,
    borderRadius: 4
  },
  button: {
    width:300,
    height:40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
});

export default Button
