import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dialog, Touchable } from '../componments';
import TextInputWidget from '../widget/TextInputWidget';

// 跳转组件
export default ({ onClose, title = '请输入项目', placeholder = '请输入您需要的项目', callback }) => {
    const [value, updateValue] = useState('');
    return (
        <Dialog onClose={onClose}>
            <View style={styles.layer}>
                <Text style={styles.layerTitle}>{title}</Text>
                <View style={styles.layerInput}>
                    <TextInput
                        placeholderTextColor={'#bbb'}
                        maxLength={20}
                        returnKeyType={'done'}
                        enablesReturnKeyAutomatically={true}
                        style={styles.textInputTitle}
                        placeholder={placeholder}
                        onChangeText={(e) => {
                            updateValue(e);
                        }}
                    >
                    </TextInput>
                </View>
                <View style={styles.layerBtn}>
                    <Touchable onPress={onClose} style={styles.btnLeft}>
                        <Text style={styles.btnLeftText}>取消</Text>
                    </Touchable>
                    <Touchable onPress={() => {
                        callback(value);
                    }} style={styles.btnRight}>
                        <Text style={styles.btnRightText}>确定</Text>
                    </Touchable>
                </View>
            </View>
        </Dialog>
    );

};


// 定义样式
const styles = StyleSheet.create({

    layer: {
        width: 293,
        height: 209.5,
        borderRadius: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 20.5,
    },
    layerTitle: {
        height: 22.5,
        lineHeight: 22.5,
        marginTop: 6.5,
        marginBottom: 24,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    layerInput: {
        width: 261,
        height: 53,
        marginBottom: 23,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#DDD',
        backgroundColor: '#F7F7F7',
    },
    textInputTitle: {
        fontSize: 14,
        color: '#212121',
        padding: 0,
    },
    layerBtn: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 11,
        justifyContent: 'space-between',
    },
    btnLeft: {
        width: 100.5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F64976',
    },
    btnLeftText: {
        fontSize: 16,
        color: '#F64976',
    },
    btnRight: {
        width: 100.5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F64976',
        backgroundColor: '#F64976',
    },
    btnRightText: {
        fontSize: 16,
        color: '#FFF',
    },


});
