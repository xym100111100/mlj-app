import {put, call, takeEvery} from 'redux-saga/effects';
import {
  InitIndexInfo,
  BindSaleNum,
  InitUserInfo,
} from '../services/services';

// 初始化客户信息
function* EffIndexInfo({payload = {}, callback}) {
  try {
    const data = yield call(InitIndexInfo, payload);
    yield put({type: 'UpdateClientInfo', value: data.data});
    callback && callback(data);
  } catch (e) {
    yield put({type: 'fetch_error', value: e});
  }
}

// 绑定销售人员的ID
function* EffBindSaleNum({payload = {}, callback}) {
  try {
    const data = yield call(BindSaleNum, payload);
    // 绑定完销售客服之后，更新用户信息
    if (data.code === 0) {
      const result = yield call(InitUserInfo, payload);
      yield put({type: 'updateUserInfo', value: result.data});
      callback && callback(data);
    }
    
  } catch (e) {
    yield put({type: 'fetch_error', value: e});
  }
}


// 把内容暴露出去
export default function* sagaIndex() {
  // 初始化首页信息
  yield takeEvery('initIndexInfo', EffIndexInfo);
  // 绑定销售ID
  yield takeEvery('initBindServiceInfo', EffBindSaleNum);
}
