import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Images} from '../common/images';
import {Touchable} from '../componments';

export const LineCheck = ({title, label, checked, type, extra,onClick}) => {
  
  
  /*是否选中*/
  let RenderRight = <Image style={[styles.check]} source={Images.bill.CheckNull}/>;
  if (checked) {
    RenderRight = <Image style={[styles.check]} source={Images.bill.Checked}/>;
  }
  
  /*当期状态*/
  let typeCls = {};
  let lineStyle = {};
  if (type) {
    switch (type) {
      // 逾期
      case 'danger':
        typeCls={color:"#E14920"};
        lineStyle = {marginBottom:12};
        break;
      // 当前期
      case 'primary':
        typeCls={color:"#F65A83"};
        lineStyle = {marginBottom:12};
        break;
      // 已结清
      case 'grey':
        typeCls={color:"#9E9E9E"};
        lineStyle = {marginBottom:12};
        break;
      // 未到期
      default:
        typeCls={color:"#9E9E9E"};
        break;
    }
  }
  
  let RenderLabel = <Text style={[styles.leftTips,typeCls]}>{`(${label})`}</Text>;
  if(type==="primary"){
    RenderLabel = <View style={styles.leftTipsBtn}>
      <Text style={styles.leftTipsBtnText}>{label}</Text>
    </View>
  }
  
  return (
    <Touchable  onPress={()=>{
      if (type !== 'grey') {
        onClick && onClick(!checked)
      }
    }} style={[styles.line,lineStyle]}>
      <View style={styles.left}>
        <Text style={styles.leftText}>{title}</Text>
        {RenderLabel}
      </View>
      <View style={styles.right}>
        <Text style={styles.rightText}>{extra}</Text>
        {RenderRight}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  line: {
    height:64.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal:16
  },
  left: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    fontSize:16,
    color:"#212121",
    fontWeight:'bold',
    lineHeight:22.5,
    marginRight:8
  },
  leftTips: {
    color:"#9e9e9e",
    fontSize: 12,
    lineHeight: 16.5
  },
  leftTipsBtn:{
    width: 30,
    height:16,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "#f65a83"
  },
  leftTipsBtnText:{
    fontSize:10,
    color:"#fff",
  },
  right: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightText: {
    fontSize:18,
    lineHeight:22,
    color:"#212121",
    fontWeight: "bold"
  },
  check: {
    width:24,
    height: 24,
    marginLeft:28
  }
});

