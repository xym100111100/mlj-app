import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Heading3 } from '../widget/Text';
import { Dialog, Touchable, Btn } from '../componments';
import { Images } from '../common/images';
import DashSecondLine from '../widget/DashSecondLine'

const width = Dimensions.get('window').width; //full width

// 跳转组件
export default ({ onClose, data,title = '信息确认', nickName = '张三', idCard = '411728738784828393', overDate = '2032/05/23', callback }) => {
    const [value, updateValue] = useState('');
    const { idBackUrl, idFrontUrl, backUserInfo, frontUserInfo } = data ;
    const baseFrontUrl = { uri: idFrontUrl }
    const baseBackUrl = { uri: idBackUrl }


    return (
        <Dialog onClose={onClose}>
            <View style={styles.pages}>
                <View style={styles.contract_close}>
                    <Heading3 style={styles.contract_close_text}>{title}</Heading3>
                    <Touchable onPress={onClose} style={styles.closeImg}>
                        <Image style={styles.closeImg} source={Images.authname.DialogClose} />
                    </Touchable>
                </View>

                <View style={styles.dash_row}>
                    <DashSecondLine style={styles.alert_dash_text} lineWidth={0.5} />
                </View>

                <View style={styles.alert_content_qx}>
                    <Heading3 style={styles.alert_text_bank}>姓名</Heading3>
                    <Heading3 style={styles.alert_content_text} >{ frontUserInfo ? frontUserInfo.name : nickName}</Heading3>
                </View>

                <View style={styles.alert_dash}>
                    <DashSecondLine style={styles.alert_dash_text} lineWidth={0.5} />
                </View>


                <View style={styles.alert_content_qx}>
                    <Heading3 style={styles.alert_text_bank}>身份证号码</Heading3>
                    <Heading3 style={styles.alert_content_text} >{  frontUserInfo ? frontUserInfo.number : idCard}</Heading3>
                </View>

                <View style={styles.alert_dash}>
                    <DashSecondLine style={styles.alert_dash_text} lineWidth={0.5} />
                </View>

                <View style={styles.alert_content_qx}>
                    <Heading3 style={styles.idText}>身份证有效期</Heading3>
                    <Heading3 style={styles.alert_content_text} >{  backUserInfo ? backUserInfo.timelimit :  overDate}</Heading3>
                </View>

                <View style={styles.alert_dash}>
                    <DashSecondLine style={styles.alert_dash_text} lineWidth={0.5} />
                </View>

                <View style={styles.alert_img}>
                    <Image style={styles.front_reverse_left}
                                    source={idFrontUrl !== '' ? baseFrontUrl : Images.authname.Idfront
                                } />
                    <Image style={styles.front_reverse}
                                source={idBackUrl !== '' ? baseBackUrl : Images.authname.Idreverse
                            } />
                </View>

                <Btn onPress={() => {
                    callback(value);
                }}>确认</Btn>

            </View>
        </Dialog>
    );

};


// 定义样式
const styles = StyleSheet.create({

    pages: {
        width: width,
        height: 440,
        backgroundColor: '#F0F0F0',
        position: 'absolute',
        bottom: 0,
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
    dash_row: {
        flexDirection: 'row',
        opacity: 0.1
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
        fontWeight: 'bold'
    },
    alert_dash: {
        flexDirection: 'row',
        opacity: 0.1,
        marginHorizontal: 16,
    },
    alert_dash_text: {
        flex: 1,
        backgroundColor: '#E8E8E8'
    },
    alert_text_bank: {
        flexDirection: 'row',
        fontSize: 17,
        color: '#757575',
    },
    alert_img: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom:10
    },
    closeImg: {
        width: 24,
        height: 24,
        right: 10,
        top: 10,
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
    },
    front_reverse_left: {
        width: 154.5,
        height: 97.5,
        marginRight: 34
    },
    front_reverse: {
        width: 154.5,
        height: 97.5,
    },
    idText: {
        flexDirection: 'row',
        fontSize: 17,
        color: '#757575',
    }


});
