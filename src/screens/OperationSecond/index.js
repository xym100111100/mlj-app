import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl, ImageBackground } from 'react-native'

import { screen, system } from '../../utils/common'

import { Heading2, Heading3, Paragraph } from '../../widget/Text'

import SpacingView from '../../widget/SpacingView'
import DetailCell from '../../widget/DetailCell'
import Separator from '../../widget/Separator'
import NavigationItem from '../../widget/NavigationItem'
import { navigationConfig } from '../../common/navigation';

import { Images } from '../../common/images';
import { LayoutScroll } from '../../componments';

import color from '../../widget/color'


// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import Toast from 'react-native-simple-toast';

class SurgeryItemScreen extends Component<Props, State>{


  constructor(props: Object) {
    super(props);
    this.state = {
      isRefreshing: false,
      parentNo: '',
      operationList: [
      ],
    }

    this.getOperationItem();
  }

  // 获取当前所有的手术项目
  getOperationItem() {
    const { dispatch } = this.props;

    dispatch({
      type: 'initApplyItemInfo',
      payload: {
        // payload 里面是请求携带的参数
      },
      callback: (res) => {
        if (res.code == 0) {
          // 获取所有项目
          this.setState({
            operationList: res.data
          })

          // Toast.show('获取手术项目成功');
        } else {
          // Toast.show('获取手动项目失败');
        }
      },
    });
  }

  // 点击去下一个子级页面

  getOperationName(item) {
    // 根据选中项目 去子级页面
    const {dispatch} = this.props;
    dispatch({
        type: 'OperationSelect',
        payload: {...item},
        callback:()=>{
          Navigation.push(this.props.componentId, {
            component: {
              name: Router.OPERATION,
              options: {
                bottomTabs: {
                  visible: false,
                  drawBehind: true,
                  animate: true
                }
              }
            },
          });
        }
    });

   
  }


  render() {
    const { operationList } = this.state;
    return (
    <LayoutScroll>
      <View style={styles.container} >
        <FlatList data={operationList} renderItem={({ item }) =>
          <View>
            <TouchableOpacity onPress={() => { this.getOperationName(item) }}    >
              <View style={styles.content}  >
                <Heading3 style={{ color: '#212121', fontSize: 17, fontWeight: '500' }}>{item.operationProjectName ? item.operationProjectName : ''}</Heading3>
                <View style={{ flex: 1, backgroundColor: 'blue' }} />
                <Image style={styles.arrow} source={Images.loan.Cellarrow} />
              </View>
            </TouchableOpacity>
            <View style={{ marginLeft: 16, flex: 1, }}>
              <Separator />
            </View>
          </View>
        }

        />
      </View>
    </LayoutScroll>
    )
  }

}
SurgeryItemScreen.options = navigationConfig('确认项目');
// 定义样式
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 188,
  },
  message: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 0,
  },
  container: {
    backgroundColor: 'white',
  },
  content: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 56,
    paddingRight: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrow: {
    width: 12,
    height: 24,
    marginRight: 0,
  }
})


export default connect(({ LOANMONEYIndex,NSurgeryitem }) => ({ LOANMONEYIndex,NSurgeryitem }))(SurgeryItemScreen);

