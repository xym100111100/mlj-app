import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {width} from '../utils/screen';
import Touchable from './Touchable';

export const Button = ({text, children, style, type = 'default', textStyle, ...rest}) => {
    let bgColor = {
        backgroundColor: type !== 'default' ? '#CCC' : '#F64976',
    };
    return (
        <View style={styles.btnBox}>
            <Touchable style={[styles.button, bgColor, style]} {...rest}>
                <Text style={[styles.text, textStyle]}>{text || children}</Text>
            </Touchable>
        </View>
    );

};

const styles = StyleSheet.create({
    btnBox: {
        width,
        height: 70,
        paddingVertical:10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    button: {
        width: 343,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
});

export default Button;
