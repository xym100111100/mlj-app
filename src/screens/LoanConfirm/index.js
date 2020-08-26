import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, StyleSheet, Image, Linking } from 'react-native'

import { screen, } from '../../utils/common'

import { Heading2, Heading3 } from '../../widget/Text'

// redux & router
import { connect } from 'react-redux';
import Router, { ADDBANK } from '../../Router';
import { navigationConfig } from '../../common/navigation';
import { Btn, Layout, LayoutScroll, Touchable, Line } from '../../componments';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import { ToastShow } from '../../utils/toast';
import Picker from 'ht-react-native-picker';

import RNPickerSelect from 'react-native-picker-select';

// 银行卡列表弹窗
import BankListDialog from '../../container/BankListDialog';
// 还款计划弹窗
import RepayPlanBillDialog from '../../container/RepayPlanBill';
import { Images } from '../../common/images';
import { getPixel } from '../../utils/screen';
import { money } from '../../utils/filters';

class LoanMoneySureScreen extends Component<Props, State>{


    constructor(props: Object) {
        super(props);
        this.state = {
            visible: false,
            bankStatus: false,
            dataStatus: false,
            allStatus: false,
            bankList: [],
            periodValue: null,
            debtMoney: '',
        }
    }

    componentDidMount(): void {
        // 初始化数据列表
        this.getAllloanMoneySure()
        this.initBankList();
    }

    // 获取还款计划列表
    checkRepayBill() {
        const { dispatch } = this.props;
        const { periodValue } = this.state;

        const debtMoney = this.props.LOANMONEYIndex.loanFastAmt.amount;


        // 返回的数据 产品、类型等
        const {
            artificialLimit,
            clientApplyAmt,
            artificialAmtYuan,
            partnerNo,
        } = this.props.LOANMONEYIndex.loanMoneySureList;




        let statusText = '';
        // 分期金额
        if (!debtMoney) {
            this.setState({
                visible: false,
            });
            statusText = "请先输入分期金额在查看计划";
            ToastShow(statusText);
            return false;
        }

        if (debtMoney > artificialAmtYuan) {
            this.setState({
                visible: false,
            });
            statusText = "分期金额不能超过授信额度" + artificialAmtYuan;
            ToastShow(statusText);
            return false;
        }

        if (periodValue === null) {
            this.setState({
                visible: false,
            });

            statusText = "请选择借款期数";
            ToastShow(statusText);
            return false;
        }


        // 医院编号
        dispatch({
            type: 'RepayPlan',
            payload: {
                // payload 里面是请求携带的参数
                debtNo: '',
                loanAmt: debtMoney,
                partnerNo: partnerNo ? partnerNo : this.props.LOANMONEYIndex.hospital.partnerNo,
                periodValue: Number(periodValue[0]),
            },
            callback: (res) => {
                if (res.code == 0) {
                    ToastShow('获取还款计划列表成功');
                } else {
                    ToastShow('获取还款计划列表失败');
                }
            },
        });
    }

    // 获取当前状态为审核通过的负债信息

    getAllloanMoneySure() {
        const { dispatch } = this.props;
        dispatch({
            type: 'loanUpdateMoneySureList',
            payload: {
            },
            callback: (res) => {
                if (res.code == 0) {
                    // ToastShow('初始化页面数据 success');
                } else {
                    ToastShow('fail');
                }
            },
        });

    }

