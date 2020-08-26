import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {navigationConfig} from '../../common/navigation';
import {LayoutScroll, Touchable} from '../../componments';
import {getPixel} from '../../utils/screen';
import RecordCard from '../../container/LoanCard';
import {Images} from '../../common/images';

class LoanRecord extends Component <Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }
  
  componentDidMount() {
    this.initLoanRecord();
  }
  
  initLoanRecord(callback) {
    const {current} = this.state;
    let params = {};
    if (current !== 0) {
      params.state = current;
    }
    const {dispatch} = this.props;
    dispatch({
      type: 'LoanRecord',
      payload: {
        ...params,
      },
      callback:(res)=>{
        callback && callback();
      }
    });
  }
  
  onHeaderRefresh(callback) {
    this.initLoanRecord(callback);
  }
  
  
  render() {
    const {loanRecord} = this.props.LOANMONEYIndex;
    
    // 渲染记录卡片
    const RenderLoanCard = loanRecord.map((item, index) => {
      return (
        <RecordCard key={index} data={item}/>
      );
    });
    
    let RenderView = <View style={styles.null}>
      <Image style={styles.imgNull} source={Images.loan.Null}/>
      <Text style={styles.textNull}>暂无申请记录</Text>
    </View>;
    
    if (loanRecord && loanRecord.length > 0) {
      RenderView = <View style={styles.record}>
        {/*借款卡片*/}
        {RenderLoanCard}
        
        {/* 没有更多了*/}
        <View style={styles.recordMore}>
          <Text style={styles.rMoreText}>没有更多了~</Text>
        </View>
      </View>;
    }
    
    return (
      <View style={styles.page}>
        <LayoutScroll pullRefresh={true} callback={(fn)=>{
          this.onHeaderRefresh(fn);
        }} style={styles.pageInner}>
          {RenderView}
        </LayoutScroll>
      </View>
    
    );
  }
  
}

LoanRecord.options = navigationConfig('申请记录');

// 定义样式
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
  },
  tabsHeader: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabItem: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  tabItemTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabsLine: {
    position: 'absolute',
    left: '50%',
    top: getPixel(28.5),
    marginLeft: getPixel(-8),
    width: getPixel(16),
    height: getPixel(2),
    borderRadius: getPixel(1),
    backgroundColor: '#f64976',
  },
  pageInner: {
    flex: 1,
  },
  null: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    paddingTop:101.5
  },
  imgNull: {
    width: 112,
    height: 112,
    marginBottom: 12,
  },
  textNull: {
    fontSize: 15,
    color: '#9e9e9e',
    lineHeight: 21,
  },
  record: {
    flex: 1,
    paddingHorizontal: 12,
  },
  // 没有更多了
  recordMore: {
    height: 20,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rMoreText: {
    fontSize: 14,
    color: '#9e9e9e',
  },
});

export default connect(({LOANMONEYIndex}) => ({LOANMONEYIndex}))(LoanRecord);
