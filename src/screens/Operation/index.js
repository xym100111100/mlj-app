import React, { Component, Fragment } from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, FlatList, StatusBar, Image, TouchableHighlight, TouchableOpacity, ScrollView, RefreshControl, ImageBackground } from 'react-native'

import { screen, system } from '../../utils/common'

import { Heading1, Heading2, Heading3, Paragraph } from '../../widget/Text'

import TextInputWidget from '../../widget/TextInputWidget'
import NavigationItem from '../../widget/NavigationItem'
import { navigationConfig } from '../../common/navigation';

import color from '../../widget/color'
import DashSecondLine from '../../widget/DashSecondLine'

import ItemDialog from '../../container/ItemDialog';
import { LayoutScroll, Btn } from '../../componments/index';



// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import Toast from 'react-native-simple-toast';

import RNPickerSelect from 'react-native-picker-select';
import { ToastShow } from '../../utils/toast';


class ItemScreen extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            isRefreshing: false,
            visible: false,
            name: '请输入姓名',
            hospitalName: '',
            selectOperationName: '',
            operationProjectNo: '',
            operationId: '',
            parentNo: '10001',
            operationList: [
            ],
            color: '#212121',
        }

    }



    componentDidMount() {
        // 初始化项目列表
        this.getOperationItem();

    }

    componentWillUnmount() {
    }

    // 获取当前用户选择的项目  并判断是否进入下一级页面
    getOperationName(item) {

        this.setState({
            operationProjectNo: item.operationProjectNo,
        })

        const { dispatch } = this.props;
        // 更改reducer选择项目
        dispatch({
            type: 'OperationSelectChild',
            payload: { ...item },
            callback: () => {
                // Navigation.push(this.props.componentId, {
                //     component: {
                //         name: Router.LOAN,
                //     },
                // });
            }
        });
    }

    // 获取当前的子项目
    getOperationItem() {
        const { dispatch } = this.props;

        dispatch({
            type: 'initApplyItemInfo',
            payload: {
                // payload 里面是请求携带的参数
                parentNo: this.props.LOANMONEYIndex.operation['level1'].operationProjectNo,
            },
            callback: (res) => {
                if (res.code == 0) {
                    // 获取所有项目
                    this.setState({
                        operationList: res.data
                    })

                    // Toast.show('获取手术项目成功');
                } else {
                    // Toast.show('获取手动项目失败');
                }
            },
        });
    }

    // 确认当前选择的医院  返回到上一个页面并带上当前选择的值

    sureHostipal() {
        // 判断当前是否选择了项目
        const { operationProjectNo } = this.state;
        if(!operationProjectNo){
            ToastShow('请选择手术项目');
            return false;
        }
        const { clientInfo } = this.props.NSIndex;
        const { creditLinesYuan } = clientInfo;
        if(creditLinesYuan > 100){
            Navigation.push(this.props.componentId, {
                component: {
                    name: Router.LOANCONFIRM,
                },
            });
        }else{
            Navigation.push(this.props.componentId, {
                component: {
                    name: Router.LOAN,
                },
            });
        }
       
    }
    // 手动输入的项目
    writeOperationItem(oname) {

        if (!oname) {
            Toast.show('请输入您的项目');
            return false;
        }

        const { dispatch } = this.props;

        dispatch({
            type: 'initAddOperationItemInfo',
            payload: {
                // payload 里面是请求携带的参数
                operationProjectName: oname,
                parentNo: this.props.LOANMONEYIndex.operation['level1'].operationProjectNo,
            },
            callback: (res) => {
                if (res.code == 0) {
                    // 提交页面
                    Navigation.push(this.props.componentId, {
                        component: {
                            name: Router.OPERATIONSECOND,
                        },
                    });
                    Toast.show('手动创建项目成功');
                } else {
                    Toast.show('手动创建项目失败');
                }
            },
        });

    }


    render() {
        const { operationList, operationProjectNo } = this.state;
        return (
            <Layout style={{ position: 'relative', flex: 1, }}
                showStatusBar={true}
            >
                <LayoutScroll style={styles.indexScroll}>
                    <View style={styles.container}>

                        <FlatList
                            data={operationList}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={styles.message_code} id={item.operationProjectNo} >
                                        <TouchableOpacity onPress={() => { this.getOperationName(item) }} >
                                            <Heading2 style={[styles.gesview, { color: item.operationProjectNo == operationProjectNo ? '#F64976' : this.state.color }]}   > {item.operationProjectName} </Heading2>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.line_text}>
                                        <DashSecondLine style={styles.dash_text} lineWidth={0.5} dashStyle={'dashed'} />
                                    </View>
                                </View>
                            }

                        />
                        {/* 手动添加项目 */}
                        <View>
                            <View style={styles.message_code}  >
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        visible: true,
                                    });
                                }} style={styles.gesview} title={'Open Layer'} >
                                    <Heading2 style={styles.gesview}   > 手动输入项目 </Heading2>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.line_text}>
                                <DashSecondLine style={styles.dash_text} lineWidth={0.5} dashStyle={'dashed'} />
                            </View>
                        </View>
                    </View>
                    <Btn style={styles.submit_button} onPress={() => {
                        this.sureHostipal();
                    }}>提交</Btn>

                </LayoutScroll>

                {/*    绑定手术项目弹框*/}
                {this.state.visible && <ItemDialog
                    title='手动输入项目'
                    placeholder='请输入您的手术项目'
                    callback={(value) => {
                        this.writeOperationItem(value);
                    }}
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                />}


            </Layout>

        )

    }


}
ItemScreen.options = navigationConfig('手术项目');
// 定义样式
const styles = StyleSheet.create({
    indexScroll: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#F5F5F5',
    },
    line_text: {
        flexDirection: 'row',
        opacity: 0.2
    },
    dash_text: {
        flex: 1,
        marginLeft: 19,
        backgroundColor: '#E8E8E8'
    },
    container: {
        flex: 1,
        marginTop: 11.5,
        backgroundColor: '#F7F7F7'
    },
    gesview: {
        width: 120,
        fontSize: 17,
    },
    message_code: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 56,
        backgroundColor: '#FFF',
    },
    submit_button: {
        position: 'absolute',
        bottom: 10,
    }

})

export default connect(({ LOANMONEYIndex, NSApplyitem,NSIndex }) => ({ LOANMONEYIndex, NSApplyitem,NSIndex }))(ItemScreen);


