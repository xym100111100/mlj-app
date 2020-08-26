import {put, call, takeEvery} from 'redux-saga/effects';
import {
    init_login_info,
    init_sendcode_info,
    send_card_auth_code
} from '../services/services';

// 获取短信验证码
function* SendLoginVerify({payload, callback}) {
    try {
        // 短信请求
        const data = yield call(init_sendcode_info, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}
// 获取添加银行卡签约验证码
function* SendCardAuthCode({payload, callback}) {
    try {
        // 短信请求
        const data = yield call(send_card_auth_code, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}

// 登录SignIn
function* LoginSign({payload, callback}) {
    try {
        const data = yield call(init_login_info, payload);
        yield put({type: 'updateUserInfo', value: data.data});
        callback && callback(data);
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}


// 把内容暴露出去
export default function* sagaLogin() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery('initLoginInfo', SendLoginVerify);
    yield takeEvery('initLoginSignInfo', LoginSign);
    yield takeEvery('sendCardAuthCode', SendCardAuthCode);
}
