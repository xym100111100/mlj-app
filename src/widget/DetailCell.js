import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ViewPropTypes} from 'react-native';
import {Heading2, Heading3, Paragraph} from './Text';
import Separator from './Separator';
import {Navigation} from 'react-native-navigation';
import Router from '../Router';
import { Images } from '../common/images';

type Props = {
  image?: any,
  style?: ViewPropTypes.style,
  title: string,
  subtitle?: string,
  url : any,
  navigation: any,
}


class DetailCell extends Component<Props> {
  render() {
    let icon = this.props.image && <Image style={styles.icon} source={this.props.image}/>;
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          Navigation.push(this.props.componentId, {
            component: {
              name: Router.url,
              options: {
                bottomTabs: {
                  visible: false,
                  drawBehind: true,
                  animate: true,
                },
              },
            },
          });
        }} >
          <View style={[styles.content, this.props.style]}>
            {icon}
            <Heading3 style={{ color:'#212121',fontSize:17,fontWeight:'bold', }}>{this.props.title}</Heading3>
            <View style={{flex: 1, backgroundColor: 'blue'}}/>
            <Paragraph style={{fontSize:17,color: '#9E9E9E',paddingRight:8}}>{this.props.subtitle}</Paragraph>
            <Image style={styles.arrow} source={ Images.authname.RightIcon }/>
          </View>
          
          <Separator/>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 18,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 18,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrow: {
    width: 12,
    height: 24,
  },
});


export default DetailCell;
