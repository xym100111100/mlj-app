// 路由字段的定义
import Router from "./Router";

// 页面组件引用
import HomeScreen from './screens/HomeScreen';
// 登陆
import LoginScreen from './screens/Login';


/*
* 我的里面
* */
// 我的
import MyScreen from './screens/My';
// 借款申请记录
import LoanRecord from './screens/LoanRecord';
// 我的银行卡
import MyBank from './screens/MyBank/';
// 添加银行卡
import AddBank from './screens/AddBank';
// 设置
import Setup from './screens/Setup';
// 意见反馈
import Comment from './screens/Comment';


/*
* 认证相关
* */
// 认证列表 AuthAll
import Auth from './screens/AuthAll';
// 实名认证 AuthName
import AuthName from './screens/AuthName';
// BasicScreen  基础信息
import AuthBasicInfo from './screens/BasicScreen';
// BasicScreen  工作信息
import AuthBasicWorkInfo from './screens/BasicWork';
// 其它信息认证 授权信息横版  AuthMessageScreen
import AuthOther from './screens/AuthMessageScreen';
// 补充材料
import AuthData from './screens/AuthData';


/*
* 借款相关
* */

// 借款 Loan
import Loan from './screens/Loan';
// 选择医院 Hospital
import HospitalScreen from './screens/Hospital';
// 申请项目 Operation
import Operation from './screens/Operation';
// 手术二级页面 OperationSecond
import OperationSecond from './screens/OperationSecond';
// 申请确认  LoanConfirm
import LoanConfirm from './screens/LoanConfirm';
// 借款结果
import LoanConfirmResult from './screens/LoanConfirmResult';
import LoanResult from "./screens/LoanResult";



/*
* 账单相关
* */

// 账单 BillScreen
import BillScreen from './screens/Bill';
// 账单详情
import BillDetail from './screens/BillDetail';
// 账单分期还款
import BillStage from './screens/BillStage';
// 账单还款确认
import BillConfirm from './screens/BillConfirm';
// 账单还款结果
import BillPayResult from './screens/BillPayResult';
// 账单验证支付
import BillAuthPay from './screens/BillAuthPay';


// 信息认证 和 Upload上传
import Upload from './screens/Upload';
import Web from './screens/WebView';
// 认证补充信息  所有数据都存reducer
import AuthUpload from './screens/AuthUpload';


// 隐私协议
import Policy from './screens/Policy';


// 通讯录
import Contact from './screens/Contact';
// pdf
import PdfView from './screens/PdfView';


const Screens = new Map();
// 首页
Screens.set(Router.HOME, HomeScreen);
// 登录
Screens.set(Router.LOGIN, LoginScreen);
// 我的
Screens.set(Router.MY, MyScreen);
Screens.set(Router.MYBANK, MyBank);
Screens.set(Router.LOANRECORD, LoanRecord);
Screens.set(Router.ADDBANK, AddBank);
Screens.set(Router.SETUP, Setup);
Screens.set(Router.COMMENT, Comment);

/*认证*/
Screens.set(Router.AUTH, Auth);
Screens.set(Router.AUTHNAME, AuthName);
Screens.set(Router.AUTHBASEINFO, AuthBasicInfo);
Screens.set(Router.AUTHBASEWORKINFO, AuthBasicWorkInfo);
Screens.set(Router.AUTHOTHER, AuthOther);
Screens.set(Router.AUTHDATA, AuthData);

/*借款*/
Screens.set(Router.LOAN, Loan);
Screens.set(Router.HOSPITAL, HospitalScreen);
Screens.set(Router.OPERATION, Operation);
Screens.set(Router.OPERATIONSECOND, OperationSecond);
Screens.set(Router.LOANCONFIRM, LoanConfirm);
Screens.set(Router.LOANCONFIRMRESULT, LoanConfirmResult);
Screens.set(Router.LOANRESULT, LoanResult);


// 账单
Screens.set(Router.BILL, BillScreen);
Screens.set(Router.BILLCONFIRM, BillConfirm);
Screens.set(Router.BILLDETAIL, BillDetail);
Screens.set(Router.BILLPAYRESULT, BillPayResult);
Screens.set(Router.BILLSTAGE, BillStage);
Screens.set(Router.BILLAUTHPAY, BillAuthPay);

// 其它
Screens.set(Router.UPLOAD, Upload);
Screens.set(Router.WEB, Web);
Screens.set(Router.AUTHUPLOAD, AuthUpload);

//隐私协议
Screens.set(Router.POLICY, Policy);

// 通讯录
Screens.set(Router.CONTACT, Contact);
// pdf 
Screens.set(Router.PDFVIEW, PdfView);





export default Screens;
