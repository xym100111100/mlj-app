import {put, call, select, takeEvery} from 'redux-saga/effects';
import {
    BankListUrl,
    BankTypeListUrl,
    BankGetVerifyCodeUrl,
    BankSubmitUrl,
} from '../services/services';


// 新增银行卡提交
function* EffBankSubmit({payload={}, callback}) {
    try {
        const data = yield call(BankSubmitUrl, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//  银行卡列表
function* EffBankList({payload, callback}) {
    try {
        const data = yield call(BankListUrl, payload);
        callback && callback(data);
        yield put({type: 'UpdateBankList', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

//  银行卡类型列表
function* EffBankTypeList({payload, callback}) {
    try {
        const data = yield call(BankTypeListUrl, payload);
        yield put({type: 'UpdateBankTypeList', value: data.data});
        callback && callback(data);

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


//  银行卡发送验证码
function* EffBankSendVerifyCode({payload, callback}) {
    try {
        const data = yield call(BankGetVerifyCodeUrl, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}





// 把内容暴露出去
export default function* sagaIndex() {
    // 借款记录
    yield takeEvery('BankList', EffBankList);
    yield takeEvery('BankTypeList', EffBankTypeList);
    yield takeEvery('BankSubmit', EffBankSubmit);
    yield takeEvery('BankSendVerifyCode', EffBankSendVerifyCode);



}
