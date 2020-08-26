import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, Image, Linking, Platform } from 'react-native';

import { Heading1, Heading2, Heading3, Paragraph } from '../../widget/Text';
import axios from 'axios';
import { LayoutScroll, Touchable, Btn, Layout, Dialog } from '../../componments/index';
import IdcardDialog from '../../container/IdcardDialog';
import { getPixel } from '../../utils/screen';
import ImagePicker from 'react-native-image-crop-picker';


import DashSecondLine from '../../widget/DashSecondLine';

// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
import { Images } from '../../common/images';
//import ImagePicker from 'react-native-image-picker';
import { ToastShow } from '../../utils/toast';
import { navigationConfig } from '../../common/navigation';
import { API_ID, API_SECRET, Domain } from '../../common/config';
import Spinner from 'react-native-loading-spinner-overlay';
import { Navigation } from 'react-native-navigation';

const options = {
  title: null,
  mediaType: 'photo',
  cameraType: 'back',
  noData: true,
  quality: 1.0,
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseWhichLibraryTitle: '从图库选择',
  chooseFromLibraryButtonTitle: '选择图片',
  storageOptions: {
    skipBackup: true,
    waitUntilSaved: false,
    cameraRoll: true,
    path: '/',
  },
};

class AuthNameScreen extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      loadingVisible: false,
      loadingTxt: '开始上传',

      visible: false,

      source: null,
      suffix: '',
      imgType: '',
      fileName: '',
      imgUrl: '',
      imgPath: '',
      doNotOperate: false,
      bDialogVisible: false

    };
  }

  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      this.picketIdCardOcr2(image)

    });
  }


  openPicker() {
    ImagePicker.openPicker({
    }).then(image => {
   
      this.picketIdCardOcr2(image)
    });
  }

  picketIdCardOcr2(image) {

    let { path } = image;

    const i = path.lastIndexOf('/') + 1;
    const suffixIndex = path.lastIndexOf('.') + 1;
    const fileName = path.substring(i);
    const sub_suffix = path.substring(suffixIndex);

    const source = {
      uri: path,
      type: 'application/octet-stream',
      name: fileName,
    };

    this.setState({
      loadingVisible: true,
      loadingTxt: '开始上传识别...',
      suffix: sub_suffix,
      source,
    });

    // 获取OSS上传签名
    this.initOssSign();
  }


  // 选择图片 并ocr
  picketIdCardOcr() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        //  用户取消选择图片了
      } else if (response.error) {
        // 不给权限提示

        if (response.error.indexOf('Camera permissions not granted') > -1) {
          ToastShow('APP需要使用相册，请打开相册权限允许APP使用');
          if (Platform.OS === 'ios') {
            if (this.TimeOutCount != null) {
              clearTimeout(this.TimeOutCount);
            }
            this.TimeOutCount = setTimeout(() => {
              Linking.openURL('app-settings://')
            }, 2000);
          } else {
            if (this.TimeOutCount != null) {
              clearTimeout(this.TimeOutCount);
            }
            this.TimeOutCount = setTimeout(() => {
              NativeModules.OpenSettings.openNetworkSettings((data) => {
              });
            }, 2000);

          }

        }
        if (response.error.indexOf('Photo library permissions not granted') > -1) {
          ToastShow('APP需要使用相册，请打开相册权限允许APP使用');

          if (Platform.OS === 'ios') {
            if (this.TimeOutCount != null) {
              clearTimeout(this.TimeOutCount);
            }
            this.TimeOutCount = setTimeout(() => {
              Linking.openURL('app-settings://')
            }, 2000);
          } else {
            if (this.TimeOutCount != null) {
              clearTimeout(this.TimeOutCount);
            }
            this.TimeOutCount = setTimeout(() => {
              NativeModules.OpenSettings.openNetworkSettings((data) => {
              });
            }, 2000);

          }

        }
      } else if (response.customButton) {
        //  自定义按钮
      } else {
        let { fileName, uri, path, data } = response;
        let sub_suffix = '';
        if (!fileName) {
          const i = uri.lastIndexOf('/') + 1;
          const suffixIndex = uri.lastIndexOf('.') + 1;
          fileName = uri.substring(i);
          sub_suffix = uri.substring(suffixIndex);
        } else {
          sub_suffix = this.get_suffix(fileName);
        }


        const source = {
          uri: response.uri,// uri => path
          type: 'application/octet-stream',
          name: fileName,
        };

        this.setState({
          loadingVisible: true,
          loadingTxt: '开始上传识别...',
          suffix: sub_suffix,
          source,
        });

        // 获取OSS上传签名
        this.initOssSign();
      }
    });
  }

  // 获取OSS文件上传签名
  initOssSign() {
    const { dispatch } = this.props;
    const { imgType, suffix } = this.state;
    dispatch({
      type: 'GetOssSignAuthName',
      payload: {
        show: true,
        fileNumber: 1,
        fileType: imgType,
        suffix,
      },
      callback: (res) => {
        this.UploadImg(res.data);
      },
    });
  }

  // 上传图片到OSS
  UploadImg(data) {
    const { source } = this.state;
    const { host, accessId, dir, policy, signature, callback, fileName } = data;

    const data_params = new FormData();
    data_params.append('key', dir + fileName);
    data_params.append('policy', policy);
    data_params.append('OSSAccessKeyId', accessId);
    data_params.append('success_action_status', '200');
    data_params.append('callback', callback);
    data_params.append('Signature', signature);
    data_params.append('file', source, fileName);



    /*上传到OSS*/
    axios({
      url: host,
      method: 'post',
      data: data_params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 200) {
        const path = `${dir}${fileName}`;
        const url = `${Domain}/${path}?x-oss-process=style/shuiyin`;
        // 图片上传到OSS的路径
        this.setState({
          fileName,
          imgPath: path,
          imgUrl: url,
        });

        // 调用OCR识别
        this.GetOcrUserInfo();
      }
    }).catch(e => {
      this.setState({
        loadingVisible: false,
      });
      ToastShow('图片上传失败，请稍后重试');
    });
  }


  // 获取图片类型
  get_suffix(filename) {
    return (filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)).toLowerCase();
  }

  // 识别ocr接口
  GetOcrUserInfo() {

    const { imgUrl, imgPath, imgType } = this.state;

    const params = {
      api_id: API_ID,
      api_secret: API_SECRET,
      url: imgUrl,
    };


    axios({
      url: 'https://cloudapi.linkface.cn/ocr/idcard',
      method: 'post',
      data: params,
    }).then(res => {
      this.setState({
        loadingVisible: false,
      });
      // ToastShow('提示文字');
      if (res.status == 200) {
        const { info, validity } = res.data;
        let cameraType;
        if (imgType === 'idcard_front') {
          const { name, sex, birthday, address, number } = validity;
          cameraType = 1;
          if (name && birthday && sex && address && number) {
            this.updateAuthNameInfo(cameraType, info);
            ToastShow('正面照上传识别成功');
          } else {
            ToastShow('请上传正确的身份证正面照');
          }

        } else if (imgType === 'idcard_back') {
          const { authority, timelimit } = validity;
          cameraType = 0;
          if (authority && timelimit) {
            this.updateAuthNameInfo(cameraType, info);
            ToastShow('反面照上传识别成功');
          } else {
            ToastShow('请上传正确的身份证反面照');
          }
          this.updateAuthNameInfo(cameraType, info);
        }
      } else {
        ToastShow('身份证无法识别，请重新上传');
      }
    }).catch(e => {
      this.setState({
        loadingVisible: false,
      });
      ToastShow('服务器开小差了~，请稍后再试');
    });

  }

  // 更新信息
  updateAuthNameInfo(cameraType, info) {
    const { dispatch } = this.props;
    const { imgUrl, imgPath } = this.state;
    // 更新实名的身份证信息
    dispatch({
      type: 'UpdateOcrUserInfo',
      payload: {
        userInfo: info,
        cameraType,
      },
    });

    // 更新 展示的图片信息
    dispatch({
      type: 'UpdateIdCardUrl',
      payload: {
        cameraUrl: imgUrl,
        clientUrl: imgPath,
        cameraType,
      },
    });

  }

  // 提交确认信息
  submitIdCardInfo = () => {
    if (this.state.doNotOperate) {
      ToastShow('操作过于频繁，请稍后再试', 10);
      return
    }
    this.setState({
      doNotOperate: true
    })
    window.doNotOperateTimeOut = setTimeout(() => {
      this.setState({
        doNotOperate: false
      })
    }, 5000);

    const { dispatch } = this.props;
    const { frontUserInfo, backUserInfo } = this.props.AUTHNAMEIndex;
    const { sex } = frontUserInfo;
    const overdueDate = backUserInfo.timelimit;
    // 判断照片是否识别成功
    if (sex === undefined) {
      ToastShow('身份证信息前面未识别');
      return false;
    }

    if (overdueDate === undefined) {
      ToastShow('身份证信息后面未识别');
      return false;
    }

    const cardArr = overdueDate.split('-');
    let sexBool = null;
    if (sex == '女') {
      sexBool = 2;
    } else if (sex == '男') {
      sexBool = 1;
    } else {
      sexBool = 0;
    }
    let payload = {
      // payload 里面是请求携带的参数
      certNo: this.props.AUTHNAMEIndex.frontUserInfo.number,
      certType: 1,
      clientName: this.props.AUTHNAMEIndex.frontUserInfo.name,
      idCardAddress: this.props.AUTHNAMEIndex.frontUserInfo.address,
      idPhotoConUrl: this.props.AUTHNAMEIndex.idClientBackUrl,
      idPhotoFrontUrl: this.props.AUTHNAMEIndex.idClientFrontUrl,
      issuedBy: this.props.AUTHNAMEIndex.backUserInfo.authority,
      overdueDate: cardArr[0],
      race: this.props.AUTHNAMEIndex.frontUserInfo.nation,
      sex: sexBool,
      validDate: cardArr[1],
    }
    dispatch({
      type: 'SubmitAuthName',
      payload: payload,
      callback: (res) => {

        const msg = res.data;

        //  window.TimeOut = setTimeout((function () {
        ToastShow(msg);
        //  }), 500);

        setTimeout(() => {
          Navigation.pop(this.props.componentId);
        }, 500);
      },
    });
  }

  componentWillUnmount(): void {
    if (window.TimeOut) {
      clearTimeout(window.TimeOut);

    }
    if (window.doNotOperateTimeOut) {
      clearTimeout(window.doNotOperateTimeOut);
    }
  }

  // 信息确认弹框
  showDialog() {

    // 判断如果没有选择照片，不要弹框
    const { idBackUrl, idFrontUrl } = this.props.AUTHNAMEIndex;

    if (!idFrontUrl) {
      ToastShow('请上传身份证正面');
      return false;
    }
    if (!idBackUrl) {
      ToastShow('请上传身份证反面');
      return false;
    }
    this.setState({
      visible: true,
    });
  }

  render() {
    const { idBackUrl, idFrontUrl } = this.props.AUTHNAMEIndex;
    const baseFrontUrl = { uri: idFrontUrl };
    const baseBackUrl = { uri: idBackUrl };
    const oColor = 'rgba(0,0,0,0.45)';

    return (
      <Layout showStatusBar={false} style={styles.page}>
        <Spinner
          visible={this.state.loadingVisible}
          overlayColor={oColor}
          textContent={this.state.loadingTxt}
          size={'large'}
          textStyle={{
            color: '#fff',
            fontSize: 14,
          }}
        />
        <LayoutScroll style={styles.content}>
          <View style={styles.container_change}>

            <View style={styles.service}>
              <Heading3>请上传您的身份证正反面照片</Heading3>
            </View>

            <View>
              <Touchable onPress={() => {
                this.setState({
                  imgType: 'idcard_front',
                  bDialogVisible: true
                });

              }}>
                <Image style={styles.bankImg}
                  source={idFrontUrl !== '' ? baseFrontUrl : Images.authname.Idfront
                  } />


                <Heading3 style={styles.authNameText}>身份证正面</Heading3>
              </Touchable>
            </View>

            <Touchable
              onPress={() => {
                this.setState({
                  imgType: 'idcard_back',
                  bDialogVisible: true
                });

              }}
              style={styles.idFront}>
              <Image style={styles.bankImg}
                source={idBackUrl !== '' ? baseBackUrl : Images.authname.Idreverse
                } />

              <Heading3 style={styles.authNameText}>身份证反面</Heading3>

            </Touchable>

            <View style={styles.pages_photo_top}>
              <View style={styles.pages_row}>
                <View style={styles.photoTypeLine}>
                  <DashSecondLine style={styles.pages_row_dash} lineWidth={0.5} dashStyle={'solid'} />
                </View>
                <Heading3 style={styles.pages_row_photo_type}>拍摄照片要求</Heading3>
                <View style={styles.pages_row_dash_second}>
                  <DashSecondLine style={styles.pages_row_dash} lineWidth={0.5} dashStyle={'solid'} />
                </View>
              </View>

              <View style={styles.photoType}>
                <View style={styles.photoType_width}>
                  <Image style={styles.scanImg} source={Images.authname.Normal} />
                  <View style={styles.scanRight}>
                    <Image style={styles.rightIcon} source={Images.authname.RightIcon} />
                    <Heading3 style={styles.scanText}>标准拍摄</Heading3>
                  </View>
                </View>

                <View style={styles.photoType_width_border}>
                  <Image style={styles.scanImg} source={Images.authname.BorderMiss} />
                  <View style={styles.scanRight}>
                    <Image style={styles.rightIcon} source={Images.authname.WrongIcon} />
                    <Heading3 style={styles.scanText}>边框缺失</Heading3>
                  </View>
                </View>

                <View style={styles.photoType_width_margin}>
                  <Image style={styles.scanImg} source={Images.authname.PhotoBlurry} />
                  <View style={styles.scanRight}>
                    <Image style={styles.rightIcon} source={Images.authname.WrongIcon} />
                    <Heading3 style={styles.scanText}>照片模糊</Heading3>
                  </View>
                </View>

                <View style={styles.photoType_width}>
                  <Image style={styles.scanImg} source={Images.authname.StrongFlash} />
                  <View style={styles.scanRight}>
                    <Image style={styles.rightIcon} source={Images.authname.WrongIcon} />
                    <Heading3 style={styles.scanText}>闪光强烈</Heading3>
                  </View>
                </View>
              </View>
            </View>

          </View>


        </LayoutScroll>
        <Btn style={styles.bottoms} onPress={() => {
          this.showDialog();

        }}>认证</Btn>

        {/*  身份证信息确认弹窗  */}
        {this.state.visible && <IdcardDialog
          callback={(value) => {
            this.submitIdCardInfo();
          }}
          data={this.props.AUTHNAMEIndex}
          onClose={() => {
            this.setState({
              visible: false,
            });
          }}
        />}

        {/*选择上传图片弹窗*/}
        {this.state.bDialogVisible && <Dialog onClose={() => {
          this.setState({
            bDialogVisible: false,
          });
        }}>
          <View style={styles.authDialog}>
            <Image style={styles.aDialogImg} source={Images.my.NoAuthDialog} />
            <Text style={styles.aDialogTxt}>请选择上传方式</Text>
            <View style={styles.aDialogBtn}>
              <Touchable onPress={() => {
                this.setState({
                  bDialogVisible: false,
                });
                this.openPicker()
              }} style={[styles.aBtnBox, styles.aBtnLeft]}>
                <Text style={[styles.aBtnBoxText, styles.aBtnLeftText]}>图库</Text>
              </Touchable>
              <Touchable onPress={() => {
                this.setState({
                  bDialogVisible: false,
                });
                this.openCamera()
              }} style={[styles.aBtnBox, styles.aBtnRight]}>
                <Text style={[styles.aBtnBoxText, styles.aBtnRightText]}>相机 </Text>
              </Touchable>
            </View>
          </View>
        </Dialog>}
      </Layout>
    );
  }

}


