import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native'

import { Layout, LayoutScroll, Touchable, Btn } from '../../componments/index';
import { connect } from 'react-redux';
import Router from '../../Router';


// 银行卡列表弹窗
import BankListDialog from '../../container/BankListDialog';

import { Heading2, Heading3 } from '../../widget/Text'
import { Images } from '../../common/images';

class MessageSureScreen extends Component<Props, State>{

    constructor(props: Object) {
        super(props);
        this.state = {
            bankStatus:false,
        }

    }


    render() {
        return (
            <LayoutScroll>
                <View style={styles.pages}>
                    <View style={styles.container}>
                        <View style={styles.container_text_top}>
                            <Heading2 >还款金额（元）</Heading2>
                        </View>

                        <View>
                            <Heading3 style={styles.container_text_money}>165000.3</Heading3>
                        </View>

                    </View>

                    {/* 选择 */}

                    <View style={styles.container_bank}>

                        <View style={styles.message_code}>
                            <Heading2 style={styles.message_bank_text}>还款银行卡</Heading2>
                            <Heading2 style={styles.repayment_bank} >招商银行（6666）</Heading2>
                            <Image style={styles.bankImg} source={ Images.loan.Cellarrow } />
                        </View>
                    </View>


                    <View style={styles.container_phone}>

                        <View style={styles.message_code}>
                            <Heading2 style={styles.pages_message_text}>应还总金额</Heading2>
                            <Heading2 style={styles.repayment} >¥ 989991.45</Heading2>
                        </View>

                        <View style={styles.message_code}>
                            <Heading2 style={styles.pages_message_text}>应还本金</Heading2>
                            <Heading2 style={styles.repayment} >¥ 195555</Heading2>
                        </View>

                        <View style={styles.message_code}>
                            <Heading2 style={styles.pages_message_text}>罚息</Heading2>
                            <Heading2 style={styles.repayment} >¥ 0.4545</Heading2>
                        </View>

                        <View style={styles.message_code}>
                            <Heading2 style={styles.pages_message_text}>综合费用</Heading2>
                            <Heading2 style={styles.repayment} >¥ 166.74</Heading2>
                        </View>
                    </View>


                </View>

                {/* 确认还款 */}
                <Btn onPress={() => {
                    this.goAllRepaySureBill();
                }} >确认还款</Btn>

                {/* 银行卡选择 */}

                {this.state.bankStatus && <BankListDialog
                    callback={(value) => {
                        // 银行卡数据更新处理
                    }}
                    onClose={() => {
                        this.setState({
                            bankStatus: false,
                        });
                    }}
                />}



            </LayoutScroll>

        )

    }


}
// 定义样式
const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    container: {
        flex: 1,
        marginTop: 12, //去除状态栏图标
        color: 'white',
        height: 139,
        backgroundColor: 'white'
    },
    container_text_top: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 23.5,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    container_text_money: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#F64976',
        position: 'absolute',
        left: 107,
        top: 12
    },
    container_bank: {
        flex: 1,
        marginTop: 12,
        color: 'white',
        height: 60,
    },
    textInputTitle: {
        height: 53.5,
        fontSize: 44,
        color: '#212121',
        marginTop: 10.5,
        position: 'absolute',
        left: 21.5,
        opacity: 0.3
    },
    container_phone: {
        flex: 1,
        color: 'white',
        height: 120,
        marginTop: 12,
        marginBottom: 230,
        backgroundColor: '#F7F7F7'
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
    pages_message_text: {
        width: 120,
        fontSize: 17,
        color: '#9E9E9E'
    },
    message_bank_text: {
        width: 120,
        fontSize: 17
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
        marginTop: 1,
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
    repayment_bank:{
        position: 'absolute',
        right: 25,
        fontSize: 17,
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
        bottom: 20,
    },
    loan_apply_text: {
        lineHeight: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    close_img: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 15,
        marginTop: 14.5,
    },
    close_text: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
        fontSize: 16,
        color: '#343434',
        fontWeight: 'bold',
    },
    back_list: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 25,
        marginTop: 20,
    },
    back_list_name: {
        width: 110,
        fontSize: 14,
        fontWeight: 'bold',
    },
    back_list_item: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A7A7A7',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },

})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 18.5,
        paddingHorizontal: 5,
        color: 'black',
        paddingRight: 60, // to ensure the text is never behind the icon
        marginLeft: 100,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 18.5,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
const periodSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 18.5,
        paddingHorizontal: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginLeft: 100,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 18.5,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


export default MessageSureScreen
