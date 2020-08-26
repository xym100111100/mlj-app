import { MergeState } from '../utils/index';

const initState = {
    name: 'LOANMONEYIndex',

    // 借款记录
    loanRecord: [],
    // 借款详情
    loanDetail: {},
    // 账单列表
    billList: {},
    // 账单详情 [负债信息]
    billDetail: {},
    // 还款计划
    repayPlan: [],
    // 期限
    limit: null,
    // 最高借款
    loanAmt: [
        {
            amount: '10000',
        }
    ],
    loanFastAmt:[
        {
            amount: '10000',
        }
    ],
    moneyStatus: false,
    // 医院
    hospital: {},
    // 手术项目
    operation: {
        level1: {

        },
        level2: {

        }
    },

    // 借款期限列表
    limitList: [],
    // 初始数据 月份 利息 等数据
    repayTypeList: {},
    // 当前选择医院返回的所有
    rateAll: '',
    // 额度确认页数据列表
    loanMoneySureList: {},
    // 提交签约
    SubmitMoneySure: {},
    // 用户选择之后的银行卡数据
    userBankList: [],

};

export default (state = initState, action) => {
    const { type, value } = action;
    switch (type) {
        // 借款记录
        case 'UpdateLoanRecord':
            return MergeState(state, {
                loanRecord: value,
            });
            break;
        // 借款详情
        case 'UpdateLoanDetail':
            return MergeState(state, {
                loanDetail: value,
            });
            break;
        // 账单列表
        case 'UpdateBillList':
            return MergeState(state, {
                billList: value,
            });
            break;
        // 账单详情
        case 'UpdateBillDetail':
            return MergeState(state, {
                billDetail: value,
            });
            break;
        // 还款计划
        case 'UpdateRepayPlan':
            return MergeState(state, {
                repayPlan: value,
            });
            break;
        // 更新借款期限列表
        case 'UpdateLimitList':
            return MergeState(state, {
                limitList: value,
            });
            break;
        // 更新借款医院
        case 'UpdateHospital':
            return MergeState(state, {
                hospital: value,
            });
            break;
        // 当前选择医院返回的所有值 UpdateRate
        case 'UpdateRate':
            return MergeState(state, {
                rateAll: value,
            });
            break;
        // 选择月份之后 =》 更新借款汇率  期限，还款方式
        case 'UpdateRateLimit':
            return MergeState(state, {
                repayTypeList: value,
            });
            break;
        // 更新借款手术项目
        case 'UpdateOperation':
            // operation.push(value);
            const a = state.operation;
            a['level1'] = value;
            return MergeState(state, {
                operation: a,
            });
            break;
        // 更新手术二级项目 
        case 'UpdateOperationChild':
            // operation.push(value);
            const b = state.operation;
            b['level2'] = value;
            return MergeState(state, {
                operation: b,
            });
            break;
        // 更新借款期限
        case 'UpdateLimit':
            return MergeState(state, {
                limit: value,
            });
            break;
        // 修改用户当前输入的额度
        case 'UpdateLoanAmtMoney':
            return MergeState(state, {
                loanAmt: value,
                moneyStatus: true,
            });
            break;
        case 'UpdateFastLoanAmtMoney':
            return MergeState(state, {
                loanFastAmt: value,
            });
            break;

        // 申请确认页数据列表
        case 'UpdateLoanMoneySure':
            return MergeState(state, {
                loanMoneySureList: value,
            });
            break;
        // 签约确认接口 UpdateSubmitMoneySure
        case 'UpdateSubmitMoneySure':
            return MergeState(state, {
                SubmitMoneySure: value,
            });
            break;
        // 修改用户选择之后的银行卡
        case 'UpdateUserBankList':
            return MergeState(state, {
                userBankList: value.value,
            });
            break;
        default:
            return state;
            break;
    }
};