AuthNameScreen.options = navigationConfig('实名认证');

// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container_change: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  message: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 0,
  },
  login: {
    width: 343,
    height: 49,
    position: 'absolute',
    bottom: 16,
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
  bankImg: {
    width: 260,
    height: 164,
    justifyContent: 'center',
  },
  authNameText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  idFront: {
    marginTop: 12,
  },
  pages_photo_top: {
    marginTop: 16,
    flex: 1,
  },
  pages_row: {
    flexDirection: 'row',
  },
  pages_row_dash: {
    flex: 1,
    marginRight: 12.5,
  },
  pages_row_photo_type: {
    fontSize: 15,
    color: '#858585',
  },
  pages_row_dash_second: {
    flexDirection: 'row',
    opacity: 0.1,
    width: 142.5,
    marginTop: 6,
  },
  photoType_width: {
    width: 73.5,
  },
  photoType_width_margin: {
    width: 73.5,
    marginRight: 16,
  },
  photoType_width_border: {
    width: 73.5,
    marginLeft: 16,
    marginRight: 17,
  },
  service: {
    width: 195.5,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  serviceText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
  },
  scanRight: {
    flexDirection: 'row',
    marginTop: 5,
  },
  scanImg: {
    width: 73.5,
    height: 52.5,
  },
  rightIcon: {
    width: 15,
    height: 15,
  },
  scanText: {
    fontSize: 12,
    width: 48,
    height: 16.5,
    color: '#858585',
    marginLeft: 10,
  },
  contract_close: {
    height: 60,
    alignContent: 'center',
    alignItems: 'center',
  },
  contract_close_text: {
    alignSelf: 'center',
    color: '#757575',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 60,
  },
  alert_content_qx: {
    flexDirection: 'row',
    marginHorizontal: 16,
    height: 60,
    alignItems: 'center',
  },
  alert_content_text: {
    flexDirection: 'row',
    fontSize: 17,
    color: '#212121',
    position: 'absolute',
    right: 0,
    fontWeight: 'bold',
  },
  closeImg: {
    width: 24,
    height: 24,
    right: 16,
    top: 18,
    position: 'absolute',
    alignContent: 'center',
    alignItems: 'center',
  },
  front_reverse_left: {
    width: 154.5,
    height: 97.5,
    marginRight: 34,
  },
  front_reverse: {
    width: 154.5,
    height: 97.5,
  },
  photoType: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoTypeLine: {
    flexDirection: 'row',
    opacity: 0.1,
    width: 142.5,
    marginTop: 6,
  },


  // 选择上传图片方式弹窗样式
  //-----------
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
//-----------

});

