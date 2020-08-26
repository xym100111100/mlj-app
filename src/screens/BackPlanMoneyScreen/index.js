import React, { Component,Fragment } from 'react';
import { View, Text,Button, TextInput,StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl,ImageBackground,TouchableHighlight } from 'react-native'

import { screen, system } from '../../utils/common'

import { Heading1,Heading2, Heading3, Paragraph } from '../../widget/Text'

import SpacingView  from '../../widget/SpacingView'
import DetailCell  from '../../widget/DetailCell'
import TextInputWidget  from '../../widget/TextInputWidget'
import NavigationItem  from '../../widget/NavigationItem'

import color from '../../widget/color'
import LineDash from '../../widget/LineDash'


import DashSecondLine from '../../widget/DashSecondLine';

type Props = {
}

type State = {
    isRefreshing: boolean,
}




class BackPlanMoneyScreen extends Component <Props, State>{

  static navigationOptions = ({ navigation }: any) => ({
    title: '',
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        <NavigationItem
          icon={require('../img/myscreen/message.png')}
          onPress={() => {

          }}
        />
      </View>
    ),
    headerStyle: {
      backgroundColor: color.paper,
      elevation: 0,
      borderBottomWidth: 0,
    },
  })

  state: {
    isRefreshing: boolean
  }

  constructor(props: Object) {
    super(props);
    this.state = {
        isRefreshing: false,
        name: '请输入姓名',
    }

    
    // this.navigation = props.navigation;
  }


  onHeaderRefresh() {
    this.setState({ isRefreshing: true })

    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 2000)
  }


  renderHeader() {
    return (
        <View style={{ color: '#F7F7F7', flex:1,}}>
            <View style={styles.container}>
                <View style={{fontWeight:'bold',fontSize:16,paddingTop:23.5,justifyContent:'center',alignSelf:'center',alignItems:'center' }}>
                     <Heading2 >借款申请金额（元）</Heading2>
                </View>

                <View>
                    <Heading3 style={{ fontSize:16,fontWeight:'bold',color:'#F64976',position:'absolute',left:92,top:40, }}>¥ </Heading3>
                    <Heading3 style={{ fontSize:44,fontWeight:'bold',color:'#F64976', position:'absolute',left:107,top:12}}>165000.3</Heading3>
                    <Heading3 style={{ fontSize:15,fontWeight:'bold',color:'#9E9E9E', position:'absolute',left:70,top:80,opacity:0.9}}>含本金￥998.71，息费总额￥98.9</Heading3>
                </View>
                
            </View>

            {/* 期数列表 */}

            <View style={styles.container_bank}>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期  </Heading2>
                    <View style={styles.no_overdue }>
                        <Heading3 style={styles.overdue_text }>已还清</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', opacity:0.1}}>
                        <DashSecondLine style={{flex:1, marginHorizontal: 17, }} lineWidth={0.5} dashStyle={'solid'} />
                </View>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期 </Heading2>

                    <View style={styles.overdue }>
                        <Heading3 style={styles.overdue_text }>已逾期</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', opacity:0.1}}>
                        <DashSecondLine style={{flex:1, marginHorizontal: 17, }} lineWidth={0.5} dashStyle={'solid'} />
                </View>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期 </Heading2>

                    <View style={styles.overdue }>
                        <Heading3 style={styles.overdue_text }>已逾期</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', opacity:0.1}}>
                        <DashSecondLine style={{flex:1, marginHorizontal: 17, }} lineWidth={0.5} dashStyle={'solid'} />
                </View>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期 </Heading2>

                    <View style={styles.overdue }>
                        <Heading3 style={styles.overdue_text }>已逾期</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', opacity:0.1}}>
                        <DashSecondLine style={{flex:1, marginHorizontal: 17, }} lineWidth={0.5} dashStyle={'solid'} />
                </View>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期 </Heading2>

                    <View style={styles.overdue }>
                        <Heading3 style={styles.overdue_text }>已逾期</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', opacity:0.1}}>
                        <DashSecondLine style={{flex:1, marginHorizontal: 17, }} lineWidth={0.5} dashStyle={'solid'} />
                </View>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期 </Heading2>

                    <View style={styles.overdue }>
                        <Heading3 style={styles.overdue_text }>已逾期</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', opacity:0.1}}>
                        <DashSecondLine style={{flex:1, marginHorizontal: 17, }} lineWidth={0.5} dashStyle={'solid'} />
                </View>

                <View style={styles.plan_index_code}>
                    <Heading2 style={{ width:160,fontSize:15 }}>第1期 </Heading2>

                    <View style={styles.overdue }>
                        <Heading3 style={styles.overdue_text }>已逾期</Heading3>
                    </View>

                    <View style={styles.plan_code}>
                        <Heading2 style={styles.repayment_money}>¥1500</Heading2>
                        <Heading2  style={styles.repayment_date} >还款日：2019/08/06</Heading2>
                    </View>
                </View>
               
            </View>

        </View>
    )

 
   

  }



  render() {
    return(
        <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <View style={{ position: 'absolute',width: screen.width, height: screen.height / 2, backgroundColor:'#F7F7F7' }} />
            <ScrollView
            refreshControl={
                <RefreshControl
                onRefresh={() => this.onHeaderRefresh()}
                tintColor='gray'
                />
            }>
            {this.renderHeader()}
            </ScrollView>

        </View>
    
    )
   
  }

  
}
// 定义样式
const styles = StyleSheet.create({
    icon: {
      width: 27,
      height: 27,
    },
    container: {
        flex: 1,
        marginTop:20, //去除状态栏图标
        color: 'white',
        height:165,
        backgroundColor:'white'
    },
    container_bank:{
        flex: 1,
        marginTop:12,
        color: 'white',
        marginHorizontal:17,
        height:300,
    },

    message: {
        width: 20,
        height: 20,
        marginRight:20,
        marginTop:0,
        
    },
    no_overdue:{
        width:39,
        height:16,
        position:'absolute',
        left:70.5,
        borderStyle:'solid',
        borderColor:'#CCCCCC' ,
        backgroundColor:'#CCCCCC',
        borderWidth:1,
    } ,
    overdue:{
        width:39,
        height:16,
        position:'absolute',
        left:70.5,
        borderStyle:'solid',
        borderColor:'#F65A83' ,
        backgroundColor:'#F65A83',
        borderWidth:1,
    },
    overdue_text:{
        color:'#FFFFFF',
        fontSize:10,
        alignSelf:'center',
        marginHorizontal:4.5,
        fontWeight:'400',
        marginVertical:1,
    },

    plan_index_code:{
        flexDirection: 'row',
        height: 81,
        alignItems: 'center',
        paddingHorizontal:16.5,
        backgroundColor: '#FFF',
        
    },
    plan_code:{
        position:'absolute',
        right:17,
        width:135,
        height:81,
        flexDirection:'row'
    },
    repayment_money:{
        fontSize:15,
        fontWeight:'bold',
        position:'absolute',
        right:0,
        paddingTop:18,
    },
 
    repayment_date:{
        position:'absolute',
        right:0,
        fontSize:15,
        color:'#9E9E9E',
        paddingTop:43,
    },
    loan_apply_button: {
        width:343,
        height:49,
        alignSelf:'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position:'absolute',
        bottom:-160,
    },
    loan_apply_text: {
        lineHeight:25,
        fontSize:18,
        fontWeight:'bold',
        color:'#FFFFFF',
        alignSelf:'center',
    },
 
   
  })



export default   BackPlanMoneyScreen
