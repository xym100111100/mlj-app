// action 创建函数
import {request, API} from '../utils';


/*
* 登录 验证码
* */

// 短信请求 & 登陆
export function init_login_info(data) {
    return request({
        url: API.InitLoginSign,
        method: 'get',
        data,
    })
}

export function init_sendcode_info(data) {
    return request({
        url: API.InitSendCode,
        method: 'get',
        data,
    })
}
export function send_card_auth_code(data) {
    return request({
        url: API.SendCardAuthCode,
        method: 'put',
        data,
    })
}



/*
* 首页接口信息
* */

// 初始化首页信息
export function InitIndexInfo(data) {
    return request({
        url: API.InitIndexList,
        method: 'get',
        data,
    });
}

// 绑定销售编号
export function BindSaleNum(data) {
    return request({
        url: API.InitBindService,
        method: 'post',
        data,
    });
}

/*
* 医院相关
* */

// 查询医院
export function SearchHospitalByNameUrl(data) {
    return request({
        url: API.InitHospitalListByName,
        method: 'get',
        data,
    });
}

// 医院信息确认
export function HospitalListUrl(data) {
    return request({
        url: API.InitHospitalList,
        method: 'get',
        data,
    });
}


/*
* 手术相关
* */

//查询当前手术项目

export function GetApplyItemList(data) {
    return request({
        url: API.InitApplyItem,
        method: 'get',
        data,
    });
}

// 查询当前手术项目
export function init_apply_item_info(data) {
    return request({
        url: API.InitApplyItem,
        method: 'get',
        data,
    })
}

// 用户手动添加项目
export function init_add_operation_item_info(data) {
    return request({
        url: API.InitAddOperationItem,
        method: 'post',
        data,
    });
}


/*
* 借款还款相关
* */


// 初审页面 提交申请
export function LoanSubmitFirstUrl(data) {
    return request({
        url: API.InitLoanMoneyReview,
        method: 'post',
        data,
    });
}

// 初审页面 获取当前利率
export function LoanLimitUnitRateUrl(data) {
    return request({
        url: API.InitLitmitUnitRate,
        method: 'get',
        data,
    });
}

// 获取当前计划列表
export function RepayPlanUrl(data) {
    return request({
        url: API.InitLoanDebtPlan,
        method: 'post',
        data,
    });
}

// 借款记录， 获取申请记录
export function LoanRecordUrl(data) {
    return request({
        url: API.LoanRecordUrl,
        method: 'get',
        data,
    });
}

/*
 auth认证列表   查询授信信息列表
*/
export function  CreaditAuth(data) {
    return request({
        url: API.CreaditAuthList,
        method: 'get',
        data,
    })
}
/*
* 补充材料初始化数据 （查询客户凭证类型）
*/
export function  CreaditAuthData(data) {
    return request({
        url: API.InitGetAuthData,
        method: 'get',
        data,
    })
}

/*
*查询状态为审核通过的负债信息 初审申请确认信息
*/

export function  GetLoanMoneySure(data) {
    return request({
        url: API.BillUrl,
        method: 'get',
        data,
    })
}

/*
* LoanSubmitConfirm  借款申请=》签约确认页面
*/

export function  applySubmitMoneySure(data) {
    return request({
        url: API.LoanSubmitConfirm,
        method: 'post',
        data,
    })
}



/*
*查询授信信息详情
*/
export function  GetCreditListDetail(data) {
    return request({
        url: API.SelectCreditListDetail,
        method: 'post',
        data,
    })
}

/*
*添加授信信息详情
*/

export function  AddCreditListDetail(data) {
    return request({
        url: API.AddCreditListDetail,
        method: 'post',
        data,
    })
}

/*
* 用户信息认证状态  
*/

export function  GetAuthInfoState(data) {
    return request({
        url: API.InitGetAuthInfoState,
        method: 'get',
        data,
    })
}

/*
* 文件上传
* */

// 获取oss验签
export function  GetOssSign(data) {
    return request({
        url: API.InitOssSignNature,
        method: 'get',
        data,
    })
}

/*
* ocr识别
*/

export function  GetIdCardOcr(data) {
    return request({
        url: API.IdCardOcr,
        method: 'post',
        data,
    })
}

