import {put, call, takeEvery} from 'redux-saga/effects';
import {
    init_apply_item_info
} from '../services/services';

// 这里是effect，副作用等
function* saga_apply_item_info({payload, callback}) {
    try {
        const data = yield call(init_apply_item_info, payload);
        callback && callback(data);
        yield put({type: 'change_surgeryitem', value: data});

    } catch (e) {
    }
}


// 手术项目选中,把值更新到
function* EffOperationSelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateOperation', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 手术项目二级

function* EffOperationSelectChild({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateOperationChild', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}



// 把内容暴露出去
export default function* sagaIndex() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery("initApplyItemInfo", saga_apply_item_info);
    yield takeEvery("OperationSelect", EffOperationSelect);
    yield takeEvery("OperationSelectChild", EffOperationSelectChild);
}
