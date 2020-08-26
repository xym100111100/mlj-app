import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ImageBackground,
} from 'react-native';

import { Heading1, Heading2, Heading3, Paragraph } from '../../widget/Text';

import TextInputWidget from '../../widget/TextInputWidget';
import NavigationItem from '../../widget/NavigationItem';

import color from '../../widget/color';
import DashSecondLine from '../../widget/DashSecondLine';
import { width } from '../../utils/screen';

// redux & router
import { connect } from 'react-redux';
import Router from '../../Router';
import { navigationConfig } from '../../common/navigation';
// 跳转组件
import { Navigation } from 'react-native-navigation';
import Toast from 'react-native-simple-toast';

import RNPickerSelect from 'react-native-picker-select';
import Setup from '../Setup';
import { Layout, Line } from '../../componments';
import { ToastShow } from '../../utils/toast';
import { Images } from '../../common/images';


class HospitalScreen extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            hospitalName: ''
        };
    }

    componentDidMount() {
        // 初始化医院列表
        this.initHospitalList();
    }

    // 初始化医院列表
    initHospitalList() {
        const { dispatch } = this.props;
        dispatch({ type: 'HospitalList', payload: {} });
    }

    // 获取搜索后的医院
    SearchHospital() {
        const { hospitalName } = this.state;
        if (!hospitalName) {
            this.initHospitalList();
        }
        const { dispatch } = this.props;
        dispatch({
            type: 'SearchHospital',
            payload: {
                realName: hospitalName,
            },
        });
    }

    // 选中医院列表
    selectHospital(item) {
        const { dispatch } = this.props;
        dispatch({
            type: 'HospitalSelect',
            payload: { ...item },
            callback: () => {
                // 更新rateall 汇率
                this.getLimitUnitRate(item);
                Navigation.pop(this.props.componentId);
            }
        });
    }

    getLimitUnitRate(item) {
        const { dispatch } = this.props;
        dispatch({
            type: 'LoanLimitUnitRate',
            payload: {
                // payload 里面是请求携带的参数
                PartnerNo: item.partnerNo,
            },
            callback: (res) => {
                if (res.code == 0) {
                    // ToastShow('获取数据成功');
                } else {
                    ToastShow('失败');
                }
            },
        });
    }



    render() {
        const { hospitalList } = this.props.NSHospital;
        // 页面
        return (
            <Layout>
                {/*搜索框*/}
                <View style={styles.container_search}>
                    <View style={styles.searchBar}>
                        <Image source={Images.public.Search} style={styles.searchIcon} />
                        <View style={styles.viewInputTitle}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                clearTextOnFocus={true}
                                autoFocus={false}
                                placeholderTextColor={"#BBB"}
                                returnKeyType={'search'}
                                returnKeyLabel={'搜索'}
                                style={styles.textInputTitle}
                                onChangeText={(e) => {
                                    this.setState({
                                        hospitalName: e,
                                    });
                                }}
                                placeholder={'请输入医院名称'}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => {
                            this.SearchHospital();
                        }} style={styles.page_search}>
                            <Heading3 style={styles.page_search_text}>
                                搜索
                            </Heading3>
                        </TouchableOpacity>
                    </View>

                </View>
                {/*选项列表*/}
                <View style={styles.container}>
                    <FlatList
                        data={hospitalList}
                        renderItem={({ item, index }) => {
                            const { partnerNo, realName } = item;
                            return (
                                <Line
                                    id={partnerNo}
                                    key={partnerNo}
                                    text={realName}
                                    border={true}
                                    onPress={() => {
                                        this.selectHospital(item);
                                    }} />
                            );
                        }}
                    />
                </View>
            </Layout>

        );
    }
}

HospitalScreen.options = navigationConfig('选择医院');

// 定义Navigation
// HospitalScreen.options = {
//     bottomTabs: {
//         visible: false,
//         drawBehind: true,
//         animate: true,
//     },
//     topBar: {
//         title: {
//             text: '选择医院',
//             alignment: 'center',
//         },
//     },
// };

// 定义样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // 搜索样式
    container_search: {
        color: 'white',
        marginTop: 11.5,
        marginBottom: 29,
        height: 34,
        paddingLeft: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    searchBar: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        flex:1,
    },
    searchIcon: {
        width: 19.7,
        height: 19.7,
        marginHorizontal: 7,
        marginVertical: 10,
    },
    gesview: {
        width: 120,
        fontSize: 17,
    },
    viewInputTitle: {
        height: 34,
        fontSize: 17,
        backgroundColor: '#F7F7F7',
        flex:1
    },
    textInputTitle: {
        height: 34,
        padding: 0,
        fontSize: 17,
        backgroundColor: '#F7F7F7',
    
    },
    container_phone: {
        flex: 1,
        marginTop: 20,
        color: 'white',
        height: 120,
        marginBottom: 168,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    message: {
        width: 20,
        height: 20,
        marginRight: 20,
        marginTop: 0,

    },
    service: {
        width: 343,
        height: 49,
        borderRadius: 24.5,
        backgroundColor: '#CCCCCC',
        alignSelf: 'center',
        marginBottom: 60.5,
    },

    serviceText: {
        lineHeight: 49,
        fontSize: 25,
        color: '#FFFFFF',
        alignSelf: 'center',

    },
    message_code: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
    },
    repayment_code: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 15,

    },
    repayment_detail: {
        position: 'absolute',
        right: 16,
        fontSize: 14,
        color: '#F64976',
    },

    message_dotted: {
        borderColor: '#F1F1F1',//需要标色
        borderWidth: 0.5,
    },
    bankImg: {
        width: 12,
        height: 24,
        position: 'absolute',
        right: 18,
    },
    repayment: {
        position: 'absolute',
        right: 16,
        fontSize: 17,
    },
    loan_apply_button: {
        width: 343,
        height: 49,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
    loan_apply_text: {
        lineHeight: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    page_search: {
        width:60,
    },
    page_search_text: {
        color: '#F64976',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center'
    },

});

export default connect(({ LOANMONEYIndex, NSHospital }) => ({ LOANMONEYIndex, NSHospital }))(HospitalScreen);


