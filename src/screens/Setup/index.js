import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Btn, Layout } from '../../componments/index';
import Line from '../../componments/Line';
import Storage from '../../utils/storage';
import RouterLogin from '../../routers/login';
import { navigationConfig } from '../../common/navigation';


class Setup extends Component<Props, State> {
    constructor(props: Object) {
        super(props);
        this.state = {
            isRefreshing: false,
            cacheSize: "",
            unit: "",
        };
    }

    componentDidMount() {
        // this.getCache();
    }

  
    //清除缓存


    /*退出登录*/
    LoginOut() {
        Storage.removeValue('token');
        Navigation.setRoot(RouterLogin);
    }


    render() {
        const arrM = this.state.cacheSize + this.state.unit;
        return (
            <Layout>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <Line
                            style={[styles.lineTop, styles.line]}
                            border={true}
                            extra={'22M'}
                            textStyle={styles.lineText}
                            // onPress={ this.clearMemCache() }
                            extraStyle={styles.lineExtraText}
                            text={'清除缓存'} />
                        <Line
                            style={styles.line}
                            border={true}
                            extra={'1.0.0'}
                            text={'当前版本'} />
                    </View>
                    {/*按钮*/}
                    <Btn onPress={this.LoginOut} type={'grey'}>退出账号</Btn>
                </View>
            </Layout>
        );
    }

}

// 定义标题内容
Setup.options = navigationConfig('设置');

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
        color: '#212121',
    },
    lineExtraText: {
        fontSize: 17,
        color: '#9E9E9E',
    },
    lineTop: {
        marginTop: 12,
    },

});


export default Setup;
