import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import {navigationConfig} from '../../common/navigation';
import {Layout, LayoutScroll, Touchable} from '../../componments';
import {width, height, getPixel} from '../../utils/screen';
import {Images} from '../../common/images';
import {Navigation} from 'react-native-navigation';
import Router from '../../Router';
import {connect} from 'react-redux';

class MyBank extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initBankList();
        this.initClientInfo();
    }

    // 初始化银行卡列表
    initBankList() {
        const {dispatch} = this.props;
        dispatch({
            type: 'BankList',
            payload: {},
        });
    }
    // 刷新一次用户信息
    initClientInfo() {
        const { dispatch } = this.props;
        dispatch({
          type: 'initClientInfo',
          payload: {},
        });
      }

    render() {
        const {bankList} = this.props;
        // 添加按钮部分
        const RenderBtn = <View style={[styles.bankOther, bankList.length < 2 && styles.bankOtherNull]}>
            <Touchable onPress={() => {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: Router.ADDBANK,
                    },
                });
            }} style={styles.btnBankAdd}>
                <Image style={styles.btnIcon} source={Images.bank.add}/>
                <Text style={styles.btnText}>添加银行卡</Text>
            </Touchable>
            {bankList.length !== 0 && <Text style={styles.tips}>仅支持添加储蓄卡</Text>}
        </View>;

        // 空页面
        let RenderBank = <View style={styles.bankNull}>
            <View style={styles.bNull}>
                <Image style={styles.bNullImg} source={Images.bank.Null}/>
                <Text style={styles.bNullText}>暂无绑定银行卡</Text>
            </View>
            {RenderBtn}
        </View>;

        // 列表页面
        if (bankList.length) {
            const RenderBankItem = bankList.map((item, index) => {
                const t = index * -52;
                const {bankBackColor, bankAccount4, bankCode} = item;
                return (
                    <View key={index} style={[styles.card, {top: t, backgroundColor: bankBackColor}]}>
                        <Image
                            style={styles.cardLogo}
                            source={Images.bank[bankCode]}/>

                        <View style={styles.cardNum}>
                            <Text style={styles.cardNumLeft}>****</Text>
                            <Text style={styles.cardNumRight}>{bankAccount4}</Text>
                        </View>
                    </View>
                );
            });


            RenderBank = <View style={styles.bank}>
                <View style={styles.bankCard}>
                    {RenderBankItem}
                </View>
                <View style={[styles.bankTips, bankList.length > 1 && styles.bankTipsTop]}>
                    <Text style={styles.tipsTitle}>温馨提醒：</Text>
                    <Text style={styles.tipsBody}>银行卡将作为您借款及还款使用，请妥善保管。</Text>
                </View>
                {RenderBtn}
            </View>;
        }

        return (
            <Layout style={styles.page}>
                {RenderBank}
            </Layout>
        );
    }
}

// 设置导航栏，底部栏，状态栏
MyBank.options = navigationConfig('我的银行卡');

// 定义样式
const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    bank: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    bankNull: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    bankCard: {
        flexDirection: 'column',
        paddingHorizontal: 16.5,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    card: {
        position: 'relative',
        top: 0,
        width: getPixel(342),
        height: getPixel(157.5),
        backgroundColor: '#E85279',
        borderRadius: 9,
        flexDirection: 'row',
        paddingHorizontal: 28,
        paddingTop: 24,
        zIndex: 500,
    },
    cardLogo: {
        width: 147.5,
        height: 40,
    },
    cardNum: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cardNumLeft: {
        color: '#fff',
        fontSize: getPixel(20),
        marginRight: getPixel(8),
        letterSpacing: getPixel(1.5),
        marginTop: 4,
    },
    cardNumRight: {
        color: '#fff',
        letterSpacing: getPixel(2),
        fontSize: getPixel(22),
    },
    // 提示文字
    bankTips: {
        height: 52,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16.5,
    },
    bankTipsTop: {
        top: -52,
    },
    tipsTitle: {
        color: '#212121',
        fontSize: getPixel(13),
    },
    tipsBody: {
        fontSize: getPixel(13),
        color: '#757575',
    },

    // 按钮和提示
    bankOther: {
        position: 'relative',
        top: -32,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnBankAdd: {
        flexDirection: 'row',
        width: getPixel(200),
        height: getPixel(49),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F64976',
        borderRadius: getPixel(24.5),
        marginBottom: 15,
    },
    btnIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    btnText: {
        fontSize: 17,
        color: '#F64976',
    },
    tips: {
        fontSize: 13,
        color: '#757575',
    },
//    空页面
    bNull: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 81.5,
        marginBottom: 45,
    },
    bNullImg: {
        width: 150,
        height: 150,
    },
    bNullText: {
        color: '#9E9E9E',
    },
    bankOtherNull: {
        top: 0,
        marginTop: 20,
    },
});

export default connect(({NSBank}) => (NSBank))(MyBank);
