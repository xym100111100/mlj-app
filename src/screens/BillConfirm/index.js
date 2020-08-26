import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';

import { connect } from 'react-redux';
import Router from '../../Router';
import { Btn, Layout, LayoutScroll, Line, Touchable } from '../../componments';
import { Images } from '../../common/images';
import { navigationConfig } from '../../common/navigation';
import { money } from '../../utils/filters';
import { Navigation } from 'react-native-navigation';

class BillConfirm extends Component<Props, State> {

  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  // submit() {
  //   const { BillPayInfo } = this.props.NSBill;
  //   const { debtNo, planNos, totalAmtYuan } = BillPayInfo;
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'BillPaySubmit',
  //     payload: {
  //       debtNo,
  //       totalAmtYuan,
  //       planNos: planNos,
  //     },
  //     callback: (res) => {
  //       // 跳转到还款确认页面
  //       Navigation.setStackRoot(this.props.componentId, {
  //         component: {
  //           name: Router.BILLPAYRESULT,
  //         },
  //       });
  //     },
  //   });
  // }
  submit() {
    const { BillPayInfo } = this.props.NSBill;
    const { debtNo, planNos, totalAmtYuan } = BillPayInfo;
    const { dispatch } = this.props;
    // 跳转支付验证页面
    Navigation.push(this.props.componentId, {
      component: {
        name: Router.BILLAUTHPAY,
      },
    });

  }

  componentDidMount() {
    const { billStatus } = this.props.NSBill;
    if (!billStatus) {
      this.init();
    }
  }

  init() {
    const { dispatch } = this.props;
    // list存在reducer中
    dispatch({
      type: 'UpdateBillStatus',
      callback: () => {
      },
    });
  }


  render() {
    const { BillPayInfo } = this.props.NSBill;
    const { debtAmtYuan, serviceFeeAmtYuan, replayAmtYuan, totalAmtYuan, overdueAmtYuan } = BillPayInfo;


    return (
      <Layout style={styles.page}>
        <View style={styles.pages}>
          <View style={styles.cHeader}>
            <Text style={styles.cHeaderTitle}>应还款总金额(元)</Text>
            <Text style={styles.cHeaderMoney}>{money(replayAmtYuan)}</Text>
          </View>
          <View style={styles.cList}>
            <Line text={'应还本金'} textStyle={styles.lineText} extraStyle={styles.lineTextExtra} border={true}
              extra={`￥${money(debtAmtYuan)}`} />
            <Line text={'罚息'} textStyle={styles.lineText} extraStyle={styles.lineTextExtra} border={true}
              extra={`￥${money(overdueAmtYuan)}`} />
            <Line text={'综合费用'} textStyle={styles.lineText} extraStyle={styles.lineTextExtra} border={true}
              extra={`￥${money(serviceFeeAmtYuan)}`} />
            <Line text={'提前结清违约金'} textStyle={styles.lineText} extraStyle={styles.lineTextExtra} border={true}
              extra={'0'} />
          </View>

        </View>
        {/*  申请借款完成   支付完成  变更完成 */}
        <Btn onPress={() => {
          this.submit();
        }}>确认</Btn>

      </Layout>
    );
  }

}

// 定义标题
BillConfirm.options = navigationConfig('信息确认');

// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  pages: {
    flex: 1,
    paddingTop: 12,
  },
  cHeader: {
    height: 137,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cHeaderTitle: {
    fontSize: 13,
    lineHeight: 18.5,
    marginBottom: 7.5,
    color: '#212121',
  },
  cHeaderMoney: {
    fontSize: 30,
    lineHeight: 36.5,
    color: '#F64976',
  },
  cList: {
    paddingTop: 12,
  },
  lineText: {
    fontSize: 17,
    color: '#9e9e9e',
  },
  lineTextExtra: {
    fontSize: 17,
    color: '#212121',
  },

});


export default connect(({ NSBill }) => ({ NSBill }))(BillConfirm);
