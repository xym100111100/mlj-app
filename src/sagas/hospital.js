import {put, call, takeEvery} from 'redux-saga/effects';
import {
    SearchHospitalByNameUrl,
    HospitalListUrl,
} from '../services/services';

// 根据名字搜索医院
function* EffSearchHospital({payload = {}, callback}) {
    try {
        const data = yield call(SearchHospitalByNameUrl, payload);
        yield put({type: 'UpdateHospitalList', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 默认医院列表
function* EffHospitalList({payload = {}, callback}) {
    try {
        const data = yield call(HospitalListUrl, payload);
        yield put({type: 'UpdateHospitalList', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 医院选中,把值更新到loanMoney的reducers 当中
function* EffHospitalSelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateHospital', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 把内容暴露出去
export default function* sagaIndex() {
    // 使用名字搜索医院
    yield takeEvery('SearchHospital', EffSearchHospital);
    // 医院列表
    yield takeEvery('HospitalList', EffHospitalList);
    // 医院选中
    yield takeEvery('HospitalSelect', EffHospitalSelect);
}
