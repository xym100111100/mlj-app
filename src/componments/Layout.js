/*
* 所有在一个页面中能展示的视图，都用此组件进行包裹；
* */
import React from 'react';
import {StyleSheet, SafeAreaView, View, StatusBar} from 'react-native';
import {Loading} from 'react-native-easy-loading';

export default Layout = ({children, style, showStatusBar = false, bgColor = '#fff'}) => {
    let safeViewStyle = {
        flex: 1,
        backgroundColor: bgColor,
    };
    return (
        <SafeAreaView style={[safeViewStyle, style]}>
            {showStatusBar && <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"/>}
            <View style={styles.wrap}>
                {/*如果有数据请求，每个页面都有一个Loading*/}
                <Loading/>
                {/*包裹的内容*/}
                <View style={styles.wrapInner}>{children}</View>
            </View>
        </SafeAreaView>
    );
};

// 包裹组件样式
const styles = StyleSheet.create({
    wrap: {
        flex: 1
    },
    wrapInner: {
        flex: 1,
    },
});
