import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, StatusBar, Image} from 'react-native';

import {Layout, LayoutScroll, Touchable, Btn} from '../../componments/index';
import {connect} from 'react-redux';
import Router from '../../Router';
import {Navigation} from 'react-native-navigation';
import {Images} from '../../common/images';
import {navigationConfig} from '../../common/navigation';
import BillCard from '../../container/BillCard';
import { ToastShow } from '../../utils/toast';

class BillScreen extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      tipVisible: true,
    };
    
  }
  
  componentDidMount() {
    this.getBillList();
  }
  
  // 获取当前客户账单信息
  getBillList() {
    const {dispatch} = this.props;
    dispatch({
      type: 'GetBillList',
      payload: {},
      callback: (res) => {
        if (res.code == 0) {
        } else {
        }
      },
    });
  }
  
  // 账单详情
  goBillDetail(debtNo) {
    const {dispatch} = this.props;
    const {bill} = this.props.NSBill;
    if(bill.state === "12"){
      ToastShow('正在结清中');
      return false;
    }
    if( Number(bill.debtAmtYuan) == 0){
      ToastShow('已结清，请刷新首页在重新继续借款');
      return false;
    }
    dispatch({
      type: 'SetBillNum',
      payload: {
        debtNo,
      },
      callback: () => {
        Navigation.push(this.props.componentId, {
          component: {
            name: Router.BILLDETAIL,
          },
        });
      },
    });
    
    
  }
  
  render() {
    const {bill} = this.props.NSBill;
    // 顶部标签
    const {tipVisible} = this.state;
    let RenderTips;
    if (tipVisible) {
      RenderTips = <View style={styles.pages_notice}>
        <View style={styles.pages_notice_left}>
          <Image style={styles.pages_notice_icon} source={Images.public.notice}/>
          <Text style={styles.pages_notice_text}>还款金额将会在对应还款日自动入账</Text>
        </View>
        <Touchable style={styles.pages_notice_right} onPress={() => {
          this.setState({
            tipVisible: false,
          });
        }}>
          <Image style={styles.pages_notice_img} source={Images.public.closeBlack}/>
        </Touchable>
      </View>;
    }
    
    // const data = {
    //   applyTime: '05.28',
    //   clientNo: '1268113413209460736',
    //   debtAmt: 10000,
    //   debtDate: '2020-05-28',
    //   debtNo: '1265834273643040768',
    //   endDate: '20210728',
    //   firstMonthRepayAmt: 83334,
    //   limitUnit: 12,
    //   productType: 'P001',
    //   repayAmt: 1000,
    //   repayType: 'A',
    //   repayTypeStr: '等本等金',
    //   startDate: '20200528',
    //   state: '8',
    //   stateStr: '回款中',
    // };
    
    return (
      <LayoutScroll>
        <View style={styles.pages}>
          {/* 顶部提示内容*/}
          {RenderTips}
          
          {/* 账单列表卡片*/}
          <View style={styles.bill_dott}>
            <BillCard onClick={(debtNo) => {
              this.goBillDetail(debtNo);
            }} data={bill}/>
          </View>
        
        
        </View>
      </LayoutScroll>
    
    );
  }
}

// 定义标题
BillScreen.options = navigationConfig('账单');


// 定义样式
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    color: 'white',
    backgroundColor: '#F7F7F7',
  },
  pages_notice: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#E3ECF4',
  },
  pages_notice_icon: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  pages_notice_text: {
    color: '#757575',
    fontSize: 12,
  },
  pages_notice_left: {
    flex: 1,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pages_notice_right: {
    width: 16,
    height: 16,
  },
  pages_notice_img: {
    width: 16,
    height: 16,
  },
  
  // 账单内容
  bill_dott: {
    paddingHorizontal: 12,
  },
});


export default connect(({NSBill}) => ({NSBill}))(BillScreen);
