import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import Router from '../../Router';
import { Btn, Layout, LayoutScroll, Touchable } from '../../componments';
import { navigationConfig } from '../../common/navigation';
import { money } from '../../utils/filters';
import { LineCheck } from '../../container/LineCheckbox';

import { create, all } from 'mathjs';
import { ToastShow } from '../../utils/toast';
import { Navigation } from 'react-native-navigation';
import bill from '../../reducers/bill';

const config = ({
  number: 'BigNumber',
  precision: 20,
});

const math = create(all, config);

class BillStage extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      payAmt: 0,
      payArray: [],
      RepayList: [
      ],
    };

  }

  componentDidMount() {
    const { debtNo } = this.props.NSBill;
    this.init(debtNo);

  }

  init(debtNo) {
    const { dispatch } = this.props;
    dispatch({
      type: 'BillStage',
      payload: {
        debtNo,
      },
      callback: (res) => {
        const { data } = res;
        data.forEach((item) => {
          item.checked = false;
        });
        this.setState({
          RepayList: data,
        });
      },
    });
  }

  // 提交还款，创建还款订单
  submit() {
    const { payAmt, payArray } = this.state;
    if (payAmt === 0) {
      ToastShow('请选择还款期数');
      return false;
    }
    const { debtNo, billPlan } = this.props.NSBill;
    const { dispatch } = this.props;
    // payArray 处理为planNo

    for (let i = 0; i < payArray.length; i++) {
      billPlan.forEach((item, index) => {
        if (item.currentPeriod == payArray[i]) {
          payArray[i] = item.planNo;
        }

      });
    }


    dispatch({
      type: 'BillPayInfo',
      payload: {
        debtNo,
        planNos: payArray,
      },
      callback: (res) => {
          // 跳转到还款验证页面
          if(res.code === 0 ){
            Navigation.push(this.props.componentId, {
              component: {
                name: Router.BILLAUTHPAY,
              },
            });
          }
        
        // 跳转到还款确认页面
        // Navigation.push(this.props.componentId, {
        //   component: {
        //     name: Router.BILLCONFIRM,
        //   },
        // });
      },
    });
  }

  changeItem(item, flag) {
    const { currentPeriod } = item;
    let { payArray, payAmt, RepayList } = this.state;

    const { billStatus } = this.props.NSBill;


    if (billStatus) {
      let payAmtAll = 0;
      for (let i = 0; i < RepayList.length; i++) {
        if (RepayList[i].checked == true) {
          RepayList[i].checked = false;
          payArray = payArray.filter(({ id }) => id === RepayList[i].currentPeriod);
        }
      }
      payAmt = payAmtAll;
      const { dispatch } = this.props;
      // list存在reducer中
      dispatch({
        type: 'UpdateSelectItemListStatus',
        callback: () => {
        },
      });
    }



    if (flag) {
      RepayList.forEach((r) => {
        if (r.checked !== 'true' && r.currentPeriod <= currentPeriod) {
          r.checked = true;
          const index = payArray.indexOf(r.currentPeriod);
          if (index === -1) {
            // 按planno 确认还款
            payArray.push(r.currentPeriod);
            payAmt = math.number(math.add(math.bignumber(payAmt), math.bignumber(r.currentRepayAmtYuan * 1)));
          }
        }
      });

    } else {
      RepayList.forEach((r) => {
        if (r.currentPeriod >= currentPeriod && r.checked) {
          r.checked = false;
          const index = payArray.indexOf(r.currentPeriod);
          if (index !== -1) {
            payArray.splice(index, 1);
          }
          payAmt = math.number(math.subtract(math.bignumber(payAmt), math.bignumber(r.currentRepayAmtYuan * 1)));
        }
      });
    }

    this.setState({
      payArray,
      payAmt,
      RepayList,
    });
  }

  // 去除数组中重复的元素
  unique(arr) {
    if (!Array.isArray(arr)) {
      return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (array.indexOf(arr[i]) === -1) {
        array.push(arr[i])
      }
    }
    return array;
  }

  render() {
    const { billPlan } = this.props.NSBill;
    const { RepayList, payAmt } = this.state;

    let RenderStageItem;
    if (RepayList && RepayList !== null) {
      RenderStageItem = RepayList.map((item, index) => {
        const { repayState, checked, repayStateStr, currentRepayAmtYuan, currentPeriod } = item;

        let type = 'default';
        let statusTxt = '还款中';
        switch (repayState) {
          case 'OVERDUED':
            type = 'danger';
            statusTxt = '已逾期';
            break;
          case 'SETTLED':
            type = 'grey';
            statusTxt = '已结清';
            break;
          default:
            if (currentPeriod === 'YES') {
              type = 'primary';
              statusTxt = '本期';
            } else {
              type = 'default';
              statusTxt = '未到期';
            }
            break;
        }


        return (
          <LineCheck
            key={index}
            type={type}
            onClick={(check) => {
              this.changeItem(item, check);
            }}
            checked={!!checked}
            title={`第${currentPeriod}期`}
            label={repayStateStr}
            extra={`${money(currentRepayAmtYuan)}`} />
        );
      });
    }


    return (
      <Layout style={styles.page}>
        <LayoutScroll style={styles.stage}>
          <View style={styles.title}>
            <Text style={styles.titleText}>请选择还款期数</Text>
          </View>
          {/*每期内容*/}
          {RenderStageItem}

        </LayoutScroll>
        <View style={styles.footer}>
          <View style={styles.fLeft}>
            <Text style={styles.fLeftText}>还款金额</Text>
            <View style={styles.fLeftRight}>
              <Text style={styles.fLeftMoneyIcon}>￥</Text>
              <Text style={styles.fLeftMoney}>{money(this.state.payAmt)}</Text>
            </View>

          </View>
          <Touchable onPress={() => {
            this.submit();
          }} style={styles.fBtn}>
            <Text style={styles.fBtnText}>确认</Text>
          </Touchable>
        </View>
      </Layout>
    );
  }

}

BillStage.options = navigationConfig('确认还款金额');
// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  stage: {
    backgroundColor: '#f7f7f7',
  },
  // 页面里面的title
  title: {
    height: 40.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  titleText: {
    fontSize: 12,
    lineHeight: 16.5,
    color: '#9e9e9e',
  },

  // 页面底部
  footer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fLeft: {
    flex: 1,
    height: 48,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fLeftText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9e9e9e',
  },
  fLeftRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  fLeftMoney: {
    fontSize: 22,
    lineHeight: 28,
    color: '#f64976',
  },
  fLeftMoneyIcon: {
    fontSize: 16,
    color: '#f64976',
  },
  fBtn: {
    width: 100,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f64976',
  },
  fBtnText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 24,
  },


});


export default connect(({ NSBill }) => ({ NSBill }))(BillStage);
