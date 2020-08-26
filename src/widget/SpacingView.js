import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import color from './color'


class SpacingView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}></View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 14,
    backgroundColor:'#F5F5F5',
  },
})


export default SpacingView