/*
 * 实名认证
 * */

export function UploadAuthName(data) {
    return request({
        url: API.InitAuthName,
        method: 'post',
        data,
    })
}

/*
* 获取城市三级列表
*/

export function GetAreaListAll(data) {
    return request({
        url: API.InitAreaList,
        method: 'get',
        data,
    })
}

/*
* 获取工作城市列表
*/
export function GetWorkAreaListAll(data) {
    return request({
        url: API.GetCityList,
        method: 'get',
        data,
    })
}
/*
* 添加用户工作基本信息
*/
export function AddJobInfoList(data) {
    return request({
        url: API.InitAddJobInfo,
        method: 'post',
        data,
    })
}

/*
* 添加客户基本信息
*/
export function SubmitUserInfo(data) {
    return request({
        url: API.BaseInfoAuthUrl,
        method: 'post',
        data,
    })
}

/*
* 获取学历列表
*/
export function GetAllEducation(data) {
    return request({
        url: API.InitGetAllEducation,
        method: 'get',
        data,
    })
}
/*
* 立即分期初始化数据
*/
export function InitGetLateByClientNo(data) {
    return request({
        url: API.GetLateByClientNo,
        method: 'get',
        data,
    })
}


/*
* 银行卡相关
* */

// 获取银行卡列表
export function BankListUrl(data) {
    return request({
        url: API.BankListUrl,
        method: 'get',
        data,
    });
}

// 新增银行卡提交
export function BankSubmitUrl(data) {
    return request({
        url: API.BankAddUrl,
        method: 'post',
        data,
    });
}


// 银行卡新增获取验证码
export function BankGetVerifyCodeUrl(data) {
    return request({
        url: API.BankAddUrl,
        method: 'get',
        data,
    });
}

// 银行卡类型列表
export function BankTypeListUrl(data) {
    return request({
        url: API.BankTypeListUrl,
        method: 'get',
        data,
    });
}

/*
*  用户相关
* */

// 查询当前用户信息
export function InitUserInfo(data) {
    return request({
        url: API.InitClientInfoUrl,
        method: 'get',
        data,
    });
}

/*
* 用户通讯录 
*/

export function InitContactAllList(data) {
    return request({
        url: API.InitSubmitContactAll,
        method: 'post',
        data,
    });
}

/*
*合同相关  ContractListUrl
*/

// 获取合同列表
export function InitContractInfo(data) {
    return request({
        url: API.ContractListUrl,
        method: 'get',
        data,
    });
}

// 合同预览  废弃接口
export function InitContractDetail(data) {
    return request({
        url: API.ContractDetailUrl,
        method: 'post',
        data,
    });
}

// 合同签约

export function InitContractSign(data) {
    return request({
        url: API.ContractSignUrl,
        method: 'post',
        data,
    });
}

// 获取当前所有协议列表
export function InitGetPolicyList(data) {
    return request({
        url: API.InitGetPolicy,
        method: 'get',
        data,
    });
}


/*
* 账单相关接口
*/
// 查看客户账单列表
export function InitGetBillList(data) {
    return request({
        url: API.BillListUrl,
        method: 'get',
        data,
    });
}

// 查看客户账单详情
export function InitBillDetail(data) {
    return request({
        url: API.BillDetailUrl,
        method: 'get',
        data,
    });
}

// 查看客户账单分期列表
export function InitBillStage(data) {
    return request({
        url: API.BillStageUrl,
        method: 'get',
        data,
    });
}


// 账单还款确认
export function BillPayConfirm(data) {
    return request({
        url: API.BillPayConfirmUrl,
        method: 'post',
        data,
    });
}

// 账单还款提交
export function BillPaySubmit(data) {
    return request({
        url: API.RepaySubmitUrl,
        method: 'post',
        data,
    });
}

// 意见反馈提交提交
export function CommentSubmit(data) {
    return request({
        url: API.AddComment,
        method: 'post',
        data,
    });
}
// 获取所有意见类型
export function InitCommentType(data) {
    return request({
        url: API.InitCommentType,
        method: 'get',
        data,
    });
}
// 获取所有意见类型
export function CheckCreditListDetail(data) {
    return request({
        url: API.CheckCreditListDetail,
        method: 'post',
        data,
    });
}
