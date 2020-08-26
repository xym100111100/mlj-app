import {put, call, takeEvery} from 'redux-saga/effects';
import {
    GetApplyItemList,init_add_operation_item_info
} from '../services/services';

// 这里是effect，副作用等
function* saga_apply_item_info({payload, callback}) {
    try {
        const data = yield call(GetApplyItemList, payload);
        callback && callback(data);
        yield put({type: 'change_applyitem', value: data});

    } catch (e) {
    }
}

function* saga_add_operation_info({payload, callback}) {
    try {
        const data = yield call(init_add_operation_item_info, payload);
        callback && callback(data);
        yield put({type: 'change_addoperationitem', value: data});

    } catch (e) {
    }
}


// 把内容暴露出去
export default function* sagaIndex() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery("initApplyItemInfo", saga_apply_item_info);
    yield takeEvery("initAddOperationItemInfo", saga_add_operation_info);
}
