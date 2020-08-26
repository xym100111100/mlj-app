import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BtnMin, Touchable} from '../componments';
import {getPixel} from '../utils/screen';
import {money} from '../utils/filters';

export default RecordCard = ({data = {}, onClick, callback, style}) => {

    /*
    *
applyTime: "05.28"
clientNo: "1268113413209460736"
debtAmt: 10000
debtDate: "2020-05-28"
debtNo: "1265834273643040768"
endDate: "20210728"
firstMonthRepayAmt: 83334
limitUnit: 12
productType: "P001"
repayAmt: 1000
repayType: "A"
repayTypeStr: "等本等金"
startDate: "20200528"
state: "8"
stateStr: "回款中"
    * */

    const {stateStr,debtAmtYuan,limitUnit,applyTime} = data;

    return (
        <Touchable onPress={()=>{
            onClick && onClick();
        }} style={[styles.card, style]}>
            <View style={styles.cTop}>
                <Text style={styles.tTitle}>美丽金</Text>
                <Text style={styles.tStatus}>{stateStr}</Text>
            </View>
            <View style={styles.cMiddle}>
                <Text style={styles.cMiddleLabel}>借款金额（元）</Text>
                <View style={styles.cMiddleBody}>
                    <Text style={styles.cLeftMoney}>{money(debtAmtYuan)}</Text>
                    {/* <Touchable style={styles.cRight}>
                        <Text style={styles.cRightText}>去借款</Text>
                    </Touchable> */}
                </View>

            </View>
            <View style={styles.cFooter}>
                <Text style={styles.fText}>借款期数：<Text
                    style={styles.fTextInner}>{limitUnit}期</Text> 申请日期：<Text style={styles.fTextInner}>{applyTime}</Text></Text>
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: getPixel(351),
        height: getPixel(162),
        marginTop: getPixel(12),
        backgroundColor: '#fff',
        paddingHorizontal: getPixel(20),
        paddingTop: getPixel(16.5),
    },
    cTop: {
        height: getPixel(14),
        lineHeight: getPixel(14),
        marginBottom: getPixel(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tTitle: {
        fontSize:  getPixel(14),
        fontWeight: 'bold',
        color: '#212121',
    },
    tStatus: {
        fontSize: 14,
        color: '#D99B47',
    },
//    页中
    cMiddle: {},
    cLeft: {},
    cMiddleLabel: {
        fontSize: 12,
        color: '#757575',
        marginBottom: 4,
    },
    cMiddleBody: {
        height: getPixel(32),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: getPixel(18),
    },
    cLeftMoney: {
        fontSize: 28,
        color: '#f64976',
    },
    cRight: {
        width: getPixel(74),
        height:getPixel(32),
        backgroundColor: "#f64976",
        borderRadius:getPixel(16),
        alignItems:'center',
        justifyContent:'center'
    },
    cRightText:{
        color:"#fff",
        fontSize:getPixel(14)
    },

//     页脚
    cFooter: {
        height: getPixel(14),
        lineHeight: getPixel(14),
    },
    fText: {
        fontSize: 12,
        color: '#757575',
    },
    fTextInner: {
        color: '#212121',
    },
});
