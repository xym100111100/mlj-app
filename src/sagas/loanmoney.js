import {put, call, select, takeEvery} from 'redux-saga/effects';
import {
    LoanSubmitFirstUrl,
    LoanLimitUnitRateUrl,
    RepayPlanUrl,
    LoanRecordUrl,
    GetLoanMoneySure,
    applySubmitMoneySure,
    BankListUrl,
    InitGetLateByClientNo,
} from '../services/services';


// 提交数据  这里是effect，副作用等
function* EffLoanSubmit({payload={}, callback}) {
    try {
        const data = yield call(LoanSubmitFirstUrl, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//  当前汇率 init_limit_unit_rate_info
function* EffLoanLimitUnitRate({payload={}, callback}) {
    try {
        const data = yield call(LoanLimitUnitRateUrl, payload);
        callback && callback(data);
        yield put({type: 'UpdateRate', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//  当前还款计划列表
function* EffRepayPlan({payload, callback}) {
    try {
        const data = yield call(RepayPlanUrl, payload);
        yield put({type: 'UpdateRepayPlan', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//修改当前页面期数选中之后数据
function* EffUpdateRateList({payload= {}, callback}) {
    try {
        yield put({type: 'UpdateRateLimit', value: {...payload}});
        callback && callback();

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//修改借款额度为默认额度
function* EffUpdateLoanAmtMoney({payload= {}, callback}) {
    try {
        yield put({type: 'UpdateLoanAmtMoney', value: {...payload}});


        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


function* EffUpdateFastLoanAmtMoney({payload= {}, callback}) {
    try {
        yield put({type: 'UpdateFastLoanAmtMoney', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 立即分期 列表数据

function* EffUpdateLoanMoneySure({payload= {}, callback}) {
    try {
        const data = yield call(InitGetLateByClientNo, payload);
        callback && callback(data);
        yield put({type: 'UpdateLoanMoneySure', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 借款申请=》签约确认页面

function* EffApplySubmitMoneySure({payload= {}, callback}) {
    try {
        const data = yield call(applySubmitMoneySure, payload);
        callback && callback(data);
        yield put({type: 'UpdateSubmitMoneySure', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//借款记录
function* EffLoanRecord({payload= {}, callback}) {
    try {
        const data = yield call(LoanRecordUrl, payload);
        yield put({type: 'UpdateLoanRecord', value: data.data});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 修改用户选择之后的银行卡

function* EffUpdateUserBankList({payload = {}, callback}) {
    try {
        
        yield put({type: 'UpdateUserBankList', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}



// 把内容暴露出去
export default function* sagaIndex() {
    // 借款记录
    yield takeEvery('LoanSubmit', EffLoanSubmit);
    // 借款记录
    yield takeEvery('LoanRecord', EffLoanRecord);
    // 借款详情
    // yield takeEvery('LoanDetail', EffLoanDetail);
    // 账单列表
    // yield takeEvery('BillList', EffBillList);
    // 账单详情
    // yield takeEvery('BillDetail', EffBillDetail);
    // 还款计划
    yield takeEvery('RepayPlan', EffRepayPlan);
    // 借款期限列表
    // yield takeEvery('LimitList', EffLimitList);
    // 借款医院选择
    // yield takeEvery('SelectLoanHospital', EffSelectLoanHospital);
    // 借款手术项目选择
    // yield takeEvery('SelectLoanOperation', EffSelectLoanOperation);
    // 借款期限选择
    // yield takeEvery('SelectLoanLimit', EffSelectLoanLimit);
    // 借款期限选择
    yield takeEvery('LoanLimitUnitRate', EffLoanLimitUnitRate);
    yield takeEvery('loanUpdateRateList', EffUpdateRateList);
    // 修改用户填写额度
    yield takeEvery('loanUpdateAmtMoney', EffUpdateLoanAmtMoney);
    // 用户当前申请确认列表数据
    yield takeEvery('loanUpdateMoneySureList', EffUpdateLoanMoneySure);
    // 借款申请=》签约确认页面
    yield takeEvery('loanSubmitMoneySure', EffApplySubmitMoneySure);
    // 修改用户选择之后的银行卡
    yield takeEvery('initUserBankList', EffUpdateUserBankList);
    yield takeEvery('loanFastUpdateAmtMoney', EffUpdateFastLoanAmtMoney);





}
