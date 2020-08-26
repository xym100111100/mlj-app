import React, { Component,Fragment } from 'react';
import { View, Text,Button, TextInput,StyleSheet, Easing,StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl,ImageBackground,TouchableHighlight } from 'react-native'


import { Heading1,Heading2, Heading3, Paragraph } from '../widget/Text'

import Toast from 'react-native-simple-toast';


  // redux & router
import {connect} from 'react-redux';
import Router from '../Router';
// 跳转组件



class  Layer extends Component {


    constructor(props: Object) {
      super(props);
      this.state={
        operationId:""
      }

    }

    render() {
      return (
        <View style={{width: 293, height: 209.5,marginTop:-210, borderRadius: 4, backgroundColor: '#fff'}}>
          <Heading3 style={{ justifyContent:'center',alignSelf:'center',paddingTop:27,paddingBottom:24,fontWeight:'bold',fontSize:16, }}>请输入客服号</Heading3>
          <View style={styles.alertborder}>
                <TextInput
                numberOfLines={1}
                maxLength={20}
                style={styles.textInputTitle}
                placeholder={'请输入正确客服号'}
                onChangeText={(e) => {
                  this.setState({
                    operationId: e
                  })
                }}
                >
                </TextInput>
          </View>
          <View>
            <View style={ styles.alter_button_left }>
                <Heading3 style={{ color: '#F64976',fontSize:16,paddingHorizontal:34.5,paddingVertical:8.5 }}  onPress={() => this.props.hide()} >取消</Heading3>
            </View>
            <View style={ styles.alter_button_right }>
                <Heading3 style={{ color: '#ffffff',fontSize:16,paddingHorizontal:34.5,paddingVertical:8.5 }} onPress={() => {
                      this.props.writeOperationItem && this.props.writeOperationItem(this.state.operationId);
                    }} >确定</Heading3>
            </View>
          </View>

        </View>
      );
    }

   
  }



  // 定义样式
const styles = StyleSheet.create({
    icon: {
      width: 27,
      height: 27,
    },
    container: {
        flexDirection: 'row',
        color: 'white',
        height:60,
        paddingHorizontal:18,
        paddingVertical:16,
        backgroundColor:'#fff',
    },
    logohome:{
        width:96,
        height:24,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        alignSelf:'flex-start',
    },
    messagehome:{
        right:0,
        position:'absolute',
    },
    messagehome_img:{
        width:25,
        height:25,
        position:'absolute',
        right:10,
        marginVertical:15,
    },
    container_banner: {
        flex:1,
    },
    bannerimg:{
        flex: 1,
        width:375,
        alignItems:'center',
        alignContent:'center',
        height:214,
    },
    contain_apply:{
        height:315,
        backgroundColor:'white',
        marginHorizontal:30,
        marginTop:-58,
    },
    contain_apply_button: {
        width:197,
        height:40,
        alignSelf:'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop:21.5,
    },
    contain_apply_text: {
        lineHeight:22.5,
        fontSize:16,
        color:'#FFFFFF',
        alignSelf:'center',
    },
    contain_apply_minute:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle:"solid",
        alignSelf: 'center',
        marginTop:23.5,
    },
    alertborder:{
        alignItems:'center',
        alignSelf:'center',
        height:53,
        marginHorizontal:16,
        backgroundColor:'#F7F7F7',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#DDDDDD'
    },
    textInputTitle: {
        width: 261,
        fontSize: 14,
        color: '#BBBBBB',
        paddingHorizontal:16.5,
        paddingVertical:16,
      },
      alter_button_right:{
          width: 100.5,
          height: 39.5,
          backgroundColor: '#F64976',
          borderRadius: 19.75,
          marginTop: 23,
          justifyContent: 'center',
          alignItems: "center",
          position: 'absolute',
          right: 27,
      },
      alter_button_left: {
          width: 100.5,
          height: 40,
          backgroundColor: '#FFFFFF',
          borderColor: '#F64976',
          borderWidth: 1,
          borderRadius: 19.75,
          marginTop: 23,
          justifyContent: 'center',
          alignItems: "center",
          position: 'absolute',
          left: 27,
      },


   
  })

export default connect(({NSApplyitem}) => ({NSApplyitem}))(Layer);
