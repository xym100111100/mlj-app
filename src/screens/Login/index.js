import React, { Component, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';

import { ToastShow } from '../../utils/toast';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Storage from '../../utils/storage';
import Routers from '../../routers/main';
import { Btn, Layout, LayoutScroll, Touchable } from '../../componments';
import { navigationConfig } from '../../common/navigation';
import { getPixel } from '../../utils/screen';
import Router from '../../Router';
import { Images } from '../../common/images';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.TimeOutCount = null;
    this.state = {
      mobile: '',
      token: '',
      clear: false,
      verifyCode: '',
      canSendCode: true,
      checked: true,
      verifyTxt: '点击获取验证码',
      countdown: 60,
    };
  }


  componentDidMount() {
    // 初始化数据
  }

  // 获取验证码
  GetVerifyCode() {
    const { mobile } = this.state;
    if (!mobile) {
      ToastShow('请输入手机号码');
      return false;
    }
    if (!this.ValidMobile(mobile)) {
      ToastShow('请输入正确的手机号码');
      return false;
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'initLoginInfo',
      payload: {
        cell: mobile,
      },
      callback: (res) => {
        if (res.code == 0) {
          if(res.message == "同个号码超出发送次数！"){
            ToastShow(res.message);
          }else{
            ToastShow('验证码发送成功，请注意查收');
            this.countdown();
          }
        } else {
          ToastShow('验证码发送失败，请稍后重试');
        }
      },
    });
  }

  // 验证手机号
  ValidMobile(val) {
    return (/^1[3456789]\d{9}$/.test(val));
  }

  // 倒计时
  countdown() {
    let { countdown } = this.state;
    if (this.state.countdown === 1) {
      this.setState({
        verifyTxt: '点击获取验证码',
        canSendCode: true,
        countdown: 60,
      });
      return false;
    } else {
      this.setState({
        countdown: --countdown,
        canSendCode: false,
        verifyTxt: `${countdown}秒`,
      });
    }
    if (this.TimeOutCount != null) {
      clearTimeout(this.TimeOutCount);
    }
    this.TimeOutCount = setTimeout(() => {
      this.countdown();
    }, 1000);
  }

  // 登陆接口
  SignIn() {
    const { mobile, verifyCode } = this.state;
    if (!mobile) {
      ToastShow('请输入手机号码');
      return false;
    }
    if (!this.ValidMobile(mobile)) {
      ToastShow('请输入正确的手机号码');
      return false;
    }

    if (!verifyCode && verifyCode.length !== 4) {
      ToastShow('请输入正确的验证码');
      return false;
    }


    /*发送请求*/
    const { dispatch } = this.props;
    dispatch({
      type: 'initLoginSignInfo',
      payload: {
        cell: mobile,
        code: verifyCode,
      },
      callback: (res) => {
        if (res.code == 0) {
          const { token } = res.data;
          if (token === undefined) {
            ToastShow(res.message);
            return false;
          }
          Storage.setValue('token', token);
          Navigation.setRoot(Routers);
        } else {
          ToastShow('登陆失败，请重试');
        }
      },
    });
  }

  /* 协议webview*/
  JumpWebView(com) {
    Navigation.push(this.props.componentId, {
      component: {
        name: com,
      },
    });
  }

  openUrl = (urlk) => {
    const urlList = [
      "http://res.nntest.jqtianxia.cn/client/privacy_documents/1280032952075554816/注册协议.html",
      "http://res.nntest.jqtianxia.cn/client/privacy_documents/1280032951731621888/隐私用户授权协议.html",
      "http://res.nntest.jqtianxia.cn/client/privacy_documents/1280032950536245248/隐私权保护声明.html",
    ];
    const url = urlList[urlk];

    const { dispatch } = this.props;
    dispatch({
      type: 'selectPolicyUrl',
      payload: {
        url
      },
      callback: (res) => {
        Navigation.push(this.props.componentId, {
          component: {
            name: Router.WEB,
          },
        });
      },
    });
  }


  render() {
    const { verifyTxt, canSendCode } = this.state;
    return (
      <Layout>
        <View style={styles.page}>
          {/*logo*/}
          <Image style={styles.logoImg} source={ Images.login.Logo } />
          {/*表单*/}
          <View style={styles.form}>
            {/*表单内容*/}
            <View style={styles.formBox}>
              <View style={styles.input}>
                <View style={styles.inputInner}>
                  <TextInput
                    numberOfLines={1}
                    maxLength={11}
                    onChangeText={(e) => {
                      this.setState({
                        mobile: e,
                      });
                    }}
                    autoFocus={true}
                    keyboardType={'numeric'}
                    maxLength={11}
                    placeholderTextColor={'#BDBDBD'}
                    numberOfLines={1}
                    returnKeyType={'done'}
                    enablesReturnKeyAutomatically={true}
                    placeholder={'请输入手机号'}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={styles.input}>
                <View style={styles.inputInner}>
                  <TextInput
                    numberOfLines={1}
                    maxLength={6}
                    style={styles.textInput}
                    onChangeText={(e) => {
                      this.setState({
                        verifyCode: e,
                      });
                    }}
                    keyboardType={'numeric'}
                    placeholderTextColor={'#BDBDBD'}
                    numberOfLines={1}
                    returnKeyType={'done'}
                    enablesReturnKeyAutomatically={true}
                    placeholder={'请输入验证码'}
                  />
                </View>
                <Touchable onPress={() => {
                  if (canSendCode) {
                    this.GetVerifyCode();
                  }
                }} style={styles.verify}>
                  <Text style={styles.verifyTxt}>{verifyTxt}</Text>
                </Touchable>

              </View>
            </View>
            {/*登录按钮*/}
            <Btn style={styles.formBtn} onPress={() => {
              this.SignIn();
            }}>登录</Btn>
          </View>
          {/* 隐私协议 */}
          <Touchable style={styles.footer}>
            <View style={styles.fTop}>
              <Text style={styles.footerText}>我已阅读并同意</Text>
              <Text onPress={() => {
                this.openUrl(0);
                //  跳转到注册协议
              }} style={styles.footerLink}>《注册协议》</Text>
            </View>
            <Text onPress={() => {
              this.openUrl(1);
              //  跳转到隐私用户授权协议
            }} style={styles.footerLink}>《隐私用户授权协议》</Text>
            <Text onPress={() => {
              this.openUrl(2);
              //  跳转到隐私权保护申明
            }} style={styles.footerLink}>《隐私权保护申明》</Text>
          </Touchable>
        </View>
      </Layout>
    );
  }

}

// 定义标题
LoginScreen.options = navigationConfig('登录');

// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 27.5,
    paddingBottom: 20.5,

  },
  logoImg: {
    width: 63.5,
    height: 85,
    marginBottom: 36.5,
  },
  form: {
    flex: 1,
    paddingHorizontal: 50,
  },
  formBox: {
    marginBottom: 14.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: 274,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: getPixel(0.5),
    borderColor: '#ddd',
  },
  inputInner: {
    flex: 1,
  },
  textInput: {
    padding: 0,
    fontSize: 14,
    lineHeight: 17,
    color: '#212121',
  },
  verify: {
    width: 112.5,
    height: 36.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: getPixel(0.5),
    borderColor: '#ddd',
  },
  verifyTxt: {
    fontSize: 14,
    lineHeight: 20,
    color: '#f64976',
  },

  formBtn: {
    width: 274,
    height: 40,
    borderRadius: 20,
  },
  // 页面底部
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLink: {
    fontSize: 14,
    color: '#F47F94',
    lineHeight: 15.5,
  },
  footerText: {
    fontSize: 14,
    color: '#9e9e9e',
    lineHeight: 15.5,
  },

});


// export default   Login


export default connect((state) => (state))(LoginScreen);
