import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ImageBackground,
} from 'react-native';

import { Heading2 } from '../../widget/Text';
import { Images } from '../../common/images';


// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
import Picker from 'ht-react-native-picker';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import { ToastShow ,ToastLoadingShow} from '../../utils/toast';
import { navigationConfig } from '../../common/navigation';

// 弹窗组件
import RNPickerSelect from 'react-native-picker-select';
import RepayPlanBillDialog from '../../container/RepayPlanBill';

import { Btn, Layout, LayoutScroll, Line } from '../../componments';
import { getPixel } from '../../utils/screen';
import NSLoan from '../../reducers/loanmoney';

class LoanMoneyScreen extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            isRefreshing: false,
            visible: false,
            operaItemName: '请选择手术项目',
            debtAmt: null,
            periodValue: null,
        };
    }


    componentDidMount() {
        if (this.props.LOANMONEYIndex.hospital.partnerNo) {
            this.getLimitUnitRate();
        }

    }


    // 跳转医院页面  医院页面 HOSPITAL
    goHospital() {
        Navigation.push(this.props.componentId, {
            component: {
                name: Router.HOSPITAL
            },
        });
    }

    // 获取还款计划列表
    /*

     "debtNo": "负债编号",
     "loanAmt": "借款金额",
     "loanLimit": 借款期限,
     "partnerNo": "医院/商户编号",
     "periodType": "期限类型",
     "repayType":  还款方式

    */
    checkRepayBill() {
        // 还款参数不能为空情况


        const { amount } = this.props.LOANMONEYIndex.loanAmt;
        const { partnerNo } = this.props.LOANMONEYIndex.hospital;
        const { periodType, repayType } = this.props.LOANMONEYIndex.repayTypeList;

        const { periodValue } = this.state;

        let statusText = '不能有空值';
        // 借款金额  不能超过限制金额
        if (!amount) {
            this.setState({
                visible: false,
            });
            statusText = "请先输入借款金额";
            ToastShow(statusText);
            return false;
        }

        if (amount > 50000) {
            this.setState({
                visible: false,
            });
            statusText = "借款金额不能超过最大额度";
            ToastShow(statusText);
            return false;
        }

        // 医院不能为空
        if (partnerNo === undefined) {
            this.setState({
                visible: false,
            });
            statusText = "请先选择医院";
            ToastShow(statusText);
            return false;
        }

        // 借款期数不能为空
        if (periodValue === null) {
            this.setState({
                visible: false,
            });
            statusText = "请选择借款期数";
            ToastShow(statusText);
            return false;
        }

        const { dispatch } = this.props;

        dispatch({
            type: 'RepayPlan',
            payload: {
                // payload 里面是请求携带的参数
                debtNo: '',
                partnerNo: partnerNo,
                loanAmt: amount,
                periodValue: periodValue[0],
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


    // 申请手术页面 APPLYITEM
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

    updateChangeMoney(e) {
        const { dispatch } = this.props;
        // 初始化数据500
        dispatch({
            type: 'loanUpdateAmtMoney',
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
        const { dispatch } = this.props;
        const mountMoney = '57000';
        // 初始化数据500
        dispatch({
            type: 'loanUpdateAmtMoney',
            payload: {
                amount: mountMoney,
            },
            callback: (res) => {
                // 修改当前的最高值
                // ToastShow('修改数据成功');
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
                if(this.props.LOANMONEYIndex && this.props.LOANMONEYIndex.rateAll ){
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
                }

            },
            onPickerSelect: pickedValue => {
                this.setState({
                    selectContact: pickedValue,
                });
            },
        });
        Picker.show();
    }

    // initLimitUnitRate 选择医院之后   获取汇率

    getLimitUnitRate() {
        const { dispatch } = this.props;
        dispatch({
            type: 'LoanLimitUnitRate',
            payload: {
                // payload 里面是请求携带的参数
                PartnerNo: this.props.LOANMONEYIndex.hospital.partnerNo,
            },
            callback: (res) => {
                if (res.code == 0) {
                    // ToastShow('获取数据成功');
                } else {
                    ToastShow('失败');
                }
            },
        });
    }

    // 提交申请  LoanSubmit

    goApplyItem() {
        const { dispatch } = this.props;
        // const operationString = this.props.LOANMONEYIndex.operation['level1'].operationProjectNo + ',' + this.props.LOANMONEYIndex.operation['level2'].operationProjectNo;
        const operationString = this.props.LOANMONEYIndex.operation['level2'].operationProjectNo;
        const { amount } = this.props.LOANMONEYIndex.loanAmt;
        const { partnerNo } = this.props.LOANMONEYIndex.hospital;
        const { periodValue } = this.state;

        // 判断为空的情况

        let statusText = '不能有空值';
        // 借款金额  不能超过限制金额
        if (!amount) {
            statusText = "借款金额不能为空";
            ToastShow(statusText);
            return false;
        }
        if (amount > 50000) {
            statusText = "借款金额不能大于50000";
            ToastShow(statusText);
            return false;
        }

        if (amount % 100 !== 0) {
            statusText = "借款金额必须为100的倍数";
            ToastShow(statusText);
            return false;
        }
        // 医院不能为空
        if (!partnerNo) {
            statusText = "医院不能为空";
            ToastShow(statusText);
            return false;
        }

        // 申请项目不能为空
        if (operationString === undefined) {
            statusText = "申请项目不能为空";
            ToastShow(statusText);
            return false;
        }

        // 借款期数不能为空
        if (periodValue === null) {
            this.setState({
                visible: false,
            });
            statusText = "请选择借款期数";
            ToastShow(statusText);
            return false;
        }
        ToastLoadingShow('正在提交...')


        dispatch({
            type: 'LoanSubmit',
            payload: {
                // payload 里面是请求携带的参数
                partnerNo: partnerNo,
                clientApplyLimit: periodValue[0] ? periodValue[0] : '3',
                clientApplyAmt: amount,
                operationNo: operationString,
            },
            callback: (res) => {
                if (res.code == 0) {
                    // 返回首页 等待审核状态
                    Navigation.setStackRoot(this.props.componentId, {
                        component: {
                            name: Router.LOANRESULT,
                        },
                    });
                    ToastShow('提交申请成功');
                } else {
                    ToastShow('提交申请失败');
                }
            },
        });
    }

    render() {
        const operationName = this.props.LOANMONEYIndex.operation['level1'].operationProjectName && this.props.LOANMONEYIndex.operation['level2'].operationProjectName ? this.props.LOANMONEYIndex.operation['level1'].operationProjectName + ',' + this.props.LOANMONEYIndex.operation['level2'].operationProjectName : '请选择手术项目';
        const { serviceRate, repayTypeStr } = this.props.LOANMONEYIndex.repayTypeList;

        // 处理当前选择期数
        // const { rateAll } = this.props.LOANMONEYIndex;
        const { periodValue } = this.state;

        // const periodArr = [
        //     { label: '3', value: '3' },
        //     { label: '6', value: '6' },
        //     { label: '9', value: '9' },
        //     { label: '12', value: '12' },
        //     { label: '18', value: '18' },
        //     { label: '24', value: '24' },
        //     { label: '36', value: '36' },
        // ];
        // if (rateAll.length > 0) {

        //     for (i = 0; i < rateAll.length; i++) {
        //         periodArr[i]['label'] = rateAll[i]['periodValue'].toString();
        //         periodArr[i]['value'] = rateAll[i]['periodValue'].toString();
        //     }
        // }


        return (
            <Layout>
                <LayoutScroll>
                    <View style={styles.page}>
                        {/*借款框*/}
                        <View style={styles.container}>
                            <View style={styles.cTop}>
                                <Text style={styles.cTopText}>申请借款(元)</Text>
                            </View>
                            {/*借款那啥*/}
                            <View style={styles.loanInput}>
                                <Text style={styles.loanIcon}>￥</Text>
                                <TextInput
                                    style={styles.loanInputBox}
                                    maxLength={8}
                                    returnKeyType={'done'}
                                    underlineColorAndroid={'transparent'}
                                    clearTextOnFocus={true}
                                    value={this.props.LOANMONEYIndex.loanAmt.amount}
                                    onChange={e => this.updateChangeMoney(e)}
                                    keyboardType={'numeric'}
                                    placeholder={this.props.LOANMONEYIndex.loanAmt.amount ? this.props.LOANMONEYIndex.loanAmt.amount : '50000'}
                                >
                                </TextInput>
                            </View>
                            {/* <View style={styles.loanTips}>
                                <Text style={styles.loanTipsText}>最低日利率{serviceRate ? serviceRate / 100 : 0.365}%</Text>
                            </View> */}
                        </View>

                        {/* 选择 */}
                        <View style={styles.container_bank}>
                            <View style={styles.message_code}>
                                <Heading2 style={styles.selectHospitalText}>选择医院</Heading2>
                                <TouchableOpacity onPress={() => {
                                    this.goHospital();
                                }} style={styles.selectHospitalPostext}>
                                    <Heading2 style={styles.selectFontColor}>{this.props.LOANMONEYIndex.hospital.realName ? this.props.LOANMONEYIndex.hospital.realName : '请选择医院'}</Heading2>
                                </TouchableOpacity>
                                <Image style={styles.bankImg} source={Images.loan.Cellarrow} />
                            </View>

                            <View style={styles.message_code}>
                                <Heading2 style={styles.selectHospitalText}>申请项目</Heading2>
                                <TouchableOpacity onPress={() => {
                                    this.goOperationItem();
                                }} style={styles.selectHospitalPostext}>
                                    <Heading2 style={styles.selectFontColor}>{operationName ? operationName : '请选择手术项目'}</Heading2>
                                </TouchableOpacity>
                                <Image style={styles.bankImg} source={Images.loan.Cellarrow} />
                            </View>

                        </View>

                        <View style={styles.container_phone}>

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
                                <Heading2 style={styles.selectHospitalText}>还款方式</Heading2>
                                <Heading2 style={styles.repayment}>{this.props.LOANMONEYIndex.repayTypeList.repayTypeStr ? this.props.LOANMONEYIndex.repayTypeList.repayTypeStr : '按月等本等息'}</Heading2>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => {
                            this.setState({
                                visible: true,
                            });
                            this.checkRepayBill()
                        }} style={styles.repayment_code}>
                            <Heading2 style={styles.repayment_detail}>查看还款计划</Heading2>
                        </TouchableOpacity>

                    </View>
                    <Btn onPress={() => {
                        this.goApplyItem();
                    }}>提交申请</Btn>
                </LayoutScroll>

                {/*  查看还款计划弹窗  */}
                {this.state.visible && <RepayPlanBillDialog
                    callback={(value) => {
                        // this.bindServiceId(value);
                    }}
                    data={this.props.LOANMONEYIndex.repayPlan}
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                />}

            </Layout>
        );
    }
};

// 定义标题内容
LoanMoneyScreen.options = {
    page: {
        flex: 1,
        backgroundColor: '#F00',
    },
    bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: true,
    },
    topBar: {
        title: {
            text: '借款',
            alignment: 'center',
        },
    },
};

// 定义标题
LoanMoneyScreen.options = navigationConfig('借款');
// 定义样式
const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        height: 115,
        backgroundColor: 'white',
        flexDirection: 'column',
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
        fontWeight:'bold',
    },

    selectHospitalText: {
        width: 100,
        fontSize: 17
    },
    selectHospitalPostext: {
        position: 'absolute',
        right: 35.5
    },
    selectFontColor: {
        fontSize: 17,
        color: '#9E9E9E'
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
        height: 120,
    },
    textInputTitle: {
        flex: 1,
        height: 54,
        fontSize: 44,
        color: '#212121',
        marginTop: 10.5,
        padding: 0,
        opacity: 0.3,
        marginLeft: 12,
    },
    container_phone: {
        flex: 1,
        marginTop: 20,
        color: 'white',
        height: 120,
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
    service: {
        width: 343,
        height: 49,
        borderRadius: 24.5,
        backgroundColor: '#CCCCCC',
        alignSelf: 'center',
        marginBottom: 60.5,
    },

    serviceText: {
        lineHeight: 49,
        fontSize: 25,
        color: '#FFFFFF',
        alignSelf: 'center',

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
    repayment_detail: {
        position: 'absolute',
        right: 16,
        fontSize: 14,
        color: '#F64976',
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
    repayment: {
        position: 'absolute',
        right: 16,
        fontSize: 17,
    },
    loan_apply_button: {
        width: 343,
        height: 49,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -160,
    },
    loan_apply_text: {
        lineHeight: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
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
        fontWeight:'bold',
    },
    extraLabel: {
        fontSize: 17,
        position: 'absolute',
        right: 20,
        fontWeight:'500',
    },

});



export default connect(({ LOANMONEYIndex }) => ({ LOANMONEYIndex }))(LoanMoneyScreen);
