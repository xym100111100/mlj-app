import React, { Component } from 'react';
import { View, Text, Button, Platform, TextInput, Dimensions,StyleSheet, Image,Animated,TouchableOpacity, PermissionsAndroid, FlatList, Linking } from 'react-native';
import { screen, system } from '../../utils/common';
import { Heading2, Heading3 } from '../../widget/Text';

import { Btn, Layout, LayoutScroll, Line, Touchable, ListItem, Avatar } from '../../componments';
import { navigationConfig } from '../../common/navigation';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import Picker from 'ht-react-native-picker';
import { connect } from 'react-redux';
import Router from '../../Router';
import { getPixel } from '../../utils/screen';
import { ToastShow } from '../../utils/toast';
import { Images } from '../../common/images';
// 通讯录
import DeviceInfo from 'react-native-device-info';
import Contacts from 'react-native-contacts';
import TextInputWidget from '../../widget/TextInputWidget';
import { leftShift, cos } from 'mathjs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { NativeModules } from 'react-native'
const { width, height } = Dimensions.get("window");

class BasicScreen extends Component<Props, State> {

  constructor(props: Object) {
    super(props);
    this.state = {
      showModel:false,
      contactType:1,
      schoolListText: '',
      selectMarry: '',
      selectMoney: '',
      bankTypeSelectText: '',
      wechatQq: '请输入QQ/微信账号',
      selectContact: '',
      selectContactTwo: '',
      StudentStatus: false,
    };
  }


  componentDidMount() {
    this.initSchoolList();
   

  }


  
 


  onPressContact(contact) {

    const phoneCell = (contact.phoneNumbers[0]['number']).replace(/\s*/g, "");

    const { contactsInfoList,contactsTwoInfoList } = this.props.NSBasic;
    const { contactsStatus } = this.props.NSBasic;


    if (this.state.contactType === 1 && phoneCell == contactsTwoInfoList.contactsCell) {
      ToastShow('不能选择重复的号码');
      return false;
    }

    if (this.state.contactType === 2 && phoneCell == contactsInfoList.contactsCell) {
      ToastShow('不能选择重复的号码');
      return false;
    }
     
    let name = '未知...'
    name =  contact.familyName?contact.familyName:contact.displayName

    var newPerson = {
      contactsCell: phoneCell,
      contactsName: name.length>4?name.substring(0,4)+'...':name,
      kinship: '',
    }
    //修改当前已经选择的用户
    const { dispatch } = this.props;
    // 触发不同的通讯录
    let disType = '';
    if (this.state.contactType === 1) {
      disType = 'SavaContactInfoList';
    } else {
      disType = 'SavaContactTwoInfoList';
    }
    dispatch({
      type: disType,
      payload: {
        data: newPerson,
      },
      callback: () => {
          this.setState({
            showModel:false
          })
      },
    });


  }


  
  renderItem(data) {

    return data.item.displayName? (
      <TouchableOpacity
         onPress={() => this.onPressContact(data.item)}
      >
         <View style={styles.listItem} >
             <View style={styles.itemLeft} >
                  <Text style={styles.leftText}  >{data.item.displayName.substring(0,1)}</Text>
             </View>
             <View  style={styles.itemRight} >
                 <Text style={styles.rightText} >{data.item.displayName}</Text>
             </View>
         </View>
         </TouchableOpacity>
    ):null
 }

  

  // 用户返回时 清除当前页所有的弹窗
  componentWillUnmount() {
    Picker.hide();
  }





