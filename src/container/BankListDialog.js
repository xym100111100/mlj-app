import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Heading3 } from '../widget/Text';
import { Dialog, Touchable, Btn } from '../componments';
import { Images } from '../common/images';
import DashSecondLine from '../widget/DashSecondLine'
import { FlatList } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width; //full width

// 跳转组件
export default ({ onClose, data, callback, }) => {
    const [value, updateValue] = useState('');
    // 传当前银行卡列表数组
    const { bankList } = data;
    return (
        <Dialog onClose={onClose}>

            <View style={styles.pages}>


                <View style={styles.contract_close}>
                    <Heading3 style={styles.contract_close_text}>选择银行卡</Heading3>
                    <Touchable onPress={onClose} style={styles.closeImg}>
                        <Image style={styles.closeImg} source={Images.cashier.Close} />
                    </Touchable>
                </View>

                <View style={styles.page_dash_op}>
                    <DashSecondLine style={styles.dash_style} lineWidth={0.5} />
                </View>

                <FlatList
                    data={bankList}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                        <View>
                            <Touchable
                                onPress={() => {
                                    // 前往添加银行卡页面
                                    callback(item);
                                }}>
                            <View style={styles.alert_content_qx}>
                                <Image style={styles.bankIcon} source={{ uri: item.logo }} />
                                <Heading3 style={styles.bankLeftName}>{item.bankName} ({item.bankAccount4})</Heading3>
                            </View>
                            </Touchable>

                        <View style={styles.page_dash}>
                            <DashSecondLine style={styles.dash_style} lineWidth={0.5} />
                        </View>
                        </View>
                        }
                />
                <Touchable
                    onPress={() => {
                        // 前往添加银行卡页面
                        callback(2);
                    }}>
                    <View style={styles.alert_content_qx}>
                        <Image style={styles.bankIcon} source={Images.bank.add} />
                        <Heading3 style={styles.bankLeftName}>添加新的银行卡</Heading3>
                    </View>
                </Touchable>


            </View>
        </Dialog>
    );

};


// 定义样式
const styles = StyleSheet.create({

    pages: {
        width: width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
    },
    // bank list select
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
        fontWeight: '400',
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
        width: 24,
        height: 24,
        position: 'absolute',
        right: 0,
    },
    closeImg: {
        width: 24,
        height: 24,
        right: 16,
        top: 10,
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
    },
    bankIcon: {
        width: 32,
        height: 32,
        position: 'absolute',
        left: 0,
    },
    bankLeftName: {
        flexDirection: 'row',
        fontSize: 17,
        color: '#757575',
        position: 'absolute',
        left: 48,
    },
    page_dash_op: {
        flexDirection: 'row',
        opacity: 0.1
    },
    dash_style: {
        flex: 1,
        backgroundColor: '#E8E8E8',
        marginLeft: 46
    },
    page_dash: {
        flexDirection: 'row',
        opacity: 0.1,
        marginHorizontal: 16,
    }


});