export default connect(({ AUTHNAMEIndex }) => ({ AUTHNAMEIndex }))(AuthNameScreen);

// const a = {
//   'message': 'Request failed with status code 400',
//   'name': 'Error',
//   'stack': 'Error: Request failed with status code 400\n    at createError (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:114964:17)\n    at settle (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:114954:14)\n    at EventTarget.handleLoad (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:114852:9)\n    at EventTarget.dispatchEvent (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:34958:27)\n    at EventTarget.setReadyState (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:34027:14)\n    at EventTarget.__didCompleteResponse (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:33869:16)\n    at http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:33979:47\n    at RCTDeviceEventEmitter.emit (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:8393:37)\n    at MessageQueue.__callFunction (http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:4164:44)\n    at http://192.168.2.39:8081/index.bundle?platform=ios&dev=true&minify=false:3886:17',
//   'config': {
//     'url': 'https://cloudapi.linkface.cn/ocr/idcard',
//     'method': 'post',
//     'data': {
//       '_parts': [['api_id', '29f077a77cd74254b78992075a339183'], ['api_secret', 'ee50a38fe2394b728ee4dc608f5254b8'], ['file', {
//         'uri': 'file:///var/mobile/Containers/Data/Application/22B73DCE-1C4D-4839-8D17-EA44B8F92F00/Documents/7EACD1E0-5107-4E8E-95FA-4D4015700698.jpg',
//         'type': 'application/octet-stream',
//         'name': '7EACD1E0-5107-4E8E-95FA-4D4015700698.jpg',
//       }]],
//     },
//     'headers': {'Accept': 'application/json, text/plain, */*'},
//     'transformRequest': [null],
//     'transformResponse': [null],
//     'timeout': 0,
//     'xsrfCookieName': 'XSRF-TOKEN',
//     'xsrfHeaderName': 'X-XSRF-TOKEN',
//     'maxContentLength': -1,
//   },
// };
