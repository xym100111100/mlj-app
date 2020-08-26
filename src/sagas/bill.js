import {put, call, takeEvery} from 'redux-saga/effects';
import {
    InitGetBillList,
    InitBillDetail,
    InitBillStage,
    BillPayConfirm,
    BillPaySubmit,
} from '../services/services';

// 账单还款提交
function* EffBillSubmit({payload = {}, callback}) {
    try {
        const data = yield call(BillPaySubmit, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取客户账单列表
function* EffGetBillList({payload = {}, callback}) {
    try {
        const data = yield call(InitGetBillList, payload);
        callback && callback(data);
        yield put({type: 'UpdateBillList', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取客户账单还款计划
function* EffGetBillPlan({payload = {}, callback}) {
    try {
        const data = yield call(InitBillStage, payload);
        callback && callback(data);
        yield put({type: 'UpdateBillPlan', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取客户账单还款确认信息
function* EffGetBillPayInfo({payload = {}, callback}) {
    try {
        const data = yield call(BillPayConfirm, payload);
        callback && callback(data);
        yield put({type: 'UpdateBillPayInfo', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取客户账单详情
function* EffGetBillDetail({payload = {}, callback}) {
    try {
        const data = yield call(InitBillDetail, payload);
        callback && callback(data);
        yield put({type: 'UpdateBillDetail', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取客户账单详情
function* EffSetBillNum({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateBillNum', value: payload.debtNo});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 修改列表是否选中的状态
function* EffUpdateBillStatus({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateBillListStatus', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}
function* EffUpdateSelectItemStatus({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateSelectItemStatus', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 把内容暴露出去
export default function* sagaIndex() {
    // 获取客户账单
    yield takeEvery('GetBillList', EffGetBillList);
    // 账单每期列表
    yield takeEvery('BillStage', EffGetBillPlan);
    // 账单详情
    yield takeEvery('BillDetail', EffGetBillDetail);
    // 账单还款确认
    yield takeEvery('BillPayInfo', EffGetBillPayInfo);
    // 账单还款提交
    yield takeEvery('BillPaySubmit', EffBillSubmit);
    // 设置当前账单编号
    yield takeEvery('SetBillNum', EffSetBillNum);
    yield takeEvery('UpdateBillStatus', EffUpdateBillStatus);
    yield takeEvery('UpdateSelectItemListStatus', EffUpdateSelectItemStatus);

}
