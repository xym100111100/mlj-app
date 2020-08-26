import React, { Component } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, StatusBar, Image } from 'react-native';
import { Layout, LayoutScroll, Touchable, Btn } from '../../componments/index';
import { connect } from 'react-redux';
import Router from '../../Router';
import { Navigation } from 'react-native-navigation';
import { Images } from '../../common/images';
import { navigationConfig } from '../../common/navigation';
import Moment from 'moment';
import { money } from '../../utils/filters';
import { getPixel } from '../../utils/screen';
import { ToastShow } from '../../utils/toast';

class BillDetail extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      RepayList: [
      ],
    };

  }

  componentDidMount() {
    const { debtNo } = this.props.NSBill;
    this.initDetail(debtNo);
  }

  init(debtNo) {
    this.initDetail(debtNo);
  }

  // 获取详情
  initDetail(debtNo) {
    const { dispatch } = this.props;
    dispatch({
      type: 'BillDetail',
      payload: {
        debtNo,
      },
    });
  }

  // 创建还款订单
  submit() {
    const { debtNo } = this.props.NSBill;
    const { dispatch } = this.props;
    dispatch({
      type: 'BillPayInfo',
      payload: {
        debtNo,
        planNos: [],
      },
      callback: (res) => {
        // 跳转到还款确认页面
        Navigation.push(this.props.componentId, {
          component: {
            name: Router.BILLCONFIRM,
          },
        });
      },
    });
  }

  openUrl = (url) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectPolicyUrl',
      payload: {
        url
      },
      callback: (res) => {
        Navigation.push(this.props.componentId, {
          component: {
            name: Router.PDFVIEW,
          },
        });
      },
    });
  }


  render() {
    const { billDetail } = this.props.NSBill;
    const { limitUnit, verifyDate, debtAmtYuan, debtPlanInfos, contractSigns } = billDetail;

    let RenderRepayPlan;
    if (debtPlanInfos && debtPlanInfos !== null) {
      RenderRepayPlan = <View style={styles.pBody}>
        <View style={styles.pTitle}>
          <Text style={styles.pTitleLine} />
          <Text style={styles.pTitleText}>待还期数</Text>
        </View>
        <View>
          {/*内容*/}
          {debtPlanInfos.map((item, index) => {
            const { currentPeriod, endDate, currentRepayAmtYuan, repayStateStr, repayState } = item;
            let cls = {};
            let statusTxt = '还款中';
            switch (repayState) {
              case 'OVERDUED':
                cls = {
                  color: '#FF4248',
                };
                statusTxt = '已逾期';
                break;
              case 'SETTLED':
                cls = {
                  color: '#9E9E9E',
                };
                statusTxt = '已结清';
                break;
              default:
                if (currentPeriod === 'YES') {
                  cls = {
                    color: '#D99B47',
                  };
                  statusTxt = '待还款';
                } else {
                  cls = {
                    color: '#9E9E9E',
                  };
                  statusTxt = '未到还款日';
                }
                break;
            }

            return (
              <View key={index} style={styles.pItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemLeftTitle}>第<Text>{currentPeriod}</Text>期 {endDate}</Text>
                  <Text style={styles.itemLeftMoney}>{money(currentRepayAmtYuan)}</Text>
                  <Text style={styles.itemLeftTips}>当期应还(元)</Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={[styles.itemRightText, cls]}>{repayStateStr}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>;
    }


    let RenderPolicy;
    if (contractSigns && contractSigns !== null) {
      RenderPolicy = contractSigns.map((item, index) => {
        const { contractNo, contractUrl, contractName } = item;
        let conname = '协议编号';
        switch (contractName) {
          case 'MLJ_LOAN':
            conname = '借款协议';
            break;
          case 'MLJ_SECRET':
            conname = '用户授权协议';
            break;
          case 'MLJ_SERVICE':
            conname = '服务费协议';
            break;
          default:
            conname = '协议编号';
            break;
        }

        // const conurl = 'https://res.nntest.jqtianxia.cn/' + contractUrl;

        return (
          <View style={styles.hBtn}>
            <Text style={styles.hBtnLeft}>{ conname }：{contractNo}</Text>
            <Touchable onPress={() => {
              this.openUrl(contractUrl);
            }} style={styles.hBtnRight}>
              <Text style={styles.hBtnRightText}>查看协议</Text>
            </Touchable>
          </View>
        );
      });
    }

    return (
      <Layout>
        <View style={styles.pages}>
          <View style={styles.pagePay}>

            <ImageBackground source={Images.bill.BillDetailBg} style={styles.header}>
              <View style={styles.hTitle}>
                <View style={styles.hTop}>
                  <Text style={styles.hName}>美丽金</Text>
                  <Text style={styles.hNum}>借款期数：{limitUnit}期</Text>
                  <Text style={styles.hLine}>|</Text>
                  <Text style={styles.hTime}>借款时间：{verifyDate}</Text>
                </View>
                {/* 多个协议遍历 */}
                {RenderPolicy}

                <View style={styles.hBotLine} />
              </View>
              <View style={styles.hBody}>
                <Text style={styles.hBodyTitle}>借款金额(元)</Text>
                <Text style={styles.hBodyMoney}>{money(debtAmtYuan)}</Text>
              </View>
            </ImageBackground>

            {/*待还期数*/}
            <View style={styles.payPlan}>
              <LayoutScroll>
                {RenderRepayPlan}
              </LayoutScroll>
            </View>
          </View>

          {/*底部按钮*/}
          <View style={styles.footer}>
            <Touchable onPress={() => {
              this.submit();
            }} style={[styles.pBtn, styles.pBtnLeft]}>
              <Text style={styles.pBtnLeftText}>去结清</Text>
            </Touchable>
            <Touchable onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: Router.BILLSTAGE,
                },
              });
            }} style={[styles.pBtn, styles.pBtnRight]}>
              <Text style={styles.pBtnRightText}>去还款</Text>
            </Touchable>
          </View>
        </View>
      </Layout>

    );
  }
}

