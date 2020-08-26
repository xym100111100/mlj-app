import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {getPixel, width} from '../utils/screen';
import {Touchable} from '../componments';

export default TextInputWidget = ({
                                    type = 'default',
                                    verifyTxt = '获取验证码',
                                    margin = false,
                                    title,
                                    disable = false,
                                    value = '',
                                    onPress,
                                    callback,
                                    placeholder,
                                    placeholderTextColor = '#bbb',
                                    ...rest
                                  }) => {
  
  const [val, updateVal] = useState(value);
  
  let RenderTextInput = <TextInput
    defaultValue={val}
    numberOfLines={1}
    maxLength={20}
    returnKeyType={'done'}
    enablesReturnKeyAutomatically={true}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    style={styles.input}
    onChangeText={(e) => {
      updateVal(e);
      callback && callback(e);
    }}
    {...rest}
  />;
  if (disable) {
    RenderTextInput = <Text style={styles.inputText}>{value}</Text>;
  }
  
  return (
    <View style={[styles.inputControl, margin ? styles.inputControlMargin : {}]}>
      <View style={styles.row}>
        <Text style={styles.label}>{title}</Text>
        <View style={[styles.inputBox, margin ? styles.inputBoxNoBorder : {}]}>
          {RenderTextInput}
          {type === 'verify' && <Touchable style={styles.verifyBox} onPress={() => {
            onPress && onPress();
          }}>
            <Text style={styles.verifyText}>{verifyTxt}</Text>
          </Touchable>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputControl: {
    width,
    height: 60,
    backgroundColor: '#fff',
  },
  inputControlMargin: {
    marginBottom: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 120,
    paddingLeft: 16,
    fontSize: 17,
    color: '#212121',
  },
  inputBox: {
    flex: 1,
    height: 60,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F0F0F0',
    borderBottomWidth: getPixel(1),
    
  },
  inputBoxNoBorder: {
    borderBottomWidth: 0,
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 17,
    color: '#212121',
  },
  inputText: {
    lineHeight: 60,
    fontSize: 17,
    color: '#bbb',
  },
  
  // 手机验证码
  verifyBox: {
    flex: 1,
    alignItems: 'center',
    width: 113,
    height: 36,
    marginLeft: 10,
    marginRight: -16,
    borderLeftWidth: getPixel(1),
    borderColor: '#f1f1f1',
    
  },
  verifyText: {
    color: '#F64976',
    fontSize: 16,
    lineHeight: 36,
  },
});
