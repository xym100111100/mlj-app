/*
* 对于那些页面可能很长，需要滚动条；或者需要用户手动刷新的视图，都用这个组件包裹
* */
import React from 'react';
import {useState} from 'react';
import {StyleSheet, StatusBar, RefreshControl, ScrollView, SafeAreaView, View} from 'react-native';
import {Loading} from 'react-native-easy-loading';

let fn = () => {
};
export default LayoutScroll = ({
                                 style,
                                 children,
                                 bgColor = '#FFF',
                                 pullRefresh = false,
                                 callback = fn,
                                 showStatusBar = false,
                               }) => {
  // 定义state
  const [refreshing, updateRefreshing] = useState(false);
  
  // 定义方法
  const _onRefresh = () => {
    updateRefreshing(true);
    pullRefresh && callback(res => {
      updateRefreshing(false);
    });
  };
  
  return (
    <SafeAreaView
      style={styles.safeViewStyle}>
      {showStatusBar && <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"/>}
      <ScrollView
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          pullRefresh && <RefreshControl
            refreshing={refreshing}
            onRefresh={_onRefresh}
          />
        }
        style={[styles.wrap, style]}>
        
        <View style={styles.wrapInner}>
          {/*如果有数据请求，每个页面都有一个Loading*/}
          <Loading/>
          {/*包裹的内容*/}
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 包裹组件样式
const styles = StyleSheet.create({
  safeViewStyle: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapInner: {
    flex: 1,
  },
});
