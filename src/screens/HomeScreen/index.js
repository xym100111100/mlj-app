import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  Text,
  PermissionsAndroid
} from 'react-native';
import Contacts, { checkPermission } from 'react-native-contacts';
import { Layout, LayoutScroll } from '../../componments/index';
import { connect } from 'react-redux';
import Router from '../../Router';
import { Touchable } from '../../componments';

// 跳转组件
import { Navigation } from 'react-native-navigation';
import InputLayer from '../../container/InputLayer';
import HomeCard from '../../container/HomeCard';
import { ToastShow } from '../../utils/toast';
import { Images } from '../../common/images';
import { imgMode, height, width } from '../../utils/screen';
import AsyncStorage from '@react-native-community/async-storage';

// 弹窗
class HomeScreen extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      checkPermission: false,
      showModel: false,
      isAgree: false
    };
  }

  componentDidMount() {
    // 初始化首页基本信息
    this.initIndexInfo();
    // // 获取用户通讯录 
    this.initContantList();
    // 判断用户是否同意过协议
    this.initAgreement()
  }

  initAgreement() {
    AsyncStorage.getItem('isAgree', (error, result) => {
      if (!error) {
        if (!result) {
          this.setState({
            isAgree: false,
            showModel:true
          })
        }else{
          this.setState({
            isAgree: true,
            showModel:false
          })
        }
      } else {
      }
    });
  }


  onAgreement=()=> {
    AsyncStorage.setItem('isAgree', JSON.stringify({ isAgree: '已经同意过' }));
    this.setState({
      showModel: false,
      isAgree: true
    })
  }

  initContantList() {
    const { dispatch } = this.props;
    if (Platform.OS === 'ios') {


      Contacts.getAllWithoutPhotos((err, contacts) => {
        if (err === 'denied') {
          // throw err;
          ToastShow('需要获取通讯录权限后才可以使用');
          if (this.TimeOutCount != null) {
            clearTimeout(this.TimeOutCount);
          }
          this.TimeOutCount = setTimeout(() => {
            Linking.openURL('app-settings://')
          }, 2000);
          return false;
        } else {

          dispatch({
            type: 'SavaContacts',
            payload: {
              data: contacts,
            },
            callback: () => {
              // 设置用户是否可以在首页点击跳转到哪里去
              this.setState({
                checkPermission: true
              })

              // 上传到后台 
              let conArr = [];

              contacts.forEach((item, index) => {

                if (item.phoneNumbers[0] !== undefined) {
                  const phoneCell = (item.phoneNumbers[0]['number']).replace(/\s*/g, "");
                  let newArr = {
                    'contactsCell': phoneCell,
                    'contactsName': item.familyName ? item.familyName : '默认名'
                  };
                  conArr.push(newArr);
                }
              });
              // 更新本地缓存
              dispatch({
                type: 'InitContactAllList',
                payload: {
                  conArr
                },
                callback: (res) => {
                },
              });

            },
          });
        }
      });

    } else {

      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(res => {
        if (!res || res !== 'granted') {

          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            'title': '申请读取通讯录权限',
            'message': '该功能需要您的授权才能使用',
            'buttonPositive': '点击允许继续',
          })
            .then(res => {
              if (res !== 'granted') {
                ToastShow('需要获取通讯录权限后才可以使用');
                return false;
              } else {
                // 设置用户是否可以在首页点击跳转到哪里去
                this.setState({
                  checkPermission: true
                })

                Contacts.getCount((count) => {

                  AsyncStorage.getItem('contactsCount', (error, result) => {
                    if (!error) {
                      try {
                        if (!result || parseInt(count) > parseInt(JSON.parse(result).contacts)) {

                          this.updateUserPhotosAndroid()
                        } else {

                        }

                      } catch (e) {
                      }
                    } else {
                    }
                  });
                })
              }
            });
        }
      });

    }
  }



  updateUserPhotosAndroid() {
    const { dispatch } = this.props;
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err === 'denied') {
        ToastShow('需要获取通讯录权限后才可以使用');
        return false;
      } else {
        let conArr = [];

        contacts.forEach((item, index) => {
          let name = '默认名'
          name = item.familyName ? item.familyName : item.displayName
          if (item.phoneNumbers[0] !== undefined) {
            const phoneCell = (item.phoneNumbers[0]['number']).replace(/\s*/g, "");
            let newArr = {
              'contactsCell': phoneCell,
              'contactsName': name
            };
            conArr.push(newArr);
          }
        });

        dispatch({
          type: 'SavaContacts',
          payload: {
            data: contacts,
          },
          callback: () => {
            // 上传到后台
            let conArr = [];

            contacts.forEach((item, index) => {
              let name = '默认名'
              name = item.familyName ? item.familyName : item.displayName

              if (item.phoneNumbers[0] !== undefined) {
                const phoneCell = (item.phoneNumbers[0]['number']).replace(/\s*/g, "");
                let newArr = {
                  'contactsCell': phoneCell,
                  'contactsName': name
                };
                conArr.push(newArr);
              }
              // 更新本地缓存
              AsyncStorage.setItem('contactsCount', JSON.stringify({ contacts: conArr.length }));
            });
            dispatch({
              type: 'InitContactAllList',
              payload: {
                conArr
              },
              callback: (res) => {
              },
            });

          },
        });

      }
    });
  }



  // 初始化用户信息
  initUserInfo(callback) {
    const { dispatch } = this.props;
    dispatch({
      type: 'initClientInfo',
      payload: {},
      callback: () => {
        callback && callback();
      },
    });
  }

  // 绑定销售客户ID和取消
  bindServiceId(sid) {
    const self = this;
    if (!sid) {
      ToastShow('请输入正确的客服号');
      return false;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'initBindServiceInfo',
      payload: {
        salesmanId: sid,
      },
      callback: (res) => {
        if (res.code == 0) {
          ToastShow(res.data);
        }
        this.setState({
          visible: false,
        });
      },
    });

  }

  // 初始化首页信息
  initIndexInfo(callback) {
    const { dispatch } = this.props;
    dispatch({
      type: 'initIndexInfo',
      callback: () => {
        callback && callback();
      },
    });
  }

  // 下拉刷新
  async onRefresh(callback) {
    await this.initUserInfo();
    await this.initIndexInfo();
    callback();
  }


  // 按钮点击跳转逻辑
  HomeStatus() {
    if (!this.state.checkPermission) {
      this.initContantList()
      return
    }
    if (!this.state.isAgree) {
      this.setState({
        showModel: true
      })
      return
    }
    const { clientInfo } = this.props.NSIndex;
    const { userInfo } = this.props.NSUser;
    const { salesmanId } = userInfo;
    const { state, repay } = clientInfo;
    // 0 未实名
    // 1 实名中
    // 2 未授信【初审】
    // 3 授信中
    // 4 已授信
    if (salesmanId && salesmanId !== null) {
      switch (state) {
        // 未实名-去实名
        case 0:
        case 1:
          Navigation.push(this.props.componentId, {
            component: {
              name: Router.AUTH,
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
        // 已实名，不做任何操作
        case 2:
          Navigation.push(this.props.componentId, {
            component: {
              name: Router.LOAN,
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
        case 3:
          // 授信中
          break;
        case 4:
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
        case 5:
          // 授信中
          break;
        case 6:
          // 授信中
          break;
        case 7:
          // 这里判断是否有账单，如果有账单，就进入账单页面
          if (repay !== null) {
            // 账单页面
            Navigation.push(this.props.componentId, {
              component: {
                name: Router.BILL,
                options: {
                  bottomTabs: {
                    visible: false,
                    drawBehind: true,
                    animate: true,
                  },
                },
              },
            });
          } else {
            // 去借款页面 确认页面  当前状态是否需要判断已经提交过的状态
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
          }
          break;
      }
    } else {
      this.setState({
        visible: true,
      });
    }
  };


  openUrl = (urlk) => {
    this.setState({
      showModel: false
    })
    const urlList = [
      'http://res.nntest.jqtianxia.cn/client/privacy_documents/1280032950536245248/美丽金借款合同.html',
      'http://res.nntest.jqtianxia.cn/client/privacy_documents/1280032951731621888/美丽金用户隐私.html',
      'http://res.nntest.jqtianxia.cn/client/privacy_documents/1280032952075554816/美丽金服务费合同.html',
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
    const { clientInfo } = this.props.NSIndex;

    return (
      <Layout style={styles.index} showStatusBar={true}>
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
            {/*topBar*/}
            <View style={styles.topBar}>
              <Image style={styles.logo} source={Images.home.Logo} />
              {/* <Touchable onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: {
                    name: Router.AUTH,
                  },
                });
              }} style={styles.right}>
                <Image style={styles.rightIcon} source={Images.home.IconMsg} />
              </Touchable> */}
            </View>

            {/*banner*/}
            <View style={styles.banner}>
              <Image style={styles.bannerImg} resizeMode={imgMode} source={Images.home.Banner} />
            </View>

            {/*借款卡片*/}
            {clientInfo && <HomeCard
              callback={() => {
                this.HomeStatus();
              }}
              data={clientInfo} />}

          </View>
          <Modal
            visible={this.state.showModel}
            transparent={true}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.viewHeader} >
                    隐私政策更新
                  </Text>
                  <View  >
                    <Text style={styles.viewTitle} >尊敬的用户，您好</Text>
                  </View>

                  <Touchable
                    onPress={() => {
                      this.openUrl(2);
                    }
                    }
                  >
                    <Text style={styles.viewContent} >
                      为了加强对您个人信息的保护，根据最新法律法规要求，我们更新了隐私政策，请您仔细阅读并确认
                      <Text style={styles.linkText} >“隐私相关政策”</Text>
                      ，
                      我们将严格按照政策内容使用和保护您的个人信息，为您提供更好的而服务，感谢您的信任。
                    </Text>
                  </Touchable>
                  <View style={styles.viewButtom} >
                    <Touchable onPress={this.onAgreement
                    } style={styles.btnText} >
                      <Text style={styles.txt}  >同意，继续使用</Text>
                    </Touchable>
                  </View>
                </View>
              </View>
            </View>

          </Modal>
        </LayoutScroll>

        {/*    绑定销售弹框*/}
        {this.state.visible && <InputLayer
          callback={(value) => {
            this.bindServiceId(value);
          }}
          onClose={() => {
            this.setState({
              visible: false,
            });
          }}
        />}

      </Layout>
    );
  }

}

// 定义样式
const styles = StyleSheet.create({
  index: {
    flex: 1,
    position: 'relative',
  },
  indexScroll: {
    backgroundColor: '#f5f5f5',
  },
  // 页面布局
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // 顶部栏
  topBar: {
    flexDirection: 'row',
    height: 60,
    paddingLeft: 18,
    paddingRight: 12.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  logo: {
    width: 96,
    height: 24,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 25,
    height: 25,
  },

  // banner
  banner: {
    width,
    height: 214,
  },
  bannerImg: {
    width,
    height: 214,
    backgroundColor: 'yellow',
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#7b7b7b',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalView: {
    height: 290,
    width: 270,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingRight: 26,
    paddingLeft: 26,
    borderRadius: 4
  },
  viewHeader: {
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,

  },
  viewTitle: {
    paddingBottom: 10,
    color: "#999"
  },
  viewContent: {
    color: "#999"
  },
  linkText: {
    color: "#F64976",

  },
  viewButtom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

  },
  btnText: {
    borderRadius: 18,
    width: 216,
    height: 35,
    backgroundColor: '#F64976',
    alignItems: 'center',
    justifyContent: 'center',

  },
  txt: {
    color: 'white'
  }

});

export default connect(({ NSIndex, NSUser }) => ({ NSIndex, NSUser }))(HomeScreen);
