import {put, call, takeEvery} from 'redux-saga/effects';
import {
    InitContractInfo,
    InitContractDetail,
    InitContractSign,
} from '../services/services';

// 获取合同列表
function* EffContractList({payload = {}, callback}) {
    try {
        const data = yield call(InitContractInfo, payload);
        callback && callback(data);
        yield put({type: 'UpdateContractList', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 合同预览
function* EffContractDetail({payload = {}, callback}) {
    try {
        const data = yield call(InitContractDetail, payload);
        callback && callback(data);
        yield put({type: 'UpdateContractDetail', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 合同签约 
function* EffContractSign({payload = {}, callback}) {
    try {
        const data = yield call(InitContractSign, payload);
        callback && callback(data);
        yield put({type: 'UpdateContractSign', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 把内容暴露出去
export default function* sagaIndex() {
    // 合同列表
    yield takeEvery('GetContractList', EffContractList);
    // 合同预览
    yield takeEvery('PreviewContractDetail', EffContractDetail);
    // 合同签约
    yield takeEvery('ContractSign', EffContractSign);

}
