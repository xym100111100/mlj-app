import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Heading1, Heading2, Heading3 } from '../widget/Text';
import { BtnMin } from '../componments';
import { width } from '../utils/screen';
import { getPixel } from '../utils/screen';
import { Navigation } from 'react-native-navigation';
import Router from '../Router';
import { money } from '../utils/filters';

export default homeCard = ({ data = {}, callback, style }) => {
  const { creditLinesYuan, state, repayYuan,repayTip,availableLinesYuan } = data;
  let statusFlag = '立即借款';
  let clickFlag = false;
  switch (state) {
    case 0:
      statusFlag = '申请借款';
      clickFlag = true;
      break;
    case 1:
    case 2:
      statusFlag = '去授信';
      clickFlag = true;
      break;
    case 3:
      statusFlag = '审核中';
      clickFlag = false;
      break;
    case 4:
      statusFlag = '立即分期';
      clickFlag = true;
      break;
    case 5:
      statusFlag = '初审被拒';
      clickFlag = false;
      break;
    case 6:
      statusFlag = '放款中';
      clickFlag = false;
      break;

    case 7:
      clickFlag = true;
      if (repayYuan !== null) {

        statusFlag = '去还款';
      } else {
        statusFlag = '立即分期';
      }
      break;
    case 8:
       statusFlag = '还款中';
       clickFlag = false;
      break;
    default:
      clickFlag = true;
      statusFlag = '申请借款';
      break;
  }
  let avamoney = '';
  if(repayYuan !== null ){
    avamoney = availableLinesYuan ;
  }else{
    avamoney = creditLinesYuan ;
  }
  let credYuan = '';
  if(availableLinesYuan >= 0  && creditLinesYuan >0 ){
    credYuan = availableLinesYuan;
  }else{
    credYuan = 50000;
  }

  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardInner}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}> {creditLinesYuan ? '可用额度' : '最高可借'}（元）</Text>
          <Text style={styles.cardMoney}>{money(avamoney ? avamoney : credYuan)}</Text>
        </View>
        {/*    按钮*/}
        <BtnMin type={clickFlag ? 'default' : 'grey'} style={styles.cardBtn} onPress={() => {
          if (clickFlag) {
            callback && callback();
          }
        }}>{statusFlag}</BtnMin>

        {/*tip*/}
        <View style={styles.cardTips}>
          <Text style={styles.cardTipsText}>最低日费率0.05% | 最快3分钟放款</Text>
        </View>

        <View style={styles.cardLine}></View>

        {/*账单信息*/}
        <View style={styles.cardBill}>
          <Text style={repayTip !== null ? 'styles.cardBillTitle' : 'styles.cardBillTitleActive'}>{ repayTip !== null ? repayTip : '账单金额（元）' }</Text>
          <Text style={styles.cardBillBody}> {repayYuan === null || repayYuan == 0 ? '暂无借款' : `¥ ${repayYuan}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width,
    height: 255,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  cardInner: {
    flex: 1,
    width: getPixel(315),
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: -57,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardHeader: {
    paddingTop: 34,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 14.5,
  },
  cardMoney: {
    height: 43.5,
    marginBottom: 21.5,
    fontSize: 36,
    color: '#1E1E1E',
  },
  cardBtn: {},
  cardTips: {
    alignItems: 'center',
    height: 30.5,
    marginTop: 15,
  },
  cardTipsText: {
    fontSize: 12,
    color: '#9b9b9b',
    marginBottom: 15,
  },

  cardLine: {
    width: getPixel(278),
    height: 1,
    backgroundColor: '#E8E8E8',
    marginTop: 15,
  },

  //账单信息
  cardBill: {
    flex: 1,
    width: getPixel(315),
    paddingLeft: 20,
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  cardBillTitleActive: {
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 16.5,
    color: '#FD3000',
  },
  cardBillTitle: {
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 16.5,
    color: '#E8E8E8',
  },
  cardBillBody: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 29.5,
    color: '#1E1E1E',
  },
});
