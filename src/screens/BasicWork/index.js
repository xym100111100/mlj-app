import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image } from 'react-native'

import { Heading2, Heading3 } from '../../widget/Text'
import TextInputWidget from '../../widget/TextInputWidget'
import { Btn, Layout, LayoutScroll, Line, Touchable } from '../../componments';
import { navigationConfig } from '../../common/navigation';
// 跳转组件
import Router from '../../Router';
import { Navigation } from 'react-native-navigation';
import Picker from 'ht-react-native-picker';
import { connect } from 'react-redux';
import { getPixel } from '../../utils/screen';
import { ToastShow,ToastLoadingShow ,ToastLoadingHide} from '../../utils/toast';
import { Images } from '../../common/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

// 城市列表
import area from './data_city.json';
//行业
import industry from './industry.json';



class BasicWorkScreen extends Component<Props, State>{
    constructor(props: Object) {
        super(props);
        this.state = {
            cityTypeList: [],
            cityTypeSelectText: '请选择您所居住地区',
            cityDetail: '请输入您所居住的详细地址',
            cityDetailStatus: false,
            companyNameStatus: false,
            companyPosStatus: false,
            cityCode: '',
            companyName: '请输入公司全称',
            companyPos: '请输入公司职位',
            workCityDetail: '请输入详细工作地址',
            workCityDetailStatus: false,
        }

    }

    componentDidMount() {
        // 选择数据初始化
    }

    componentWillUnmount() {
        Picker.hide();

    }
    // 行业选择

    industryData() {
        let data = [];
        let len = industry.length;
        for (let i = 0; i < len; i++) {
            data[i] = industry[i]['name'];
        }
        return data;
    }

