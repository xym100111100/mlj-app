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


class LoanResult extends Component <Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <Layout style={styles.page}>
        <View style={styles.header}>
          <Image source={Images.public.success} style={styles.img}/>
          <Text style={styles.text}>申请完成，等待审核！</Text>
        </View>
        <Btn onPress={()=>{
        //   Navigation.popTo(Router.HOME);
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

LoanResult.options = navigationConfig('申请借款');

// 定义样式
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  header: {
    paddingTop: 62.5,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom:25,
  },
  img: {
    width: 59.5,
    height: 59.5,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    color: '#757575',
    marginTop: 24.5,
    marginBottom: 89.5,
  },
  
});


export default LoanResult;
