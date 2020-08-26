// 联系客服弹窗
import React, {Component} from 'react';
import {Image, StyleSheet, ImageBackground, View} from 'react-native';
import {Heading3} from '../widget/Text';
import {Images} from '../common/images';
import {Touchable} from '../componments';

export default CustomerModal = ({onClose, makeCall}) => (
    <View style={styles.cModal}>
        <Touchable style={styles.mask} onPress={onClose}>
            <View style={styles.maskInner}></View>
        </Touchable>
        <View style={styles.cModalBody}>
            <View style={{width: 292.5, height: 304.5, borderRadius: 2, backgroundColor: '#fff'}}>
                <Image
                    style={styles.serviceBg}
                    source={Images.my.CustomerBg}/>
                <Heading3 style={styles.serviceLayerText}>
                    我们将会全心全意为您提供满一周到的咨询服务，也希望您能支持和监督我们的服务！
                </Heading3>
                <View style={styles.alter_button_left}>
                    <Touchable onPress={makeCall}>
                        <ImageBackground
                            style={styles.serviceButtonBg}
                            source={Images.my.CustomerBtn}>
                            <Heading3 style={styles.serviceButtonText}>拨打客服热线</Heading3>
                        </ImageBackground>
                    </Touchable>
                </View>
                <View style={styles.alter_button_right}>
                    <Touchable onPress={onClose}>
                        <Heading3 style={{color: '#F64976', fontSize: 14, fontWeight: '500'}}>稍后再说</Heading3>
                    </Touchable>
                </View>
            </View>
        </View>
    </View>

);

const styles = StyleSheet.create({
    cModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    mask: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    maskInner:{
        flex:1,
        backgroundColor: '#000',
        opacity: 0.46,
    },
    cModalBody: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    service: {
        width: 102,
        height: 32,
        borderRadius: 16.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#585F6D',
        alignSelf: 'center',
    },
    serviceImg: {
        width: 16,
        height: 16,
        alignItems: 'center',
    },
    serviceText: {
        fontSize: 12,
        marginLeft: 5,
        color: '#585F6D',
    },
    serviceLayerText: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: 240.5,
        height: 63,
        marginHorizontal: 20,
        marginBottom: 21.5,
        fontSize: 14,
        color: '#757575',
    },
    serviceButtonBg: {
        width: 227,
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceButtonText: {
        justifyContent: 'center',
        lineHeight: 49,
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
    },
    alertborder: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 53,
        marginHorizontal: 16,
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#DDDDDD',
    },
    serviceBg: {
        width: 292.5,
        height: 103.5,
        justifyContent: 'center',
    },
    alter_button_right: {
        marginTop: 10.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alter_button_left: {
        width: 227,
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
});

