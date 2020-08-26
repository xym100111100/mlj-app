import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Images } from '../../common/images';
import { LayoutScroll, Layout, Dialog, Line, Touchable, Btn } from '../../componments';

import { navigationConfig } from '../../common/navigation';
import Router from '../../Router';
import { ToastShow } from '../../utils/toast';
import { getPixel } from '../../utils/screen';

class AuthAllScreen extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      cDialogVisible: false,
      bDialogVisible: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  // 下拉刷新
  async onRefresh(callback) {
    await this.init();
    callback();
  }

  // 初始化认证列表
  init() {
    const { dispatch } = this.props;
    dispatch({
      type: 'InitAuthInfoListState',
      payload: {},
    });
  }


  /*页面跳转*/
  JumpPage(com) {
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

  // 提交信息认证
  submitAuth() {
    // 判断上述已经认证的信息，否则不能跳转  判断list status 是否为0

    const { list } = this.props.NSBasic.AuthInfoList;

    let statusText = '实名认证未认证';
    // 未实名认证
    if (list && list[0]['status'] !== 2) {
      statusText = '实名认证未认证';
      ToastShow(statusText);
      return false;
    }
    // 基本信息未认证
    if (list && list[1]['status'] !== 2) {
      statusText = '基本信息未认证';
      ToastShow(statusText);
      return false;
    }
    // 工作信息未认证
    if (list && list[2]['status'] !== 2) {
      statusText = '工作信息未认证';
      ToastShow(statusText);
      return false;
    }
    // 授信信息未认证
    if (list && list[3]['status'] !== 2) {
      statusText = '授信信息未认证';
      ToastShow(statusText);
      return false;
    }
    // 提交逻辑  当前state 状态，2 =》初审  4=》立即分期

    const { clientInfo } = this.props.NSIndex;
    const { state } = clientInfo;
    if (clientInfo) {
      switch (state) {
        case 2:
        case 1:
        case 0:
          // 初审借款
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
          break;
        case 4:
          // 立即分期  确认页
          Navigation.push(this.props.componentId, {
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
          break;
      }
    }
  }

  render() {
    const { AuthInfoList } = this.props.NSBasic;
    const { list } = AuthInfoList;

    const RenderList = list && list.map((item, index) => {
      const { status } = item;
      let IconUrl, RouteName;
      switch (item.type) {
        case 'RealNameAuth':
          IconUrl = Images.auth.Name;
          RouteName = Router.AUTHNAME;
          break;
        case 'BasicInfoAuth':
          IconUrl = Images.auth.Basic;
          RouteName = Router.AUTHBASEINFO;
          break;
        case 'WorkInfoAuth':
          IconUrl = Images.auth.Work;
          RouteName = Router.AUTHBASEWORKINFO;
          break;
        case 'CreditInfoAuth':
          IconUrl = Images.auth.Identify;
          RouteName = Router.AUTHOTHER;
          break;
      }
      return (
        <Line
          key={index}
          onPress={() => {
            if (status === 0 || status === 1 || status === 3) {
              this.JumpPage(RouteName);
            }
          }}
          icon={<Image
            style={styles.line_style}
            resizeMode={'contain'}
            source={IconUrl} />}
          border={true}
          extra={item.text}
          extraStyle={status === 2 ? { color: '#212121' } : { color: '#FF4248' }}
          text={item.name}
          arrow={true} />
      );
    });

    return (
      <Layout showStatusBar={true} >
        <LayoutScroll
          style={styles.indexScroll}
          showStatusBar={true}
          pullRefresh={true}
          callback={(fn) => {
            // 下拉回调
            this.onRefresh(fn);
          }}
        >

          <View style={styles.page}>
            {/* 背景 */}
            <ImageBackground
              style={styles.header}
              source={Images.auth.ImgBack}>
              <View style={styles.header}>
                <View>
                  <View style={styles.pages_auth}>
                    <Text style={styles.pages_auth_text}> 授权认证 方便 快捷</Text>
                  </View>

                  <View style={styles.header_auth_bottom}>
                    <Text style={styles.header_auth_bottom_text}> 完成以下全部内容有助于更好的评估您的额度</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            {/*列表*/}
            <View style={styles.list}>
              {/*认证列表*/}
              {RenderList}
            </View>
          </View>
        </LayoutScroll>
        {/*提交按钮*/}
        <Btn onPress={() => {
          this.submitAuth();
        }}>提交</Btn>

      </Layout>
    );
  }
}


// 定义标题
AuthAllScreen.options = navigationConfig('信息认证');

// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
  },
  indexScroll: {
    backgroundColor: 'white',
  },
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 148,
  },
  pages_auth: {
    flex: 1,
    marginLeft: 16,
    marginTop: 41,
    width: 375,
  },
  pages_auth_text: {
    fontSize: 24,
    color: '#212121',

  },
  line_style: {
    width: 24,
    height: 24,
    marginRight: 18,
  },
  header_auth_bottom: {
    flex: 1,
    left: 16,
    top: 77,
    position: 'absolute',
    width: 375,
  },
  header_auth_bottom_text: {
    color: '#7E6D51',
    fontSize: 15,
  },
  myList: {
    flex: 1,
  },


});

export default connect(({ NSIndex, NSBank, NSBasic }) => ({ NSIndex, NSBank, NSBasic }))(AuthAllScreen);
