import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';

import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Images } from '../../common/images';
import { LayoutScroll, Layout, Dialog, Line, Touchable } from '../../componments';

import CustomerDialog from '../../container/CustomerDialog';
import Router from '../../Router';
import { ToastShow } from '../../utils/toast';
import NSUser from '../../reducers/user';
import { getPixel } from '../../utils/screen';

class MyScreen extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      cDialogVisible: false,
      bDialogVisible: false,
    };
  }


  componentDidMount() {
    this.initClientInfo();
  }


  // 下拉刷新
  async onRefresh(callback) {
    await this.initClientInfo();
    callback();
  }

  initClientInfo() {
    const { dispatch } = this.props;
    dispatch({
      type: 'initClientInfo',
      payload: {},
    });
  }
  // 手机号脱敏
  geTel(tel) {
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, "$1****$2");
  }

  /*渲染头部内容*/
  renderHeader() {
    const { userInfo } = this.props.NSUser;
    const { cell, clientImgUrl, state } = userInfo;
    let phone = '';
    if (cell) {
      phone = this.geTel(cell);
    }


    let RenderAvatar = <Image
      style={styles.avatar}
      source={Images.my.IconAvatar} />;

    if (clientImgUrl !== null) {
      RenderAvatar = <Image
        style={styles.avatar}
        source={{ uri: clientImgUrl }} />;
    }


    return (
      <ImageBackground
        style={styles.header}
        source={ Images.my.Banner }>
        <View style={styles.header}>
          {/*头像*/}
          {RenderAvatar}
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{cell !== null ? phone : ''}</Text>
            </View>
            <Image style={[state === 'AUTHED' ? styles.verified : styles.noverified]}
              source={state === 'AUTHED' ? Images.my.Auth : Images.my.NoAuth} />
          </View>
        </View>
      </ImageBackground>
    );
  }

  /*页面跳转*/
  JumpPage(com) {
    Navigation.push(this.props.componentId, {
      component: {
        name: com,
      },
    });
  }

  render() {
    const { userInfo } = this.props.NSUser;
    const { state } = userInfo;

    return (
      <Layout style={{ position: 'relative', flex: 1, }}
        showStatusBar={true}
      >

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
            {/*头部内容*/}
            {this.renderHeader()}
            {/*列表*/}
            <View style={styles.list}>
              {/*我的银行卡*/}
              <Line
                onPress={() => {
                  if (state !== 'AUTHED') {
                    this.setState({
                      bDialogVisible: true,
                    });
                  } else {
                    this.JumpPage(Router.MYBANK);
                  }
                }}
                icon={<Image
                  style={styles.iconImg}
                  resizeMode={'contain'}
                  source={Images.my.Bank} />}
                border={true}
                text={'我的银行卡'}
                arrow={true} />
              {/*申请记录*/}
              <Line
                style={{ marginBottom: 10 }}
                onPress={() => {
                  this.JumpPage(Router.LOANRECORD);
                }}
                icon={<Image
                  style={styles.iconImg}
                  resizeMode={'contain'}
                  source={Images.my.Record} />}
                border={true}
                text={'申请记录'}
                arrow={true} />
              {/*帮助中心*/}
              {/*        <Line
                            onPress={() => {
                                ToastShow('我要跳转到帮助中心H5');
                            }}
                            icon={<Image
                                style={{width: 24, height: 24, marginRight: 18}}
                                resizeMode={'contain'}
                                source={Images.my.Help}/>}
                            border={true}
                            text={'帮助中心'}
                            arrow={true}/>*/}
              {/*关于我们*/}
              {/* <Line
                            style={{marginBottom: 10}}
                            onPress={() => {
                                ToastShow('我要跳转到关于我们H5');
                            }}
                            icon={<Image
                                style={{width: 24, height: 24, marginRight: 18}}
                                resizeMode={'contain'}
                                source={Images.my.About}/>}
                            border={true}
                            text={'关于我们'}
                            arrow={true}/>*/}
              {/*设置*/}
              <Line
                  style={{ marginBottom: 10 }}
                onPress={() => {
                  this.JumpPage(Router.COMMENT);
                }}
                icon={<Image
                  style={styles.iconImg}
                  resizeMode={'contain'}
                  source={Images.my.mineComment} />}
                border={true}
                text={'意见反馈'}
                arrow={true} />
              <Line
                onPress={() => {
                  this.JumpPage(Router.SETUP);
                }}
                icon={<Image
                  style={styles.iconImg}
                  resizeMode={'contain'}
                  source={Images.my.Setting} />}
                border={true}
                text={'设置'}
                arrow={true} />
            </View>

            {/*联系客服*/}
            <View style={styles.serviceBox}>
              <View style={styles.service}>
                <Image
                  style={styles.serviceImg}
                  source={ Images.my.ContactService } />
                <Touchable
                  onPress={() => {
                    this.setState({
                      cDialogVisible: true,
                    });
                  }}>
                  <Text style={styles.serviceText}>联系客服</Text>
                </Touchable>
              </View>
            </View>
          </View>
        </LayoutScroll>

        {/*客服弹框*/}
        {this.state.cDialogVisible && <CustomerDialog
          makeCall={() => {
            // ToastShow('调用拨打电话的功能');
            let tel = 'tel:13588322792';
            Linking.canOpenURL(tel).then((supported) => {
              if (!supported) {
              } else {
                return Linking.openURL(tel);
              }
            }).catch(error );

            this.setState({
              cDialogVisible: false,
            });
          }}
          onClose={() => {
            this.setState({
              cDialogVisible: false,
            });
          }} />}

        {/*未实名弹框*/}
        {this.state.bDialogVisible && <Dialog onClose={() => {
          this.setState({
            bDialogVisible: false,
          });
        }}>
          <View style={styles.authDialog}>
            <Image style={styles.aDialogImg} source={Images.my.NoAuthDialog} />
            <Text style={styles.aDialogTxt}>请进行实名认证</Text>
            <View style={styles.aDialogBtn}>
              <Touchable onPress={() => {
                this.setState({
                  bDialogVisible: false,
                });
              }} style={[styles.aBtnBox, styles.aBtnLeft]}>
                <Text style={[styles.aBtnBoxText, styles.aBtnLeftText]}>稍后再说</Text>
              </Touchable>
              <Touchable onPress={() => {
                // 去认证
                this.JumpPage(Router.AUTHNAME);

                this.setState({
                  bDialogVisible: false,
                });
              }} style={[styles.aBtnBox, styles.aBtnRight]}>
                <Text style={[styles.aBtnBoxText, styles.aBtnRightText]}>立即认证</Text>
              </Touchable>
            </View>
          </View>
        </Dialog>}

      </Layout>
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
  },
  icon: {
    width: 27,
    height: 27,
  },
  indexScroll: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 188,
  },
  avatar: {
    width: 72,
    height: 72,
    marginRight: 12,
    marginLeft: 16,
    borderRadius: 40,
  },
  verified: {
    width: 54.5,
    height: 18,
    marginTop: 3,
  },
  noverified: {
    width: 54.5,
    height: 18,
    marginTop: 3,
  },
  message: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 0,
  },
  myList: {
    flex: 1,
  },
  serviceBox: {
    flex: 1,
  },
  iconImg: {
    width: 24,
    height: 24,
    marginRight: 18
  },
  service: {

    width: 102,
    height: 32,
    borderRadius: 16.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#585F6D',
    alignSelf: 'center',
    marginTop: 30,
  },
  serviceImg: {
    width: 16,
    height: 16,
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#585F6D',
  },
  serviceLayerText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 240.5,
    height: 63,
    marginHorizontal: 20,
    marginBottom: 21.5,
    fontSize: 14,
    color: '#757575',
  },
  serviceButtonBg: {
    width: 227,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceButtonText: {
    justifyContent: 'center',
    lineHeight: 49,
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  alertborder: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 53,
    marginHorizontal: 16,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DDDDDD',
  },
  serviceBg: {
    width: 292.5,
    height: 103.5,
    justifyContent: 'center',
  },
  alter_button_right: {
    marginTop: 10.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alter_button_left: {
    width: 227,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },

  // 未认证弹框
  authDialog: {
    width: 293,
    height: 234.5,
    backgroundColor: '#fff',
    borderRadius: 2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },
  aDialogImg: {
    width: 100,
    height: 100,
  },
  aDialogTxt: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '600',
    marginVertical: 16,
  },
  aDialogBtn: {
    flexDirection: 'row',
    height: 39.5,
    width: 240,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aBtnBox: {
    width: 100.5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  aBtnBoxText: {
    fontSize: 15,
  },
  aBtnLeft: {
    borderColor: '#F64976',
    borderWidth: getPixel(1),
  },
  aBtnRight: {
    borderColor: '#F64976',
    backgroundColor: '#F64976',
    borderWidth: getPixel(1),
  },
  aBtnLeftText: {
    color: '#F64976',
  },
  aBtnRightText: {
    color: '#fff',
  },


});

export default connect(({ NSUser }) => ({ NSUser }))(MyScreen);
