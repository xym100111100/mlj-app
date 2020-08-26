import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Btn, Layout } from '../../componments/index';
import Line from '../../componments/Line';
import { navigationConfig } from '../../common/navigation';
import Picker from 'ht-react-native-picker';
import { ToastShow } from '../../utils/toast';
import { connect } from 'react-redux';





class Comment extends Component<Props, State> {
    constructor(props: Object) {
        super(props);
        this.state = { 
            isRefreshing: false,
            cacheSize: "",
            unit: "",
            periodValue: '请选择',
            count: 0,
            commentText: '',
            commentTypeData: [],
        };
    }

    componentDidMount() {
        // this.getCache();
        this.initCommentType()
    }


    initCommentType() {
        const { dispatch } = this.props;
        dispatch({
            type: 'InitCommentType',
            callback: (res) => {
                if (res.code === 0) {
                    this.setState({
                        commentTypeData: res.data
                    })

                } else {
                    ToastShow(res.msg);
                }
            },
        });
    }

    CommentTypeSelect() {

        const data = this.state.commentTypeData.map(item=>item.opinionTypeName)
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '问题类型',
            pickerCancelBtnColor: [187, 187, 187, 1],
            pickerConfirmBtnColor: [246, 73, 118, 1],
            pickerData: data,
            onPickerConfirm: pickedValue => {
                this.setState({
                    periodValue: pickedValue,
                })

            },
            onPickerSelect: pickedValue => {
                this.setState({
                    selectContact: pickedValue,
                });
            },
        });
        Picker.show();
    }

    //清除缓存


    /*退出登录*/
    LoginOut() {
        // Storage.removeValue('token');
        // Navigation.setRoot(RouterLogin);
    }

    onComment = (value) => {
        this.setState({
            commentText: value,
            count: value && value.length ? value.length : 0
        })

    }

    componentWillUnmount(): void {
        if (window.timer) {
            clearTimeout(window.timer);
        }
    }

    submitComment() {
        const { dispatch } = this.props;
       
        if (this.state.periodValue === '请选择') {
            ToastShow('请选择反馈类型');
            return
        }
        if (!this.state.commentText) {
            ToastShow('请输入您问题或建议');
            return
        }
        let opinionTypeNo = ''
        this.state.commentTypeData.forEach(item=>{
            if(item.opinionTypeName == this.state.periodValue[0]){
                opinionTypeNo = item.opinionTypeNo
            }
        })

        dispatch({
            type: 'CommentSubmit',
            payload: {
                opinionTypeNo,
                opinionContent: this.state.commentText,
                opinionContentTitle: this.state.periodValue[0]
            },
            callback: (res) => {
                if (res.code === 0) {
                    ToastShow('感谢您的反馈，我们将尽快处理!');
                    window.timer = setTimeout(() => {
                        Navigation.pop(this.props.componentId);
                    }, 500);
                } else {
                    ToastShow(res.message);
                }
            },
        });
    }


    render() {
        const arrM = this.state.cacheSize + this.state.unit;
        return (
            <Layout>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <Line
                            style={[styles.lineTop, styles.line]}
                            arrow={true}
                            textStyle={styles.lineText}
                            onPress={this.CommentTypeSelect.bind(this)}
                            text={'问题类型'}
                            extraStyle={[styles.extraLabel, { color: '#212121' }]}
                            extra={this.state.periodValue}
                        />

                    </View>
                    <TextInput
                        style={styles.commentContent}

                        maxLength={300}
                        returnKeyType={'done'}
                        underlineColorAndroid={'transparent'}
                        clearTextOnFocus={true}
                        keyboardType={'numeric'}
                        placeholder={'请详细描述您的问题或建议，我们将及时跟进解决'}
                        onChangeText={this.onComment
                        }
                    >
                    </TextInput>
                    <View style={styles.conentnCont} >
                        <Text>{this.state.count}/300字</Text>
                    </View>
                    {/*按钮*/}
                    <View style={styles.btn} >
                        <Btn onPress={() => {
                            this.submitComment();
                        }}>提交</Btn>
                    </View>

                </View>
            </Layout>
        );
    }

}

// 定义标题内容
Comment.options = navigationConfig('意见反馈');

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
    commentContent: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    conentnCont: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingBottom: 10,
        height: 100
    },
    lineTop: {
        marginTop: 12,
    },
    btn: {
        position: 'absolute',
        bottom: 0
    }

});


export default connect(({ NSIndex, NSUser }) => ({ NSIndex, NSUser }))(Comment);
