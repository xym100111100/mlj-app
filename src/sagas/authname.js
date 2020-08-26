import {put, call, takeEvery} from 'redux-saga/effects';
import {
    GetOssSign,
    UploadAuthName,
    GetIdCardOcr,
    GetAuthInfoState,
} from '../services/services';

// 实名认证

function* EffAuthName({payload={}, callback}) {
    try {
        const data = yield call(UploadAuthName, payload);
        yield put({type: 'UpdateAuthNameCardlist', value: data.data});
        
        // 更新认证列表页面
        const result = yield call(GetAuthInfoState, payload);
        yield put({type: 'UpdateAuthInfoList', value: result.data});
        
        // 更新首页信息
        
        // 更新客户信息
        
        
        
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 文件上传 oss key  用户身份证
function* EffGetOssSign({payload={}, callback}) {
    try {
        const data = yield call(GetOssSign, payload);
        callback && callback(data);
        // yield put({type: 'UpdateOcrOssList', value: data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 用户身份证识别接口
function* EffGetIdCardOcr({payload={}, callback}) {
    try {
        const data = yield call(GetIdCardOcr, payload);
        callback && callback(data);
        yield put({type: 'UpdateGetIdCardOcr', value: data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}
// 修改上传身份证图url
function* EffUpdateIdCardUrl({payload={}, callback}) {
    try {
        yield put({type: 'UpdateIdCardOcrUrl', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 更新当前身份证ocr信息

function* EffUpdateOcrUserInfo({payload={}, callback}) {
    try {
        yield put({type: 'UpdateOcr', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 把内容暴露出去
export default function* sagaIndex() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery("GetOssSignAuthName", EffGetOssSign);
    yield takeEvery("SubmitAuthName", EffAuthName);
    // ocr 识别
    yield takeEvery("GetUserIdCardOcr", EffGetIdCardOcr);
    
    
    yield takeEvery("UpdateIdCardUrl", EffUpdateIdCardUrl);
    yield takeEvery("UpdateOcrUserInfo", EffUpdateOcrUserInfo);

}
