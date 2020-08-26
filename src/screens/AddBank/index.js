import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInputWidget from '../../widget/TextInputWidget';
import { Btn, Layout, LayoutScroll, Line } from '../../componments';
import { navigationConfig } from '../../common/navigation';
import Picker from 'ht-react-native-picker';
import { connect } from 'react-redux';
import { getPixel } from '../../utils/screen';
import { ToastShow } from '../../utils/toast';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


class AddBank extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            bankTypeList: [],
            bankTypeSelectId: null,
            bankTypeSelectText: '',
            countdown: 10,
            verifyTxt: '获取验证码',
            canSendCode: true,

            bankCode: '',
            bankName: '',
            cardCertNo: '',
            cardName: '',
            cardNo: '',
            code: '',
            reservePhone: '',
        };
    }

    componentDidMount() {
        this.initBankTypeList();
        //
    }

    // 用户返回时 清除当前页所有的弹窗
    componentWillUnmount() {
        Picker.hide();
    }




    // 更新state
    updateState(name, value) {
        this.setState({
            [name]: value,
        });
    }

    // 获取银行卡类型
    initBankTypeList() {
        const { dispatch } = this.props;
        dispatch({
            type: 'BankTypeList',
            payload: {},
            callback: (res) => {
                this.setState({
                    bankTypeList: res.data,
                });
                // this.GetBankList();
            },
        });
    }


    // 初始化下拉框
    GetBankList() {

        const data = [];
        const { bankTypeList } = this.props.NSBank;
        bankTypeList.forEach((item, index) => {
            data.push(item.bankName);
        });

        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '银行卡类型',
            pickerCancelBtnColor: [187, 187, 187, 1],
            pickerConfirmBtnColor: [246, 73, 118, 1],
            pickerData: data,
            selectedValue: ['建设银行'],
            onPickerConfirm: data => {
                let bankCode = '';
                bankTypeList.forEach((item) => {
                    if (item.bankName === data[0]) {
                        bankCode = item.bankCode;
                    }
                });
                this.setState({
                    bankCode,
                    bankTypeSelectText: data[0],
                });
            },
        });
        Picker.show();
    }


    ValidMobile(val) {
        return (/^1[3456789]\d{9}$/.test(val));
    }

    // 获取验证码
    GetVerifyCode() {
        const { reservePhone, canSendCode,cardNo } = this.state;
 

        if (!canSendCode) {
            return false;
        }
        if (!reservePhone) {
            ToastShow('请输入手机号码');
            return false;
        }
        if (!this.ValidMobile(reservePhone)) {
            ToastShow('请输入正确的手机号码');
            return false;
        }

        if (!cardNo) {
            ToastShow('银行卡号不能为空');
         
            return false;
        }

        const { dispatch } = this.props;
        dispatch({
            type: 'sendCardAuthCode',
            payload: {
                ownerMobile: reservePhone,
                bankAccount:this.state.cardNo,
            },
            callback: (res) => {
                if (res.code == 0) {
                    ToastShow('验证码发送成功，请注意查收');
                    this.countdown();
                } else {
                    ToastShow('验证码发送失败，请稍后重试');
                }
            },
        });
    }


    // 倒计时
    countdown() {
        let { countdown } = this.state;
        if (this.state.countdown === 1) {
            this.setState({
                verifyTxt: '获取验证码',
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


    // 提交保存
    submit() {
        const { bankCode, bankName, cardNo, code, reservePhone, bankTypeSelectText } = this.state;
        const { frontUserInfo } = this.props.AUTHNAMEIndex;
        const { name, number } = frontUserInfo;
        // 删除app之后替代数据
        const { userInfo } = this.props.NSUser;
        const { certNo, realName } = userInfo;

        // 判断是否为空的情况

        let statusText = '不能有空值';


        if (!bankTypeSelectText) {
            statusText = "银行类型不能为空";
            ToastShow(statusText);
            return false;
        }

        if (!cardNo) {
            statusText = "银行卡号不能为空";
            ToastShow(statusText);
            return false;
        }

        if (!reservePhone) {
            statusText = "手机号不能为空";
            ToastShow(statusText);
            return false;
        }



        if (!code) {
            statusText = "验证码不能为空";
            ToastShow(statusText);
            return false;
        }


        const { dispatch } = this.props;
        dispatch({
            type: 'BankSubmit',
            payload: {
                bankCode: bankCode ? bankCode : 'CCB',
                bankName: bankTypeSelectText ? bankTypeSelectText : '建设银行',
                cardCertNo: number ? number : certNo,
                cardName: name ? name : realName,
                cardNo,
                code,
                reservePhone,
            },
            callback: (res) => {
                if (res.code === 0) {
                    // 添加成功之后触发 银行卡列表
                    if (res.message == "操作成功" || res.message == "添加银行卡成功") {
                        this.initBankList();
                        Navigation.pop(this.props.componentId);
                    } else {
                        ToastShow(res.message);
                        return false;
                    }
                }
            },
        });
    }

    // 初始化银行卡列表
    initBankList() {
        const { dispatch } = this.props;
        dispatch({
            type: 'BankList',
            payload: {},
        });
    }


    render() {
        // 取信息在实名认证之后reduce里
        const { frontUserInfo } = this.props.AUTHNAMEIndex;
        const { name, number } = frontUserInfo;

        const { userInfo } = this.props.NSUser;
        const { certNo, realName } = userInfo;

        const { bankTypeSelectText } = this.state;

        return (

            <KeyboardAwareScrollView
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="always"
                >
                <LayoutScroll style={styles.addBankInner} >

                    <View style={styles.page}>
                        <TextInputWidget
                            title='姓名'
                            disable={true}
                            value={name ? name : realName}
                        />

                        <TextInputWidget
                            title='身份证号'
                            disable={true}
                            margin={true}
                            value={number ? number : certNo} />

                        <Line
                            style={styles.line}
                            onPress={this.GetBankList.bind(this)}
                            rightStyle={styles.rightStyle}
                            textStyle={styles.label}
                            extraStyle={[styles.extraLabel, bankTypeSelectText && { color: '#212121' }]}
                            text={'银行类型'}
                            arrow={true}
                            extra={bankTypeSelectText ? bankTypeSelectText : '请选择银行卡类型'}
                        />
                        <TextInputWidget
                            title='银行支行'
                            keyboardType={'default'}
                            callback={(v) => {
                                this.updateState('bankName', v);
                            }}
                            placeholder='请输入银行支行(选填)' />

                        <TextInputWidget
                            title='银行卡号'
                            margin={true}
                            keyboardType={'numeric'}
                            callback={(v) => {
                                this.updateState('cardNo', v);
                            }}
                            placeholder='请输入银行卡号' />

                        <TextInputWidget
                            title='手机号'
                            keyboardType={'numeric'}
                            callback={(v) => {
                                this.updateState('reservePhone', v);
                            }}
                            placeholder='请输入绑定银行手机号' />

                        <TextInputWidget
                            title='验证码'
                            verifyTxt={this.state.verifyTxt}
                            margin={true}
                            type={'verify'}
                            keyboardType={'numeric'}
                            onPress={() => {
                                this.GetVerifyCode();
                            }}
                            callback={(v) => {
                                this.updateState('code', v);
                            }}
                            placeholder='请输入验证码' />

                        {/*按钮*/}
                        <Btn onPress={() => {
                            this.submit();
                        }}>提交</Btn>

                    </View>

                </LayoutScroll>

            </KeyboardAwareScrollView>

        );
    }

}

AddBank.options = navigationConfig('添加银行卡');

// 定义样式
const styles = StyleSheet.create({
    addBank: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        position: 'absolute',
    },
    addBankInner: {
        flex: 1,
        paddingTop: 12,
    },
    page: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
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
    },

});

export default connect(({ NSBank, NSUser, AUTHNAMEIndex }) => ({ NSBank, NSUser, AUTHNAMEIndex }))(AddBank);