    // 工作行业
    GetJobList() {
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '行业列表',
            pickerCancelBtnColor: [187, 187, 187, 1],
            pickerConfirmBtnColor: [246, 73, 118, 1],
            pickerData: this.industryData(),
            selectedValue: ['IT服务'],
            onPickerConfirm: pickedValue => {
                const { dispatch } = this.props;
                dispatch({
                    type: 'updateJobSelectList',
                    payload: {
                        pickedValue,
                    },
                });
            },
            onPickerSelect: pickedValue => {
                const { dispatch } = this.props;
                dispatch({
                    type: 'updateJobSelectList',
                    payload: {
                        pickedValue,
                    },
                });
            }
        });
        Picker.show();

    }


    //工作城市

    GetWorkList() {
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '工作城市',
            pickerCancelBtnColor: [187, 187, 187, 1],
            pickerConfirmBtnColor: [246, 73, 118, 1],
            pickerData: this._createAreaData(),
            selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                const { dispatch } = this.props;
                dispatch({
                    type: 'updateWorkListSelect',
                    payload: {
                        pickedValue,
                    },
                });
            },
            onPickerSelect: pickedValue => {
                const { dispatch } = this.props;
                dispatch({
                    type: 'updateWorkListSelect',
                    payload: {
                        pickedValue,
                    },
                });
            }
        });
        Picker.show();
    }


    //  居住地区  弹窗 
    GetCityList() {
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '城市列表',
            pickerCancelBtnColor: [187, 187, 187, 1],
            pickerConfirmBtnColor: [246, 73, 118, 1],
            pickerData: this._createAreaData(),
            selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                const { dispatch } = this.props;
                dispatch({
                    type: 'updateCitySelectList',
                    payload: {
                        pickedValue,
                    },
                });
            },
            onPickerSelect: pickedValue => {
                const { dispatch } = this.props;
                dispatch({
                    type: 'updateCitySelectList',
                    payload: {
                        pickedValue,
                    },
                });
            }
        });
        Picker.show();

    }

    

    // 工作信息数据提交
    submitBasicWork() {
        const {
            cityTypeSelectText,
            cityDetail,
            companyName,
            companyPos,
            workCityDetail,
            cityDetailStatus,
            companyNameStatus,
            companyPosStatus,
            workCityDetailStatus,
        } = this.state;
        const { citySelectList, jobList, workList } = this.props.NSBasic;
        const { dispatch } = this.props;
        console.log(cityTypeSelectText)

        // 判断当前是否有空值
        let statusText = '不能有空值';
        // 居住地址不能为空
        if (Array.isArray(citySelectList) && citySelectList.length === 0) {
            statusText = "居住地址不能为空";
            ToastShow(statusText);
            return false;
        }

        // 详细地址为空
        if (!cityDetailStatus) {
            statusText = "详细地址不能为空";
            ToastShow(statusText);
            return false;
        }
        //工作行业不能为空
        if (Array.isArray(jobList) && jobList.length === 0) {
            statusText = "工作行业不能为空";
            ToastShow(statusText);
            return false;
        }
        // 公司全称
        if (!companyNameStatus) {
            statusText = "公司全称不能为空";
            ToastShow(statusText);
            return false;
        }

        // 公司职位
        if (!companyPosStatus) {
            statusText = "公司职位不能为空";
            ToastShow(statusText);
            return false;
        }
        // 工作城市不能为空
        if (Array.isArray(workList) && workList.length === 0) {
            statusText = "工作城市不能为空";
            ToastShow(statusText);
            return false;
        }

        // 工作地址
        if (!workCityDetailStatus) {
            statusText = "工作地址不能为空";
            ToastShow(statusText);
            return false;
        }
        ToastLoadingShow('正在提交...')

        // todo 行业code 
        dispatch({
            type: 'AddJobInfoList',
            payload: {
                addressCode: '140000000000',
                addressDetail: cityDetail,
                firmName: companyName,
                liveAreaName: citySelectList[2],
                liveCityName: citySelectList[1],
                liveProvinceName: citySelectList[0],
                workAddress: workCityDetail,
                workCityCode: '140000000000',
                workAreaName: workList[2],
                workCityName: workList[1],
                workIndustryCode: '1003',
                workProvinceName: workList[0],
            },
            callback: (res) => {
                // 触发信息认证列表改变状态
                // 返回上一页
                Navigation.push(this.props.componentId, {
                    component: {
                        name: Router.AUTH,
                        options: {
                            bottomTabs: {
                                visible: false,
                                drawBehind: true,
                                animate: true,
                            },
                        },
                    },
                });
            },
        });

    }
    // 城市列表数据处理
    _createAreaData() {

        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    render() {
        const { citySelectList, jobList, workList } = this.props.NSBasic;
        const { cityTypeSelectText, cityDetail, companyName, companyPos, workCityDetail } = this.state;
        return (
            <KeyboardAwareScrollView
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="always"
            >
                <LayoutScroll style={styles.container}>

                    <View style={styles.container_school}>
                        <Line
                            style={styles.message_code}
                            onPress={this.GetCityList.bind(this)}
                            rightStyle={styles.rightStyle}
                            textStyle={styles.label}
                            extraStyle={[styles.extraLabel, citySelectList.length > 0 && { color: '#212121' }]}
                            text={'居住地区'}
                            arrow={true}
                            extra={citySelectList.length > 0 ? citySelectList : cityTypeSelectText}
                        />

                        <TextInputWidget
                            title='详细地址'
                            callback={(v) => {
                                this.setState({
                                    cityDetail: v,
                                    cityDetailStatus: true,
                                });
                            }}
                            margin={true}
                            returnKeyType={'done'}
                            underlineColorAndroid={'transparent'}
                            clearTextOnFocus={true}
                            placeholder={cityDetail} 
                            />

                    </View>

                    <View style={styles.container_bank}>

                        <Line
                            style={styles.message_code}
                            onPress={this.GetJobList.bind(this)}
                            rightStyle={styles.rightStyle}
                            textStyle={styles.label}
                            extraStyle={[styles.extraLabel, jobList.length > 0 && { color: '#212121' }]}
                            text={'工作行业'}
                            arrow={true}
                            extra={jobList.length > 0 ? jobList : '请选择工作行业'}
                        />

                        <TextInputWidget
                            title='公司全称'
                            placeholder={companyName}
                            returnKeyType={'done'}
                            underlineColorAndroid={'transparent'}
                            clearTextOnFocus={true}
                            callback={(v) => {
                                this.setState({
                                    companyName: v,
                                    companyNameStatus: true,
                                });
                            }}
                             />

                        <TextInputWidget
                            title='公司职位'
                            returnKeyType={'done'}
                            underlineColorAndroid={'transparent'}
                            clearTextOnFocus={true}
                            placeholder={companyPos}
                            callback={(v) => {
                                this.setState({
                                    companyPos: v,
                                    companyPosStatus: true,
                                });
                            }}
                            />
                        <Line
                            style={styles.message_code}
                            onPress={this.GetWorkList.bind(this)}
                            rightStyle={styles.rightStyle}
                            textStyle={styles.label}
                            extraStyle={[styles.extraLabel, workList.length > 0 && { color: '#212121' }]}
                            text={'工作城市'}
                            arrow={true}
                            extra={workList.length > 0 ? workList : '请选择工作城市'}
                        />

                        <TextInputWidget
                            title='工作地址'
                            returnKeyType={'done'}
                            underlineColorAndroid={'transparent'}
                            clearTextOnFocus={true}
                            placeholder={workCityDetail}
                            callback={(v) => {
                                this.setState({
                                    workCityDetail: v,
                                    workCityDetailStatus: true,
                                });
                            }}
                            />
                    </View>

                    <View style={styles.notice_container}>
                        <Heading2 style={styles.notice_text}>该信息仅用于紧急情况下联系所用，我们将安全保护您的信息，请放心填写</Heading2>
                    </View>
                    {/* 提交&声明 */}
                    <Btn style={styles.submit_button} onPress={() => {
                        this.submitBasicWork();
                    }}>提交</Btn>

                    <View style={styles.service_icon}>
                        <Image style={styles.safeImg} source={Images.public.SafeAuth} />
                        <Heading3 style={styles.safeText}>美丽金承诺保护您的信息安全</Heading3>
                    </View>

                </LayoutScroll >
            </KeyboardAwareScrollView>


        )
    }

}
BasicWorkScreen.options = navigationConfig('工作信息');