  // 获取学历
  initSchoolList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'InitGetAllEducation',
      payload: {},
    });
  }

  // 初始化学历

  GetSchoolList() {

    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '学历列表',
      pickerCancelBtnColor: [187, 187, 187, 1],
      pickerConfirmBtnColor: [246, 73, 118, 1],
      pickerData: this.industryData(),
      selectedValue: ['大专'],
      onPickerConfirm: pickedValue => {
        // this.setState({
        //   schoolListText: pickedValue,
        // });

        const { dispatch } = this.props;
        dispatch({
          type: 'updateSchoolSelectList',
          payload: {
            pickedValue,
          },
        });
      },
      onPickerSelect: pickedValue => {
        this.setState({
          schoolListText: pickedValue,
        });
      },
    });
    Picker.show();

  }


  // 收入下拉框
  selectMoney() {
    const data = ['3000以下','3000到8000','8000到12000','12000以上'];
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '收入列表',
      pickerCancelBtnColor: [187, 187, 187, 1],
      pickerConfirmBtnColor: [246, 73, 118, 1],
      pickerData: data,
      selectedValue: ['3000以下'],
      onPickerConfirm: pickedValue => {
        // this.setState({
        //   selectMoney: pickedValue,
        // });
        // 修改reduicer 
        const { dispatch } = this.props;
        dispatch({
          type: 'updateMoneySelectList',
          payload: {
            pickedValue,
          },
        });
      },
      onPickerSelect: pickedValue => {
        this.setState({
          selectMoney: pickedValue,
        });
      },
    });
    Picker.show();
  }

  // 婚姻下拉框

  selectMarry() {
    const data = [ '未婚','已婚无子女','已婚有子女','离异','丧偶'];
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '婚姻列表',
      pickerCancelBtnColor: [187, 187, 187, 1],
      pickerConfirmBtnColor: [246, 73, 118, 1],
      pickerData: data,
      selectedValue: ['未婚'],
      onPickerConfirm: pickedValue => {
        // this.setState({
        //   selectMarry: pickedValue,
        // });
        const { dispatch } = this.props;
        dispatch({
          type: 'updateMarrySelectList',
          payload: {
            pickedValue,
          },
        });
      },
      onPickerSelect: pickedValue => {
        this.setState({
          selectMarry: pickedValue,
        });
      },
    });
    Picker.show();
  }

  // 关系1

  selectContact() {
    const data = ['朋友', '亲人', '兄弟'];
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '关系列表',
      pickerCancelBtnColor: [187, 187, 187, 1],
      pickerConfirmBtnColor: [246, 73, 118, 1],
      pickerData: data,
      selectedValue: ['朋友'],
      onPickerConfirm: pickedValue => {
        // this.setState({
        //   selectContact: pickedValue,
        // });
        const { dispatch } = this.props;
        dispatch({
          type: 'updateContactSelectList',
          payload: {
            pickedValue,
          },
        });
      },
      onPickerSelect: pickedValue => {
        this.setState({
          selectContact: pickedValue,
        });
      },
    });
    Picker.show();
  }

  // 关系2

  selectContactTwo() {
    const data = ['朋友2', '亲人2', '兄弟2'];
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '关系列表',
      pickerCancelBtnColor: [187, 187, 187, 1],
      pickerConfirmBtnColor: [246, 73, 118, 1],
      pickerData: data,
      selectedValue: ['朋友2'],
      onPickerConfirm: pickedValue => {
        // this.setState({
        //   selectContactTwo: pickedValue,
        // });
        const { dispatch } = this.props;
        dispatch({
          type: 'updateContactTwoSelectList',
          payload: {
            pickedValue,
          },
        });
      },
      onPickerSelect: pickedValue => {
        // this.setState({
        //   selectContactTwo: pickedValue,
        // });
        const { dispatch } = this.props;
        dispatch({
          type: 'updateContactTwoSelectList',
          payload: {
            pickedValue,
          },
        });
      },
    });
    Picker.show();
  }

  // 修改qq 微信

  updateWechatQq(pickedValue) {
    const { dispatch } = this.props;
    dispatch({
      type: 'updateWechatqqSelectList',
      payload: {
        pickedValue,
      },
    });
  }

  // 添加客户基本信息 submitBasic
  submitBasic() {
    const { bankTypeSelectText, StudentStatus } = this.state;

    const { schoolSelectList, moneySelectList, MarrySelectList, contactSelectList, contactTwoSelectList, wechatqqSelectList } = this.props.NSBasic;

    const { dispatch } = this.props;

    if (!StudentStatus) {
      ToastShow('请确认您不是学生');
      return;
    }
    // 判断当前是否有空值
    let statusText = '';
    // 学历不能为空
    if (!schoolSelectList[0]) {
      statusText = '学历不能为空';
      ToastShow(statusText);
      return false;
    }
    // 收入不能为空
    if (!moneySelectList[0]) {
      statusText = '收入不能为空';
      ToastShow(statusText);
      return false;
    }

    // 婚姻状态不能为空
    if (!MarrySelectList[0]) {
      statusText = '婚姻状态不能为空';
      ToastShow(statusText);
      return false;
    }

    if (!contactSelectList[0]) {
      statusText = '请选择与您的关系1';
      ToastShow(statusText);
      return false;
    }

    if (!contactTwoSelectList[0]) {
      statusText = '请选择与您的关系2';
      ToastShow(statusText);
      return false;
    }

    // 通讯录数据1

    const { contactsInfoList, contactsTwoInfoList } = this.props.NSBasic;
    if (Array.isArray(contactsInfoList) && contactsInfoList.length === 0) {
      ToastShow('请选择常用联系人1');
      return false;
    }

    if (Array.isArray(contactsTwoInfoList) && contactsTwoInfoList.length === 0) {
      ToastShow('请选择常用联系人2');
      return false;
    }

    const data = [
      {
        'contactsCell': contactsInfoList.contactsCell,
        'contactsName': contactsInfoList.contactsName,
        'kinship': contactSelectList[0] !== undefined ? contactSelectList[0] : '朋友',
      },
    ];
    // 通讯录数据2 

    const selectContactData = {
      'contactsCell': contactsTwoInfoList.contactsCell,
      'contactsName': contactsTwoInfoList.contactsName,
      'kinship': contactTwoSelectList[0] !== undefined ? contactTwoSelectList[0] : '兄弟',
    }

    data.push(selectContactData);


    // 取当前学历的下标
    const data_school = this.industryData();
    const ecode = data_school.indexOf(schoolSelectList[0]) ? data_school.indexOf(schoolSelectList[0]) : 1;
    let mcode = 0;
    // 婚姻状态
    if (MarrySelectList[0] == '已婚无子女') {
       mcode = 0;
    } else if(MarrySelectList[1] == '已婚有子女') {
        mcode = 1;
    }else if(MarrySelectList[2] == '未婚') {
        mcode = 2;
    }else if(MarrySelectList[3] == '离异') {
        mcode = 3;
    }else if(MarrySelectList[4] == '丧偶') {
      mcode = 4;
    }

    dispatch({
      type: 'SubmitUserInfo',
      payload: {
        educationCode: ecode,
        familyMonthlyIncome: moneySelectList[0],
        maritalCode: mcode,
        wechatNo: wechatqqSelectList[0],
        clientContacts: data,
      },
      callback: (res) => {
        // 返回上一页
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

  // 获取学历列表
  industryData() {
    const { schoolList } = this.props.NSBasic;
    let data = [];
    let len = schoolList.length;
    for (let i = 0; i < len; i++) {
      data[i] = schoolList[i]['educationName'];
    }
    return data;
  }

  render() {
  
  
    const { wechatQq, StudentStatus } = this.state;
    const { contacts } = this.props.NSBasic;

    const { contactsInfoList, contactsTwoInfoList, schoolSelectList, moneySelectList, MarrySelectList, contactSelectList, contactTwoSelectList, wechatqqSelectList } = this.props.NSBasic;

    return this.state.showModel? (
     
        <View style={styles.pages_bg} >
            <FlatList
              data={contacts} 
              renderItem={data => this.renderItem(data)} 
              keyExtractor={item => '' + item.recordID}
              onEndReachedThreshold={0.5}
              onLayout={e => this.fHeight = e.nativeEvent.layout.height}
          />
        </View>
   
    ):   
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
      >
        <LayoutScroll style={styles.pages}>
          <Touchable onPress={() => {
            Picker.hide();
          }}>
            <View style={styles.container_bank}>

              {/* 学历 */}
              <Line
                style={styles.message_code}
                onPress={this.GetSchoolList.bind(this)}
                rightStyle={styles.rightStyle}
                textStyle={styles.label}
                extraStyle={[styles.extraLabel, schoolSelectList !== undefined && schoolSelectList.length > 0 && { color: '#212121' }]}
                text={'学历'}
                arrow={true}
                extra={schoolSelectList !== undefined && schoolSelectList.length > 0 ? schoolSelectList[0] : '请选择学历'}
              />

              {/* 收入 */}

              <Line
                style={styles.message_code}
                onPress={this.selectMoney.bind(this)}
                rightStyle={styles.rightStyle}
                textStyle={styles.label}
                extraStyle={[styles.extraLabel, moneySelectList !== undefined && moneySelectList.length > 0 && { color: '#212121' }]}
                text={'收入'}
                arrow={true}
                extra={moneySelectList !== undefined && moneySelectList.length > 0 ? moneySelectList[0] : '请选择收入'}
              />
              {/* 婚姻状态 */}

              <Line
                style={styles.message_code}
                onPress={this.selectMarry.bind(this)}
                rightStyle={styles.rightStyle}
                textStyle={styles.label}
                extraStyle={[styles.extraLabel, MarrySelectList !== undefined && MarrySelectList.length > 0 && { color: '#212121' }]}
                text={'婚姻状况'}
                arrow={true}
                extra={MarrySelectList !== undefined && MarrySelectList.length > 0 ? MarrySelectList[0] : '请选择婚姻状况'}
              />

              <TextInputWidget
                title='QQ/微信'
                placeholder={wechatqqSelectList !== undefined && wechatqqSelectList.length > 0 ? wechatqqSelectList : '请输入微信或qq'}
                underlineColorAndroid={'transparent'}
                // clearTextOnFocus={true}
                returnKeyType={'done'}
                callback={(v) => {
                  this.updateWechatQq(v);
                }}
              />
            </View>

            {/* 联系人 */}
            <View style={styles.container_bank}>
              <View style={styles.message_code}>
                <Heading2 style={styles.contact_text}>常用联系人</Heading2>

                <Touchable
                  onPress={() => {
                      this.setState({
                        showModel:true,
                        contactType:1
                      } )
                  }}
                  style={styles.contact_user_right}
                >
                  <Heading2 style={styles.contact_user}> {contactsInfoList.contactsName !== undefined ? contactsInfoList.contactsName + '(' + contactsInfoList.contactsCell + ')' : '通讯录'}</Heading2>

                  <Image style={styles.addImg} source={contactsInfoList.contactsName !== undefined ? Images.public.RightIcon : Images.public.addContact} />
                </Touchable>
              </View>
              {/* 联系人关系1 */}
              <Line
                style={styles.message_code}
                onPress={this.selectContact.bind(this)}
                rightStyle={styles.rightStyle}
                textStyle={styles.label}
                extraStyle={[styles.extraLabel, contactSelectList !== undefined && contactSelectList.length > 0 && { color: '#212121' }]}
                text={'与您的关系1'}
                arrow={true}
                extra={contactSelectList !== undefined && contactSelectList.length > 0 ? contactSelectList[0] : '请选择与您的关系'}
              />

              <View style={styles.message_code}>
                <Heading2 style={styles.contact_text}>常用联系人2</Heading2>
                <Touchable
                  onPress={() => {
                    this.setState({
                      showModel:true,
                      contactType:2
                    } );
                  }}
                  style={styles.contact_user_right}
                >
                  <Image style={styles.addImg} source={contactsTwoInfoList.contactsName !== undefined ? Images.public.RightIcon : Images.public.addContact} />
                  <Heading2 style={styles.contact_user}>{contactsTwoInfoList.contactsName !== undefined ? contactsTwoInfoList.contactsName + '(' + contactsTwoInfoList.contactsCell + ')' : '通讯录'}</Heading2>
                </Touchable>
              </View>

              {/* 与您的关系2 */}

              <Line
                style={styles.message_code}
                onPress={this.selectContactTwo.bind(this)}
                rightStyle={styles.rightStyle}
                textStyle={styles.label}
                extraStyle={[styles.extraLabel, contactTwoSelectList !== undefined && contactTwoSelectList.length > 0 && { color: '#212121' }]}
                text={'与您的关系2'}
                arrow={true}
                extra={contactTwoSelectList !== undefined && contactTwoSelectList.length > 0 ? contactTwoSelectList[0] : '请选择与您的关系'}
              />

            </View>


            {/* 提交&声明 */}
            <View style={styles.service}>

              <Btn style={styles.serviceText} onPress={() => {
                this.submitBasic();
              }}>同意协议并提交</Btn>

              <Touchable onPress={() => {
                if (this.state.StudentStatus) {
                  this.setState({
                    StudentStatus: false,
                  });
                } else {
                  this.setState({
                    StudentStatus: true,
                  });
                }

              }} style={styles.auth_bottom}>
                <Image style={styles.safeImg} source={StudentStatus ? Images.public.success : Images.public.Sicon} />
                <Heading3 style={styles.safeText}>我不是学生</Heading3>
                {/* </View> */}
              </Touchable>

              <View style={styles.auth_bottom_wrap}>
                <View style={styles.user_auth}>
                  <Heading3 style={styles.safeText}>我已阅读并同意签署</Heading3>
                </View>
                <Touchable style={styles.user_auth_protocol}
                  onPress={() => {
                    this.openUrl(1);
                  }}>
                  <Heading2 style={styles.user_poli_text}>《用户授权协议》 </Heading2>
                </Touchable>
                <View>
                  <Touchable style={styles.user_auth_policy}
                    onPress={() => {
                      this.openUrl(1);
                    }}>
                    <Heading2 style={styles.user_poli_text}>《隐私权保护政策》 </Heading2>
                  </Touchable>
                </View>


                <Image style={styles.safeImg} source={Images.public.success} />

              </View>
              <View style={styles.service_icon}>
                <Image style={styles.safeImg} source={Images.public.SafeAuth} />
                <Heading3 style={styles.safeText}>美丽金承诺保护您的信息安全</Heading3>
              </View>
            </View>
       
          
            
            
          </Touchable>
        </LayoutScroll>
      </KeyboardAwareScrollView>
    
  }

}

BasicScreen.options = navigationConfig('基本信息');
// 定义样式
const styles = StyleSheet.create({
  pages_bg: {
    backgroundColor: '#fff',
    flex:1,
  },
  listItem:{
    height:65,
    flexDirection:'row',
},
itemLeft:{
   width:75,
   height:65,
   justifyContent: "center",
   alignItems:'center'
},
leftText:{
   borderRadius:100,
   textAlign:'center',
   height:45,
   width:45,
   lineHeight:45,
   fontSize:23,
   fontWeight: "700",
   backgroundColor: "#dddddd",
   color: "#ffffff"
},
itemRight:{
 borderBottomWidth: StyleSheet.hairlineWidth,
 borderColor: "#515151",
 flex:1,
 justifyContent: "center",
},
rightText:{

},

  pages: {
    color: '#F7F7F7',
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20, //去除状态栏图标
    color: 'white',
    height: 120,
  },
  container_bank: {
    flex: 1,
    marginTop: 20,
    color: 'white',
    height: 240,
  },
  container_phone: {
    flex: 1,
    marginTop: 20,
    color: 'white',
    height: 120,
    marginBottom: 168,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  message: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 0,
  },
  contact_user: {
    fontSize: 16,
    color: '#F64976',
  },
  contact_user_right: {
    position: 'absolute',
    right: 16,
  },
  contact_text: {
    width: 120,
    fontSize: 17,
  },
  service: {
    width: 375,
  },

  serviceText: {
    lineHeight: 49,
    fontSize: 25,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  safeImg: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  service_icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16.5,
  },
  safeText: {
    fontSize: 12,
    flexDirection: 'row',
    color: '#9E9E9E',
    lineHeight: 16.5,
    marginLeft: 10,
  },
  message_code: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFF',

  },
  textInputTitle: {
    width: 159,
    fontSize: 17,
    color: '#BBBBBB',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  message_dotted: {
    borderColor: '#F1F1F1',//需要标色
    borderWidth: 0.5,
  },
  bankImg: {
    width: 12,
    height: 24,
    position: 'absolute',
    right: 18,
  },
  addImg: {
    width: 24,
    height: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    right: 50,
    top: -3,
  },
  auth_bottom: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginTop: 12,
  },
  auth_bottom_wrap: {
    width: 300,

    marginTop: 12,
    marginBottom: 48,
    marginHorizontal: 40,
  },
  user_auth: {
    position: 'absolute',
    flexDirection: 'column-reverse',
    top: 0,
    left: 15,
  },
  user_auth_protocol: {
    position: 'absolute',
    flexDirection: 'column-reverse',
    left: 140,
  },
  user_auth_policy: {
    position: 'absolute',
    flexDirection: 'column-reverse',
    top: 22,
    left: 15,
  },
  user_poli_text: {
    fontSize: 12,
    color: '#F64976',
  },
  // 组件弹窗
  line: {
    height: 60,
  },
  rightStyle: {
    height: 60,
    borderColor: '#f0f0f0',
    borderBottomWidth: getPixel(1),
  },
  label: {
    fontSize: 17,
    color: '#212121',
  },
  extraLabel: {
    fontSize: 17,
    position: 'absolute',
    left: 0,
  },

});


export default connect(({ NSBank, NSBasic }) => ({ NSBank, NSBasic }))(BasicScreen);
