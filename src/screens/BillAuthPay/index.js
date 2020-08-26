import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';

import { connect } from 'react-redux';
import Router, { ADDBANK } from '../../Router';

import { Btn, Layout, LayoutScroll, Line, Touchable } from '../../componments';
import { Images } from '../../common/images';
import { navigationConfig } from '../../common/navigation';
import { money } from '../../utils/filters';
import { Navigation } from 'react-native-navigation';
import TextInputWidget from '../../widget/TextInputWidget';
import { Heading3 } from '../../widget/Text';
import BankListDialog from '../../container/BankListDialog';
import { ToastShow } from '../../utils/toast';

class BillAuthPay extends Component<Props, State> {

    constructor(props: Object) {
        super(props);
        this.state = {
            bankStatus: false,
            bankData: [],
            defualtBank: {},
            reservePhone: '',
            code: '',
            countdown: 10,
            verifyTxt: '获取验证码',
            canSendCode:true
        };
    }

    submit() {
        const { BillPayInfo } = this.props.NSBill;
        const { debtNo, planNos, totalAmtYuan } = BillPayInfo;
        const { dispatch } = this.props;
        const { reservePhone,  code } = this.state;

        if (!reservePhone) {
            ToastShow('请输入手机号码');
            return false;
        }
        if (!this.ValidMobile(reservePhone)) {
            ToastShow('请输入正确的手机号码');
            return false;
        }

        if (!code) {
            ToastShow('请输入手机号码');
            return false;
        }


        dispatch({
            type: 'BillPaySubmit',
            payload: {
                debtNo,
                totalAmtYuan,
                planNos: planNos,
                code:this.state.code,
                bankCardId:this.state.defualtBank.cardNo
            },
            callback: (res) => {
                // 跳转到还款确认页面
                if(res.code === 0){
                    Navigation.setStackRoot(this.props.componentId, {
                        component: {
                            name: Router.BILLPAYRESULT,
                        },
                    });
                }else{
                    ToastShow('还款失败，请联系客服处理');
                }

            },
        });
    }

    componentDidMount() {
        // const { billStatus } = this.props.NSBill;
        // if (!billStatus) {
        //     this.init();
        // }

        this.initBankList()
        this.initClientInfo()
    }
    initClientInfo() {
        const { dispatch } = this.props;
        dispatch({
            type: 'initClientInfo',
            payload: {},
        });
    }

    // 初始化银行卡列表
    initBankList() {
        const { dispatch } = this.props;
        dispatch({
            type: 'BankList',
            payload: {},
            callback: (res) => {
                if (res.code === 0) {
                    res.data.forEach(item => {
                        if (item.isUsed === "1") {
                            this.setState({
                                defualtBank: item
                            })
                        }
                    });
                }
            },
        });
    }

    init() {
        const { dispatch } = this.props;
        // list存在reducer中
        dispatch({
            type: 'UpdateBillStatus',
            callback: () => {
            },
        });
    }

    ValidMobile(val) {
        return (/^1[3456789]\d{9}$/.test(val));
    }
    // 获取验证码
    GetVerifyCode() {
 
        const { reservePhone, canSendCode, cardNo } = this.state;
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



        const { dispatch } = this.props;

        dispatch({
            type: 'sendCardAuthCode',
            payload: {
                ownerMobile: reservePhone,
                bankAccount:this.state.defualtBank.cardNo
                // 这里还需要银行卡号
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

    // 更新state
    updateState(name, value) {
       
        this.setState({
            [name]: value,
        });
    }

    // 修改用户选择之后的银行卡  
    updateBankList(value) {
        this.setState({
            bankStatus: false,
            defualtBank: value
        });
    }

    render() {
        const { BillPayInfo } = this.props.NSBill;
        const { replayAmtYuan } = BillPayInfo;
        const { bankList } = this.props.NSBank;

        return (
            <LayoutScroll style={styles.page}>
                <View style={styles.pages}>
                    <View style={styles.cHeader}>
                        <Text style={styles.cHeaderTitle}>还款金额(元)</Text>
                        <Text style={styles.cHeaderMoney}>{money(replayAmtYuan)}</Text>
                    </View>
                    <View style={styles.cList}>
                        <Line extraStyle={{ fontSize: 17 }} textStyle={{ fontSize: 17 }} style={{ marginBottom: 10 }}
                            onPress={() => {
                                this.setState({
                                    bankStatus: true
                                })
                            }}
                            extra={this.state.defualtBank.bankName}
                            border={true}
                            text={'还款银行卡'}
                            arrow={true} />
                        <TextInputWidget
                            title='手机号'
                            keyboardType={'numeric'}
                            placeholder='请输入银行预留手机号'
                            callback={(v) => {
                                this.updateState('reservePhone', v);
                            }}
                        />

                        <TextInputWidget
                            title='验证码'
                            verifyTxt={this.state.verifyTxt}
                            margin={true}
                            type={'verify'}
                            onPress={() => {
                                this.GetVerifyCode();
                            }}
                            callback={(v) => {
                                this.updateState('code', v);
                            }}
                            keyboardType={'numeric'}
                            placeholder='请输入验证码' />
                        <View style={styles.tipText} >
                            <Image style={styles.safeImg} source={Images.public.success} />

                            <View style={styles.user_auth}>
                                <Heading3 style={styles.safeText}><Text>同意《快捷支付还款提醒》</Text></Heading3>
                            </View>
                        </View>
                    </View>

                </View>
                {/*  申请借款完成   支付完成  变更完成 */}

                <View style={styles.btn} >
                    <Btn onPress={() => {
                        this.submit();
                    }}>去支付</Btn>
                </View>
                {/* 银行卡列表 */}
                {this.state.bankStatus && <BankListDialog
                    callback={(value) => {
                        // 银行卡数据更新处理
                        this.updateBankList(value)
                    }}
                    data={{ bankList: bankList }}
                    onClose={() => {
                        this.setState({
                            bankStatus: false,
                        });
                    }}
                />}
            </LayoutScroll>
        );
    }

}

// 定义标题
BillAuthPay.options = navigationConfig('支付');

// 定义样式
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    pages: {
        flex: 1,
        paddingTop: 12,
    },
    cHeader: {
        height: 137,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cHeaderTitle: {
        fontSize: 13,
        lineHeight: 18.5,
        marginBottom: 7.5,
        color: '#212121',
    },
    cHeaderMoney: {
        fontSize: 30,
        lineHeight: 36.5,
        color: '#F64976',
    },
    cList: {
        paddingTop: 12,
    },
    tipText: {

        marginLeft: 18
    },
    user_auth: {
        position: 'absolute',
        flexDirection: 'column-reverse',
        top: 0,
        left: 15,
    },
    safeText: {
        fontSize: 12,
        flexDirection: 'row',
        color: '#9E9E9E',
        lineHeight: 16.5,
        marginLeft: 10,
    },
    safeImg: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignContent: 'center',
    },

    btn: {
        marginTop: 70

    }
});


export default connect(({ NSBill, NSBank }) => ({ NSBill, NSBank }))(BillAuthPay);
