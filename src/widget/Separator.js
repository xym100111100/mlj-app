import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'
import { screen, system } from '../utils/common'

type Props = {
  style?: any,
}

class Separator extends Component<Props> {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    )
  }
}


const styles = StyleSheet.create({
  line: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: color.border,
  },
})


export default Separator
