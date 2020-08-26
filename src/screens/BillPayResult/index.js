import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import {navigationConfig} from '../../common/navigation';
import {Btn, Layout} from '../../componments';
import {Images} from '../../common/images';
import {Navigation} from 'react-native-navigation';
import Router from '../../Router';
import { width } from '../../utils/screen';


class BillPayResult extends Component <Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <Layout style={styles.page}>
        <View style={styles.header}>
          <Image source={Images.bill.PayResult1} style={styles.img}/>
          <Text style={styles.text}>您的支付申请已提交，预计30分钟内会有还款结果，请前往还款记录中查看。</Text>
        </View>
        <Btn onPress={()=>{
          // Navigation.popTo(Router.HOME);
          Navigation.setStackRoot(this.props.componentId, {
            component: {
                name: Router.HOME,
                options: {
                  topBar: {
                    visible: false,
                    animate: false
                  }
                },
                statusBar: {
                  visible: false,
                  style: 'dark',
                  backgroundColor: '#ff0',
                  drawBehind: false,
                },
            },
        });
        }}>完成</Btn>
      </Layout>
    );
  }
  
}

BillPayResult.options = navigationConfig('支付');

// 定义样式
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingTop: 41,
  },
  header: {
    alignItems: 'center',
    paddingLeft:20
  },
  img: {
    width: 140.5,
    height: 110.5,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    color: '#757575',
    marginTop: 29.5,
    marginBottom: 50,
  },
  
});


export default BillPayResult;
