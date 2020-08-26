 const API = 'http://tool.jqtianxia.net:9011';
//const API = 'https://mlj-app-api.jqtianxia.com';
const InterFace = {
    /*
    * 用户和登录
    * */
    // 登录验证码
    InitSendCode: `${API}/login/sendCode`,
    // 添加银行卡签约验证码
    SendCardAuthCode: `${API}/card/cardAuth`,
    // 登录
    InitLoginSign: `${API}/login/sign`,


    /*
    * 借款前
    * */

    // 首页初始化
    InitIndexList: `${API}/client/home`,
    // 绑定客户号【销售人员ID】
    InitBindService: `${API}/client/bindSalesman`,

    /*
    * 信息认证和信息
    * */
    // 基础信息认证
    InitClientInfoUrl: `${API}/client/getLoginClient`,
    // 实名认证提交
    InitAuthName: `${API}/client/realAuth`,
    // 添加客户基本信息
    BaseInfoAuthUrl: `${API}/client/addClientInfo`,
    // 授信信息列表
  //  CreaditAuthList: `${API}/creadit/creditList`,
    CreaditAuthList: `${API}/creadit/creditListAndDetail`,
    // 当前用户已经认证的图 --查询授信信息详情  /creadit/
    SelectCreditListDetail: `${API}/creadit/selectCreditListDetail`,
    // 上传用户传的图-- 添加授信信息详情
    AddCreditListDetail: `${API}/creadit/addCreditListDetail`,

    // 检查用户授信信息是否已经传完
    CheckCreditListDetail: `${API}/creadit/checkCreditListDetail`,



    // ocr识别
    IdCardOcr: `https://cloudapi.linkface.cn/ocr/idcard`,
    // 城市列表数据
    InitAreaList: `${API}/client/getAreaList`,
    // 城市列表查询
    GetCityList: `${API}/client/getCityList`,
    // 添加用户工作基本信息 /client/AddJobInfo
    InitAddJobInfo: `${API}/client/AddJobInfo`,
    // 学历列表
    InitGetAllEducation: `${API}/client/getAllEducation`,
    // 用户认证信息状态 /client/getAuthInfoState
    InitGetAuthInfoState: `${API}/client/getAuthInfoState`,
    // 补充材料列表 
    InitGetAuthData: `${API}/creadit/getClientCertificateType`,
    // 通讯录数据上传 
    InitSubmitContactAll: `${API}/client/uploadAddressList`,
    // 意见反馈提交 
    AddComment: `${API}/client/addOpinionContent`,
    // 意见反馈提交 
    InitCommentType: `${API}/client/getOpinionTypeList`,







    /*
    * 银行卡
    * */
    // 银行卡列表
    BankListUrl: `${API}/card/clientBankCodeList`,
    // 银行卡类型列表
    BankTypeListUrl: `${API}/card/getBankCodeList`,
    // 银行卡新增
    BankAddUrl: `${API}/card/addBankCode`,
    // 当前银行卡
    BankSelectUrl: `${API}/card/getByUsed`,



    /*
    * 客户借款接口
    * */
    // 提交借款申请 post
    InitLoanMoneyReview: `${API}/loan/loanApplication`,
    // 借款提交确认 post
    LoanSubmitConfirm: `${API}/loan/confirmApplication`,
    // 查看还款计划 post
    InitLoanDebtPlan: `${API}/loan/debtPlan`,
    // 借款记录 get
    LoanRecordUrl: `${API}/loan/applyList`,
    // 借款详情 get
    LoanDetailUrl: `${API}/loan/confirmDept`,
    
    /*
    *  客户账单接口
    * */
    // 账单详情 get
    BillDetailUrl: `${API}/loan/debtInfoDetail`,
    // 账单列表 get
    BillListUrl: `${API}/loan/debtInfoList`,
    // 账单分期还款列表
    BillStageUrl:`${API}/loan/confirmDept`,
    // 账单还款确认信息 (创建还款订单)
    BillPayConfirmUrl:`${API}/loan/infoConfirmation`,
    // 查询状态为审核通过的负债信息（首页吧？） get
    BillUrl: `${API}/loan/getDebtInfo`,
    // 提交还款 post
    RepaySubmitUrl: `${API}/loan/repayment`,
    // 最新申请记录  立即分期初始化数据
    GetLateByClientNo: `${API}/creadit/getLatestByClientNo`,


    
    /*
    * 商户服务接口
    * */
    // 医院列表
    InitHospitalList: `${API}/partner/getHospitalList`,
    // 根据name查询医院列表
    InitHospitalListByName: `${API}/partner/hospitalInfo`,
    // 根据医院ID查询医院名称
    InitHospitalNameById: `${API}/partner/getHospitalName`,
    // 手术项目列表
    InitApplyItem: `${API}/partner/operationInfo`,
    // 手动新增手术项目
    InitAddOperationItem: `${API}/partner/addOperation`,
    // 获取医院利率
    InitLitmitUnitRate: `${API}/partner/getLimitUnit`,
    // 上传文件
    InitOssUpload: `${API}/file/ossUpload`,
    InitOssSignNature: `${API}/file/signature`,
    InitOssCallBack: `${API}/file/callback`,
    InitOssGenerateTempURL: `${API}/file/generateTempURL`,


    /*
    * 合同
    * */
    // 合同详情
    ContractDetailUrl: `${API}/contract/getContractByDebtNo`,
    // 合同列表
    ContractListUrl: `${API}/contract/getContractListByDebtNo`,
    // 合同签约
    ContractSignUrl: `${API}/contract/signContract`,
    // 获取协议列表 
    InitGetPolicy: `${API}/contract/getAgreement`,



};

export default InterFace;


