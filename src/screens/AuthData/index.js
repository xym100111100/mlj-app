import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native'

import { screen, system } from '../../utils/common'

import { Heading2 } from '../../widget/Text'

import { LayoutScroll, Layout, Line, Touchable, Confirm, Btn } from '../../componments';

// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
import { navigationConfig } from '../../common/navigation';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import { ToastShow } from '../../utils/toast';

import color from '../../widget/color'
import { Images } from '../../common/images';

// 补充材料

class AuthDataScreen extends Component<Props, State>{


  constructor(props: Object) {
    super(props);
    this.state = {
      isRefreshing: false,
    }

  }


  componentDidMount() {
    // 初始化补充材料列表 
    this.InitCreaditAuthDataList()
  }


  // 初始化补充材料列表
  InitCreaditAuthDataList() {
    const { dispatch } = this.props;
    dispatch({ type: 'CreaditAuthData', payload: {} });
  }


  /*页面跳转*/
  JumpPage(com, item) {


    const { dispatch } = this.props;
    // 当前用户选择的id
    dispatch({
      type: 'CreditNoAuthDataSelect',
      payload: { ...item },
      callback: () => {
        Navigation.push(this.props.componentId, {
          component: {
            name: com,
            options: {
              bottomTabs: {
                visible: false,
                drawBehind: true,
                animate: true,
              },
            },
          },

        });
      }
    });

  }

  // 跳转到申请页
  goLoanSure() {
    // 判断当前已经穿过必传图
    const { authDataList } = this.props.NSAuthpersonal;

    const arrNew  = [];

    authDataList.map((item, index) => {
      if(item.isUpload){
        arrNew[index] = item.num ;
      }
    });


    for(let i=0;i<arrNew.length;i++){
      if(arrNew[i] < 1){
        ToastShow('必须先上传授信信息');
        return false;
      }
    }

    // Navigation.popToRoot(this.props.componentId);

    Navigation.setStackRoot(this.props.componentId, {
      component: {
        name: Router.LOANCONFIRM,
        options: {
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true,
          },
        },
      },
    });
  }



  render() {
    // 获取当前授权列表
    const { authDataList } = this.props.NSAuthpersonal;

    return (

      <LayoutScroll style={{ position: 'relative', backgroundColor: '#F7F7F7' }} showStatusBar={true}>

        <View style={styles.page_container}>
          <FlatList
            data={authDataList}
            numColumns={2}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
            <View style={styles.itemsContainer} >
              <Touchable onPress={() => {
                this.JumpPage(Router.AUTHUPLOAD, item);
              }}
                style={styles.container_box}
              >
            
                <Image style={styles.container_box_img} source={item.uri?{uri:item.uri}:Images.public.Testlogo} />

                <View style={styles.pages_container_title}>
                  {/* <Image style={styles.content_img} source={{ uri: item.creditTypeIcon }} /> */}
                  <Text style={styles.content_text}>{item.certificateTypeName}  </Text>
                  <Text style={styles.content_text_status}>{item.isUpload ? '(必传)' : ''}  </Text>
                </View>

                <View style={styles.pages_container_update}>
                  <Text style={styles.pages_title}>{item.num}</Text>
                  <Text style={styles.update_photo} >修改</Text>
                </View>
       
              </Touchable>
              </View>
            }
          />
        </View>


        <Btn style={styles.cardBtn} onPress={() => {
          this.goLoanSure();
        }}>提交</Btn>

      </LayoutScroll>


    )
  }


}

// 定义标题
AuthDataScreen.options = navigationConfig('授信信息');

// 定义样式
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
  },

 
  itemsContainer: {
    flex:1, // 空间平均分布
    alignItems: 'center',
    marginBottom:10
  },

  page_container: {
    flexDirection: 'row',
    marginTop: 20,

    justifyContent:'space-around'
  },
  container_box: {
    height: 192,
    borderStyle: 'solid',
    borderRightColor: '#F0F0F0',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    flex:1,
  },
  pages_title: {
    position: 'absolute',
    left: 10,
    color: '#212121',
    fontSize: 12,
  },
  container_box_end: {
    width: 93,
    height: 110,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 26,

  },
  container_box_img: {
    width: 159.5,
    height: 126.6,
  },
  update_photo: {
    position: 'absolute',
    right: 10,
    color: '#67C2F7',
    fontSize: 12,
  },
  pages_container_title: {
    flexDirection: 'row',
    marginTop: 9.5,
    paddingLeft: 6,
    paddingRight: 5,
  },
  pages_container_update: {
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 5,
    paddingTop: 12.5,
  },
  images_count: {
    position: 'absolute',
    left: 10,
  },
  content_img: {
    width: 18,
    height: 18,
  },
  content_text: {
    height: 32,
    fontSize: 13,
    marginTop: 3,
    alignSelf:'flex-start',
  },
  content_text_status: {
    height: 32,
    fontSize: 13,
    marginTop: 3,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#FF4248',
  },
  login: {
    width: 343,
    height: 49,
    position: 'absolute',
    bottom: 20,
    borderRadius: 24.5,
    alignSelf: 'center',
  },
  loginText: {
    lineHeight: 49,
    fontSize: 25,
    color: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default connect(({ NSAuthpersonal }) => ({ NSAuthpersonal }))(AuthDataScreen);