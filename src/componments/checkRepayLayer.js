import React, { Component, Fragment } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Easing, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl, ImageBackground, TouchableHighlight } from 'react-native'
import { Images } from '../common/images';

import { Heading1, Heading2, Heading3, Paragraph } from '../widget/Text'

import Toast from 'react-native-simple-toast';


// redux & router
import { connect } from 'react-redux';
import Router from '../Router';
// 跳转组件



class Layer extends Component {


    constructor(props: Object) {
        super(props);
        this.state = {
            salesmanId: "",
            totalAmt: "",
            debtPlanlist : {},
        }
        // 初始化列表的数据
        const { debtPlanlist } = props; //接收
        this.setState({
            debtPlanlist : debtPlanlist,
            totalAmt : debtPlanlist.totalAmt,
        })



    }

    render() {
        const { debtPlanlist,totalAmt } = this.state; //接收
        return (
            <View style={styles.containerView}>

                <View >
                    <Heading3 style={styles.close_text}>共需还款</Heading3>
                    <Image style={styles.close_img} source={Images.loan.CommonClose} />
                </View>

                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, }}>
                <Heading2 style={{ fontSize: 24, color: '#F64976', fontWeight: 'bold' }}>¥{ debtPlanlist.totalAmt }</Heading2>
                </View>

                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 5, }}>
                    <Heading2 style={{ fontSize: 14.5, color: '#A7A7A7' }}>含本金￥{ debtPlanlist.debtAmtYuan } ，息费总额￥{ debtPlanlist.serviceFeeAmt }</Heading2>
                </View>

                <View style={styles.back_list}>
                    <Heading3 style={{ width: 80, fontSize: 14, fontWeight: 'bold', }}>期数</Heading3>
                    <Heading3 style={{ width: 100, fontSize: 14, fontWeight: 'bold', marginLeft: 25, }}>金额</Heading3>
                    <Heading3 style={{ width: 140, fontSize: 14, fontWeight: 'bold', marginRight: 38, }}>还款时间</Heading3>
                </View>

                <View style={{ width: 325, height: 355, marginHorizontal: 25, }}>
                    <View style={{ flexDirection: 'row', marginTop: 7.5, marginBottom: 8, }}>
                        <Heading3 style={ styles.indexText } >1</Heading3>
                        <Heading3 style={ styles.centerText } >$15003</Heading3>
                        <Heading3 style={ styles.rightText }>2019-06-36</Heading3>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 7.5, marginBottom: 8, }}>
                        <Heading3 style={ styles.indexText }>2</Heading3>
                        <Heading3 style={{ width: 100, fontSize: 14, color: '#A7A7A7' }}>$15993</Heading3>
                        <Heading3 style={{ width: 140, fontSize: 14, color: '#A7A7A7', marginRight: 23, }}>2012-06-36</Heading3>
                    </View>
                </View>



            </View>
        );
    }


}



// 定义样式
const styles = StyleSheet.create({
    icon: {
        width: 27,
        height: 27,
    },
    containerView:{
        width: 325, 
        height: 497.5,
         borderRadius: 2, 
         marginTop: -240, 
         backgroundColor: '#fff' 
    },
    close_img: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 15,
        marginTop: 14.5,
    },
    close_text: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
        fontSize: 16,
        color: '#343434',
        fontWeight: 'bold',
    },
    back_list: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 25,
        marginTop: 20,
    },
    back_list_name: {
        width: 110,
        fontSize: 14,
        fontWeight: 'bold',
    },
    back_list_item: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A7A7A7',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },

    indexText:{
        width: 80, 
        fontSize: 14, 
        color: '#A7A7A7',
        marginLeft: 10,
    },
    centerText:{
        width: 100,
        fontSize: 14, 
        color: '#A7A7A7'
    },
    rightText:{
        width: 140,
         fontSize: 14, 
         color: '#A7A7A7',
          marginRight: 23,
    }



})

export default connect(({ LOANMONEYIndex }) => ({ LOANMONEYIndex }))(Layer);
