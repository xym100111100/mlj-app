import {put, call, takeEvery} from 'redux-saga/effects';
import {
    InitGetPolicyList,
} from '../services/services';

// 修改当前webiview的url 

function* EffPolicyUrl({payload = {}, callback}) {
    try {
        const data = yield call(InitGetPolicyList, payload);
        callback && callback(data);
        yield put({type: 'UpdatePolicyUrl', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 当前选中的url
function* EffSelectPolicyUrl({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateSelectPolicyList', value: {...payload}});
        callback && callback();

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}




// 把内容暴露出去
export default function* sagaLogin() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery('initPolicyUrl', EffPolicyUrl);
    yield takeEvery('selectPolicyUrl', EffSelectPolicyUrl);
}
