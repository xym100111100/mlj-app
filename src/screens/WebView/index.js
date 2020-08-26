import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { navigationConfig } from '../../common/navigation';
import { Layout } from '../../componments';

class Web extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectPolicyUrl } = this.props.NSPolicy;
    return (
      <WebView
        useWebKit={true}
        scrollEnabled={true}
        bounces={true}
        mixedContentMode={'always'}
        style={styles.page} source={{ uri: selectPolicyUrl.url }} />
    );
  }
}

// 定义标题
Web.options = navigationConfig('隐私&协议');

// 定义样式
const styles = StyleSheet.create({
  web: {
    flex: 1,
    backgroundColor: '#f00',
  },
  page: {
    flex: 1,
    overflow: 'hidden',
  },
});


export default connect(({ NSBill, NSPolicy }) => ({ NSBill, NSPolicy }))(Web);
