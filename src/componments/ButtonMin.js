import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {width} from '../utils/screen';
import {Images} from '../common/images';
import Touchable from './Touchable';

export const Button = ({text, children, style, type = 'default', textStyle, ...rest}) => {

    const ImgUrl = type === 'default' ? Images.home.BtnPrimary : Images.home.BtnGray;

    return (
        <ImageBackground style={styles.btnBg} source={ImgUrl}>
            <Touchable style={[styles.button, style]} {...rest}>
                <Text style={[styles.text, textStyle]}>{text || children}</Text>
            </Touchable>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnBg: {
        width: 197,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
});

export default Button;
