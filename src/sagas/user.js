import {put, call, takeEvery} from 'redux-saga/effects';
import {
    InitUserInfo,
} from '../services/services';

// 初始化客户信息
function* EffClientInfo({payload = {}, callback}) {
    try {
        const data = yield call(InitUserInfo, payload);
        yield put({type: 'updateUserInfo', value: data.data});
        callback && callback(data);
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}


// 把内容暴露出去
export default function* sagaLogin() {
    yield takeEvery('initClientInfo', EffClientInfo);
}
