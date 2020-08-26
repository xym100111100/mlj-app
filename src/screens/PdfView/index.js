import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PDFView from 'react-native-view-pdf';
import { navigationConfig } from '../../common/navigation';
import { Layout } from '../../componments';

class Web extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectPolicyUrl } = this.props.NSPolicy;
    const resourceType = 'url';
    const resources = {
      url: selectPolicyUrl.url ,
    };

    return (
      <View style={{ flex: 1 }}>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={  resources[resourceType]  }
          resourceType={resourceType}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      </View>
    );
  }
}

// 定义标题
Web.options = navigationConfig('合同&协议');

// 定义样式
const styles = StyleSheet.create({
  web: {
    flex: 1,
    backgroundColor: '#f00',
  },
  page: {
    flex: 1,
  },
});


export default connect(({ NSBill, NSPolicy }) => ({ NSBill, NSPolicy }))(Web);