// 定义样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
    },
    container_bank: {
        flex: 1,
        marginTop: 20,
        color: 'white',
        height: 300,
    },
    container_school: {
        flex: 1,
        marginTop: 20,
        color: 'white',
        height: 120,
    },
    message: {
        width: 20,
        height: 20,
        marginRight: 20,
        marginTop: 0,
    },
    avoidingView: {
        backgroundColor: '#DDD',
    },

    service: {
        width: 343,
        height: 49,
        borderRadius: 24.5,
        backgroundColor: '#CCCCCC',
        alignSelf: 'center',
        marginTop: 12,
    },
    notice_container: {
        height: 33,
        marginLeft: 16,
        marginBottom: 15,
        marginTop: 12,
    },
    notice_text: {
        fontSize: 12,
        color: '#9E9E9E',
    },
    submit_button: {
        marginHorizontal: 16,

    },

    serviceText: {
        lineHeight: 49,
        fontSize: 25,
        color: '#FFFFFF',
        alignSelf: 'center',

    },
    safeImg: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignContent: 'center',
    },
    service_icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 75
    },
    safeText: {
        fontSize: 12,
        flexDirection: 'row',
        color: '#9E9E9E',
        lineHeight: 16.5,
    },
    message_code: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
    },

    // 组件弹窗
    line: {
        height: 60,
    },
    rightStyle: {
        height: 60,
        borderColor: '#f0f0f0',
        borderBottomWidth: getPixel(1),
    },
    label: {
        fontSize: 17,
        color: '#212121',
    },
    extraLabel: {
        fontSize: 17,
        position: 'absolute',
        left: 0,
    },

})

export default connect(({ NSBasic }) => ({ NSBasic }))(BasicWorkScreen);
