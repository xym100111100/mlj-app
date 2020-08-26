import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Heading3, Heading2 } from '../widget/Text';
import { Dialog, Touchable, Btn } from '../componments';
import { Images } from '../common/images';
import DashSecondLine from '../widget/DashSecondLine';
import { money } from '../utils/filters';

var width = Dimensions.get('window').width; //full width

// 跳转组件
export default ({ onClose, data, title = '信息确认', callback }) => {
    const [value, updateValue] = useState('');
    const { serviceFeeAmtYuan, totalAmtYuan, debtAmtYuan, debtplan } = data;
    return (
        <Dialog onClose={onClose}>
            <View style={styles.pages}>

                <View style={styles.contract_close} >
                    <Heading3 style={styles.contract_close_text}>还款计划</Heading3>
                    <Touchable onPress={onClose} style={styles.close_img}>
                        <Image style={styles.close_img} source={Images.cashier.Close} />
                    </Touchable>
                </View>

                {/* <View style={styles.text_center}>
                    <Heading2 style={styles.text_color_money}>{money(totalAmtYuan)}</Heading2>
                </View>

                <View style={styles.moneyBen}>
                    <Heading2 style={styles.text_money_fee}>含本金{money(debtAmtYuan)} ，息费总额 {money(serviceFeeAmtYuan)} </Heading2>
                </View> */}

                <View style={styles.back_list}>
                    <Heading3 style={styles.text_index}>期数</Heading3>
                    <Heading3 style={styles.text_index_money}>金额</Heading3>
                    <Heading3 style={styles.text_index_money_date}>还款时间</Heading3>
                </View>

                <View style={styles.pages_list}>

                    <FlatList
                        data={debtplan}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) =>
                            <View style={styles.list_text}>
                                <Heading3 style={styles.list_text_index}>{item.currentPeriod}</Heading3>
                                <Heading3 style={styles.list_text_index_two}>{money(item.totalAmtYuan)}</Heading3>
                                <Heading3 style={styles.text_date_style}>{item.endDateStr}</Heading3>
                            </View>
                        }
                    />

                </View>
            </View>
        </Dialog>
    );

};


// 定义样式
const styles = StyleSheet.create({
    pages: {
        width: 325,
        height: 497.5,
        borderRadius: 2,
        backgroundColor: '#fff',
        position: 'absolute',
    },
    text_center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    text_color_money: {
        fontSize: 24,
        color: '#F64976',
        fontWeight: 'bold'
    },
    text_index: {
        width: 80,
        fontSize: 14,
        fontWeight: 'bold',
    },
    text_index_money: {
        width: 100,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 25,
    },
    text_index_money_date: {
        width: 140,
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 38,
    },
    text_money_fee: {
        fontSize: 14.5,
        color: '#A7A7A7'
    },
    pages_list: {
        width: 325,
        height: 375,
        marginHorizontal: 25,
    },
    list_text: {
        flexDirection: 'row',
        marginTop: 7.5,
        marginBottom: 8,
    },
    list_text_index: {
        width: 80,
        fontSize: 14,
        color: '#A7A7A7',
        marginLeft: 10,
    },
    list_text_index_two: {
        width: 100,
        fontSize: 14,
        color: '#A7A7A7',
        marginLeft: 15,
    },
    moneyBen: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    text_date_style: {
        width: 130,
        fontSize: 14,
        color: '#A7A7A7',
        marginRight: 20,
    },
    contract_close: {
        height: 60,
        alignContent: 'center',
        alignItems: 'center',
    },
    contract_close_text: {
        alignSelf: 'center',
        color: '#343434',
        fontWeight: 'bold',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 60,
    },

    ...Platform.select({
        ios: {
            close_img: {
                width: 24,
                height: 24,
                right: 10,
                top: 10,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            },
        },
        android: {
            close_img: {
                width: 30,
                height: 30,
                right: 10,
                top: 10,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            },
        },
    }),

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


});
