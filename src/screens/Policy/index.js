import React, { Component } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Btn, Layout } from '../../componments/index';
import Line from '../../componments/Line';
import Storage from '../../utils/storage';
import RouterLogin from '../../routers/login';
import { navigationConfig } from '../../common/navigation';
// 跳转组件
import Picker from 'ht-react-native-picker';
import { connect } from 'react-redux';
import Router from '../../Router';

class Policy extends Component<Props, State> {
    constructor(props: Object) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }



    componentDidMount() {
        this.initWebView();
    }

    // webview 地址
    initWebView() {
        const { dispatch } = this.props;
        dispatch({
            type: 'initPolicyUrl',
            payload: {
            },
            callback: (res) => {

            },
        });
    }

    // goWebview

    goWebView(item) {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectPolicyUrl',
            payload: {
                item
            },
            callback: (res) => {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: Router.WEB,
                    },
                });
            },
        });
    }


    render() {
        const { policyUrlList } = this.props.NSPolicy;

    
        const arr = [1,2,3];
        return (
            <Layout>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <FlatList
                        data={policyUrlList}
                        renderItem={({ item, index }) => {
                            const {  contractName } = item;
                            return (
                                <Line
                                border={true}
                                textStyle={styles.lineText}
                                extraStyle={styles.lineExtraText}
                                text={contractName}
                                onPress={() => {
                                    this.goWebView(item)
                                }}
                                arrow={true} />
                            );
                        }}
                    />
                       
                    </View>
                </View>
            </Layout>
        );
    }

}

// 定义标题内容
Policy.options = navigationConfig('查看协议');

// 定义样式
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    line: {
        height: 60,
    },
    lineText: {
        fontSize: 17,
        width:200,
        color: '#212121',
    },
    lineExtraText: {
        fontSize: 17,
        color: '#9E9E9E',
    },
    // lineTop: {
    //     marginTop: 12,
    // },

});

export default connect(({ NSPolicy }) => ({ NSPolicy }))(Policy);