    // 立即分期接口  loanSubmitMoneySure
    submitLoanMoneySure() {
        // 接口待处理数据
        const { dispatch } = this.props;
        const {
            operationNo,
            clientApplyAmt,
            artificialAmtYuan,
            artificialLimit,
        } = this.props.LOANMONEYIndex.loanMoneySureList;

        const {
            bankCode, cardNo
        } = this.props.LOANMONEYIndex.userBankList;
        // 借款期数 和金额
        const { periodValue } = this.state;

        const debtMoney = this.props.LOANMONEYIndex.loanFastAmt.amount;

        let statusText = '不能有空值';

        // 分期金额
        if (!debtMoney) {
            statusText = "请先输入分期金额";
            ToastShow(statusText);
            return false;
        }

        if (debtMoney % 100 != 0) {
            statusText = "分期金额必须为100的倍数";
            ToastShow(statusText);
            return false;
        }
        // 分期最高金额
        if (artificialAmtYuan && debtMoney > artificialAmtYuan) {
            statusText = "分期金额不能超过" + artificialAmtYuan;
            ToastShow(statusText);
            return false;
        }

        // certificateInfos 用户补充材料 临时数据
        const { customerList, opertionList, noticeList, bankPhotoList } = this.props.NSAuthpersonal;

        // 补充材料数组长度大于3
        if (customerList.length < 1 || opertionList.length < 1 || noticeList.length < 1) {
            statusText = "请先上传补充材料";
            ToastShow(statusText);
            return false;
        }
        // 还款银行卡
        if (!cardNo) {
            statusText = "请选择还款银行卡";
            ToastShow(statusText);
            return false;
        }
        // 借款期数不能超过人审的最高期数

        if (periodValue === null) {
            this.setState({
                visible: false,
            });

            statusText = "请选择借款期数";
            ToastShow(statusText);
            return false;
        }

        if (periodValue[0] > artificialLimit) {
            this.setState({
                visible: false,
            });

            statusText = "借款期数不能超过人审的最高期数";
            ToastShow(statusText);
            return false;
        }
        // 还款方式

        // 月利率

        let certificateInfos = [];

        certificateInfos = certificateInfos.concat(customerList).concat(opertionList).concat(noticeList);
        if (bankPhotoList && bankPhotoList.length > 0) {
            certificateInfos = certificateInfos.concat(bankPhotoList)
        }

        certificateInfos.forEach((item, index) => {
            delete item.id;
        });

        dispatch({
            type: 'loanSubmitMoneySure',
            payload: {
                cardNo: cardNo ? cardNo : '623254545456456754',
                debtAmt: debtMoney, // 借款金额
                certificateInfos: certificateInfos,
                debtLimit: periodValue[0] ? periodValue[0] : 3, // 借款期数
                operationNo: operationNo,// 申请项目编号
            },
            callback: (res) => {
                // 确认申请分期成功 进首页看审核额度 
                if (res.code == 0) {

                    Navigation.setStackRoot(this.props.componentId, {
                        component: {
                            name: Router.LOANCONFIRMRESULT,
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
                    ToastShow('立即分期失败');
                }

            },
        });
    }
    // 补充材料页  和认证共用一个页
    GoDataStatus() {
        Navigation.push(this.props.componentId, {
            component: {
                name: Router.AUTHDATA,
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


    updateMoney(e) {
        this.setState({
            // debtMoney: e,
            allStatus: false,
        });
        const { dispatch } = this.props;
        // 初始化数据500
        dispatch({
            type: 'loanFastUpdateAmtMoney',
            payload: {
                amount: e.nativeEvent.text,
            },
            callback: (res) => {
                // 修改当前的最高值
                // ToastShow('修改数据成功');
            },
        });
    }

    // 全部借出钱
    allAmountMoney() {
        // 用已授信额度
        const { debtMoney } = this.state;
        const {
            artificialAmtYuan,
        } = this.props.LOANMONEYIndex.loanMoneySureList;

        this.setState({
            // debtMoney: artificialAmtYuan,
            allStatus: true,
        })

        const { dispatch } = this.props;
        // 初始化数据500
        dispatch({
            type: 'loanFastUpdateAmtMoney',
            payload: {
                amount: artificialAmtYuan,
            },
            callback: (res) => {
                // 修改当前的最高值
                // ToastShow('修改数据成功');
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
    // 修改用户选择之后的银行卡  
    updateBankList(value) {
        this.setState({
            bankStatus: false,
        });
        if (value == 2) {
            Navigation.push(this.props.componentId, {
                component: {
                    name: ADDBANK,
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
            const { dispatch } = this.props;
            dispatch({
                type: 'initUserBankList',
                payload: {
                    value,
                },
            });
        }

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

    // 根据借款期数 dispatch 修改利率、额度 还款方式等数据

    MonthSelect() {
        
        const { hospital } = this.props.LOANMONEYIndex;
        if (Object.keys(hospital).length === 0) {
            ToastShow('请先选择医院和借款金额');
            return false;
        }

        const data = ['3', '6', '9', '12', '18', '24', '36'];
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择期数',
            pickerCancelBtnColor: [187, 187, 187, 1],
            pickerConfirmBtnColor: [246, 73, 118, 1],
            pickerData: data,
            selectedValue: ['3'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    periodValue: pickedValue,
                })

                const { dispatch } = this.props;
                const { rateAll } = this.props.LOANMONEYIndex;

                // 初始化数据
                this.props.LOANMONEYIndex.rateAll.forEach(function (item, index) {
                    if (pickedValue == item.periodValue) {
                        dispatch({
                            type: 'loanUpdateRateList',
                            payload: { ...item },
                            callback: (res) => {
                                // ToastShow('修改数据成功');
                            },
                        });
                    }

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

    // 跳转到申请项目
    goOperationItem() {
        Navigation.push(this.props.componentId, {
            component: {
                name: Router.OPERATIONSECOND,
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

        const operationName = this.props.LOANMONEYIndex.operation['level1'].operationProjectName ? this.props.LOANMONEYIndex.operation['level1'].operationProjectName + ',' + this.props.LOANMONEYIndex.operation['level2'].operationProjectName : '请选择手术项目';
        const {
            clientApplyAmt,
            artificialAmtYuan,
            artificialLimit,
            clientApplyLimit,
            creditType,
            repayType,
            monthlyRate,
        } = this.props.LOANMONEYIndex.loanMoneySureList;
        // 用户选择的银行卡
        const { bankName, bankAccount4 } = this.props.LOANMONEYIndex.userBankList;
        // 是否已经有银行卡
        const { bankList } = this.props.NSBank;
        //是否已经选择银行卡
        let bankNameCode = '';
        if (bankName && bankAccount4) {
            bankNameCode = bankName + '(' + bankAccount4 + ')';
        }
        // 选择的医院
        const { realName } = this.props.LOANMONEYIndex.hospital;

        // 期数和上传资料状态
        const { dataStatus, periodValue, debtMoney, allStatus } = this.state;

        // 已上传的图片数量
        const { customerList, opertionList, noticeList, bankPhotoList } = this.props.NSAuthpersonal;

        let datai = 0;
        if (customerList && customerList.length > 0) {
            datai++;
        }
        if (opertionList && opertionList.length > 0) {
            datai++;
        }
        if (noticeList && noticeList.length > 0) {
            datai++;
        }
        if (bankPhotoList && bankPhotoList.length > 0) {
            datai++;
        }

        return (
            <Layout>
                <LayoutScroll>

                    <View style={styles.pages}>


                        {/*借款框*/}
                        <View style={styles.container}>
                            <View style={styles.cTop}>
                                <Text style={styles.cTopText}>可用额度(元)</Text>
                            </View>
                            {/*借款那啥*/}
                            <View style={styles.loanInput}>
                                <Text style={styles.loanIcon}>￥</Text>
                                <TextInput
                                    style={styles.loanInputBox}
                                    underlineColorAndroid={'transparent'}
                                    clearTextOnFocus={true}
                                    returnKeyType={'done'}
                                    value={this.props.LOANMONEYIndex.loanFastAmt.amount}
                                    // onChangeText={(e) => {
                                    //     this.updateMoney();
                                    // }}
                                    onChange={e => this.updateMoney(e)}
                                    placeholderTextColor={allStatus ? 'black' : '#ccc'}
                                    keyboardType={'numeric'}
                                    placeholder={this.props.LOANMONEYIndex.loanFastAmt.amount ? money(this.props.LOANMONEYIndex.loanFastAmt.amount) : money(artificialAmtYuan)}
                                >
                                </TextInput>
                                <Touchable
                                    style={styles.loanInputBtn}
                                    onPress={() => {
                                        this.allAmountMoney();
                                    }}
                                >
                                    <Text style={styles.loanInputBtnText}>
                                        全部借出
                                </Text>
                                </Touchable>
                            </View>
                            <View style={styles.loanTips}>
                                <Text style={styles.loanTipsText}>最低月利率{monthlyRate ? monthlyRate : 0.365}%</Text>
                            </View>
                        </View>

                        {/* 选择 */}

                        <View style={styles.container_bank}>
                            <View style={styles.message_code}>
                                <Heading2 style={styles.hosText}>选择医院</Heading2>
                                <Heading2 style={styles.repayment} >{realName}</Heading2>
                            </View>

                            <Touchable onPress={() => {
                                this.goOperationItem()
                            }} style={styles.message_code}>
                                <Heading2 style={styles.hosText}>申请项目</Heading2>
                                <Heading2 style={styles.repaymentCheck} >{operationName}</Heading2>
                                <Image style={styles.bankImg} source={Images.loan.Cellarrow} />
                            </Touchable>

                            <Touchable onPress={() => {
                                this.GoDataStatus()
                            }} style={styles.message_code}>
                                <Heading2 style={styles.hosText}>补充资料</Heading2>

                                <Heading2 style={styles.repaymentCheck} >{datai > 0 ? '已上传' + datai + '项' : '未上传'}</Heading2>
                                <Image style={styles.bankImg} source={Images.loan.Cellarrow} />

                            </Touchable>

                        </View>


                        <View style={styles.container_phone}>

                            {/* <View style={styles.message_code}>
                                <Heading2 style={styles.hosText}>月利率</Heading2>
                                <Heading2 style={styles.repayment} >{this.props.LOANMONEYIndex.repayTypeList.minMonthInterestRate ? this.props.LOANMONEYIndex.repayTypeList.minMonthInterestRate + '%' : '0.35%'} </Heading2>
                            </View> */}

                            <Line
                                style={styles.message_code}
                                onPress={this.MonthSelect.bind(this)}
                                rightStyle={styles.rightStyle}
                                textStyle={styles.label}
                                extraStyle={[styles.extraLabel, { color: '#212121' }]}
                                text={'借款期数'}
                                arrow={true}
                                extra={periodValue !== null ? periodValue : '请选择与借款期数'}
                            />

                            <View style={styles.message_code}>
                                <Heading2 style={styles.hosText}>还款方式</Heading2>
                                <Heading2 style={styles.repayment} > {this.props.LOANMONEYIndex.repayTypeList.repayTypeStr ? this.props.LOANMONEYIndex.repayTypeList.repayTypeStr : '按月等本等息'} </Heading2>
                            </View>

                            {/* 银行卡弹窗 */}
                            <Line
                                style={styles.bank_list_code}
                                onPress={() => {
                                    if (bankList.length > 0) {
                                        this.setState({
                                            bankStatus: true,
                                        });
                                    } else {
                                        Navigation.push(this.props.componentId, {
                                            component: {
                                                name: ADDBANK,
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
                                }}
                                rightStyle={styles.rightStyle}
                                textStyle={styles.label}
                                extraStyle={[styles.extraLabel, { color: '#212121' }]}
                                text={'选择银行卡'}
                                arrow={true}
                                extra={bankNameCode ? bankNameCode : '请选择银行卡'}
                            />


                        </View>

                        <Touchable onPress={() => {
                            this.setState({
                                visible: true,
                            });
                            this.checkRepayBill()
                        }} style={styles.repayment_code}>
                            <Heading2 style={styles.repayment_detail} >查看还款计划</Heading2>
                        </Touchable>


                        {/* 隐私协议 */}
                        <View style={styles.user_service}>
                            <View style={styles.pages_read}>
                                <Image style={styles.safeImg} source={Images.public.success} />
                                <Heading3 style={styles.pages_button}>点击按钮即表示同意签署</Heading3>

                            </View>
                            <View style={styles.agreement} >
                                <View>
                                    <Touchable onPress={() => {
                                        this.openUrl(0);
                                    }} style={styles.pages_term}>
                                        <Heading3 style={styles.pages_term}>
                                            《借款协议》
                                </Heading3>
                                    </Touchable>
                                    <Touchable onPress={() => {
                                        this.openUrl(1);
                                    }} style={styles.pages_term}>
                                        <Heading3 style={styles.pages_term}>《隐私协议》</Heading3>
                                    </Touchable>
                                </View>
                                <View>
                                    <Touchable onPress={() => {
                                        this.openUrl(2);
                                    }} style={styles.pages_term}>
                                        <Heading3 style={styles.pages_term}>《服务协议》</Heading3>
                                    </Touchable>
                                    <Touchable onPress={() => {
                                        this.openUrl(2);
                                    }} style={styles.pages_term}>
                                        <Heading3 style={styles.pages_term}>《委托扣款授权书》</Heading3>
                                    </Touchable>
                                </View>

                            </View>
                        </View>
                        {/* </Touchable> */}

                        {/* 申请提交 */}
                        <Btn onPress={() => {
                            this.submitLoanMoneySure();
                        }}>立即分期</Btn>



                    </View>
                </LayoutScroll>

                {/* 银行卡列表 */}
                {this.state.bankStatus && <BankListDialog
                    callback={(value) => {
                        // 银行卡数据更新处理
                        this.updateBankList(value)
                    }}
                    data={this.props.NSBank}
                    onClose={() => {
                        this.setState({
                            bankStatus: false,
                        });
                    }}
                />}

                {/*  查看还款计划弹窗  */}
                {this.state.visible && <RepayPlanBillDialog
                    callback={(value) => {
                        // 还款计划 回调处理
                    }}
                    data={this.props.LOANMONEYIndex.repayPlan}
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                />}

            </Layout>

        )

    }


}

LoanMoneySureScreen.options = navigationConfig('立即分期');
// 定义样式
const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    pages_money: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 23.5,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    pages_money_icon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F64976',
        position: 'absolute',
        left: 140,
        top: 40,
    },
    pages_money_all: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#F64976',
        position: 'absolute',
        left: 160,
        top: 12,
    },
    container: {
        flex: 1,
        marginTop: 20, //去除状态栏图标
        color: 'white',
        height: 139,
        backgroundColor: 'white',
        padding: 16,

    },
    cTop: {
        height: 22.5,
        marginBottom: 7.5,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cTopText: {
        color: '#1E1E1E',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loanInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        height: 50,
        borderBottomColor: '#FFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    loanIcon: {
        height: 50,
        fontSize: 16,
        lineHeight: 50,
        color: '#212121',
    },
    loanInputBox: {
        height: 50,
        flex: 1,
        marginLeft: 5,
        fontSize: 30,
        padding: 0,
        color: '#212121',
        flexDirection: 'row',
        alignItems: 'center',
    },
    loanInputBtn: {
        width: 60,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loanInputBtnText: {
        color: '#F64976',
        fontSize: 14,
    },
    loanTips: {},
    loanTipsText: {
        fontSize: 12,
        color: '#757575',
    },

    container_bank: {
        flex: 1,
        marginTop: 20,
        color: 'white',
        height: 180,
    },
    container_phone: {
        flex: 1,
        marginTop: 20,
        color: 'white',
        height: 180,
    },
    message_code: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFF',

    },
    repayment_code: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 15,

    },
    bank_list_code: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    bank_list_name: {
        marginLeft: 100,
        width: 120,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },
    repayment_detail: {
        position: 'absolute',
        right: 16,
        fontSize: 14,
        color: '#F64976',
    },
    hosText: {
        width: 120,
        fontSize: 17
    },
    hosTextPeriod: {
        width: 100,
        fontSize: 17
    },
    bankImg: {
        width: 12,
        height: 24,
        position: 'absolute',
        right: 16,
        paddingTop: 5,
    },
    bankImgSelect: {
        width: 12,
        height: 24,
        position: 'absolute',
        right: 0,
        paddingTop: 5,
    },
    bankText: {
        width: 150,
        height: 24,
        color: '#212121',
        fontWeight: 'bold',
        position: 'absolute',
        right: 16,
        paddingTop: 5,
    },
    repayment: {
        position: 'absolute',
        right: 16,
        fontSize: 17,
    },
    repaymentCheck: {
        position: 'absolute',
        right: 45,
        fontSize: 17,
    },
    repayBankImg: {
        width: 12,
        height: 24,
        position: 'absolute',
        right: 0,
        paddingTop: 5,
    },
    user_service: {
        height: 100,
        alignItems:'center',
        
    },
    pages_read: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreement: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginLeft:20
    },
    pages_reg: {
        fontSize: 12,
        color: '#F58196'
    },
    pages_term: {
        fontSize: 12,
        color: '#F58196',
        paddingTop:5,
        paddingRight:5,
        paddingBottom:5,
      
    },
    pages_dash_second: {
        width: 260.5,
        color: '#DDDDDD',
        opacity: 0.1,
        alignSelf: 'center',
        marginLeft: 10,
    },
    safeImg: {
        width: 16,
        height: 16,
        marginRight: 5,
    },
    pages_button: {
        marginTop: 5,
    },
    line: {
        height: 60,
    },
    rightStyle: {
        height: 60,
        // borderColor: '#f0f0f0',
        // borderBottomWidth: getPixel(1),
    },
    label: {
        fontSize: 17,
        color: '#212121',
        fontWeight: 'bold',
    },
    extraLabel: {
        fontSize: 17,
        position: 'absolute',
        right: 20,
    },




})



export default connect(({ LOANMONEYIndex, LoanMoneySureIndex, NSBank, NSAuthpersonal }) => ({ LOANMONEYIndex, LoanMoneySureIndex, NSBank, NSAuthpersonal }))(LoanMoneySureScreen);