// 定义标题
BillDetail.options = navigationConfig('账单详情');

// 定义样式
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    flexDirection: 'column',
  },
  // 页面底部按钮
  footer: {
    height: 45,
    flexDirection: 'row',
  },
  pBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pBtnLeft: {
    backgroundColor: '#fff',
  },
  pBtnRight: {

    backgroundColor: '#F64976',
  },
  pBtnLeftText: {
    fontSize: 16,
    color: '#F64976',
    fontWeight: 'bold',
  },
  pBtnRightText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },

  // 主要内容
  pagePay: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: getPixel(9),
    paddingTop: 12,
    paddingBottom: 12,
  },
  //   头部内容
  header: {
    height: getPixel(210),
    width: getPixel(357),
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: getPixel(25.5),
    marginBottom: 12,
  },
  hTitle: {
    height: getPixel(80.5),
  },
  hTop: {
    flexDirection: 'row',
    height: getPixel(20),
    marginBottom: getPixel(5.5),
    alignItems: 'center',
  },
  hName: {
    fontSize: 14,
    color: '#212121',
    fontWeight: 'bold',
    marginRight: getPixel(8),
  },
  hNum: {
    fontSize: 12,
    color: '#757575',
  },
  hLine: {
    fontSize: 12,
    color: '#757575',
    marginHorizontal: 4,
  },
  hTime: {
    fontSize: 12,
    color: '#757575',
  },
  hBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getPixel(10),
  },
  hBtnLeft: {
    fontSize: 12,
    color: '#757575',
  },
  hBtnRight: {
  },
  hBtnRightText: {
    fontSize: 12,
    color: '#F64976',
  },
  hBotLine: {
    height: getPixel(1),
    width: getPixel(312),
    backgroundColor: '#ccc',
  },
  hBody: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: getPixel(40),
  },
  hBodyTitle: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 3.5,
  },
  hBodyMoney: {
    fontSize: 32,
    color: '#F64976',
  },


  //   待还期数
  payPlan: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pBody: {
    paddingHorizontal: 20.5,
  },
  pTitle: {
    paddingTop: 20,
    flexDirection: 'row',
    marginBottom: 30,
    height: 20,
    lineHeight: 20,
    alignItems: 'center',
  },
  pTitleLine: {
    width: 2,
    height: 11.5,
    backgroundColor: '#f64976',
    borderRadius: 1,
    marginRight: 5,
  },
  pTitleText: {
    height: 60,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#212121',
    paddingTop: 20,
  },

  pItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  itemLeft: {
    flexDirection: 'column',
  },
  itemLeftTitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#757575',
    marginBottom: 6.5,
  },
  itemLeftMoney: {
    fontSize: 22,
    lineHeight: 27,
    color: '#212121',
    marginBottom: 3,
  },
  itemLeftTips: {
    fontSize: 12,
    lineHeight: 14,
    color: '#757575',
  },
  itemRight: {},
  itemRightText: {},
});


export default connect(({ NSBill }) => ({ NSBill }))(BillDetail);
