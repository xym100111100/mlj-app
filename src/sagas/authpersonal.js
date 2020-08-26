import {put, call, takeEvery} from 'redux-saga/effects';
import {
    GetOssSign,
    CreaditAuth,
    SelectCreditListDetail,
    GetCreditListDetail,
    AddCreditListDetail,
    CreaditAuthData,
    CheckCreditListDetail
} from '../services/services';

// 获取授权信息列表

function* EffCreaditAuth({payload={}, callback}) {
    try {
        const data = yield call(CreaditAuth, payload);
        callback && callback(data);
        yield put({type: 'UpdateAuthList', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 文件上传
function* EffGetOssSign({payload={}, callback}) {
    try {
        const data = yield call(GetOssSign, payload);
        callback && callback(data);
        // yield put({type: 'UpdateUploadOssImgList', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 当前选中需要认证的项目
function* EffCreditSelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateCreditTypeNo', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取当前用户已经传的图

function* EffCreditListDetail({payload = {}, callback}) {
    try {
        const data = yield call(GetCreditListDetail, payload);
        callback && callback(data);
        yield put({type: 'UpdateCreditImgList', value: data.data.creditUrlPath });
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 上传图---添加授信信息详情

function* EffAddCreditListDetail({payload = {}, callback}) {
    try {
        const data = yield call(AddCreditListDetail, payload);
        callback && callback(data);
        // yield put({type: 'UpdateCreditListDetail', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}
// 上传图---添加授信信息详情

function* EffCheckCreditListDetail({payload = {}, callback}) {
    try {
        const data = yield call(CheckCreditListDetail, payload);
        callback && callback(data);
        // yield put({type: 'UpdateCreditListDetail', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 更新imglist 列表
// function* EffUpdateImgList({payload = {}, callback}) {
//     try {
//         yield put({type: 'UpdateUploadImgList', value: {...payload}});
//         callback && callback();
//     } catch (e) {
//         yield put({type: 'fetch_error', value: e});
//     }
// }

// 补充材料初始化数据  并计算当前已经存在的照片数量

function* EffCreaditAuthData({payload={}, callback}) {
    try {
        const data = yield call(CreaditAuthData, payload);
        callback && callback(data);
        yield put({type: 'UpdateAuthDataList', value: data.data});

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}
// 补充材料相关

function* EffCreditAuthDataSelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateCreditTypeNoAuthData', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 修改客户经理合影列表数据 
function* EffUpdateAuthUploadList({payload={}, callback}) {
    try {
        yield put({type: 'UpdateCustomerList', value: {...payload}});
        callback && callback();

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 手术单照片

function* EffUpdateAuthOperationList({payload={}, callback}) {
    try {
        yield put({type: 'UpdateOperationList', value: {...payload}});
        callback && callback();

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 告知书照片

function* EffUpdateAuthNoticeList({payload={}, callback}) {
    try {
        yield put({type: 'UpdateNoticeList', value: {...payload}});
        callback && callback();

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 银行卡照片 
function* EffUpdateAuthBankOtherList({payload={}, callback}) {
    try {
        yield put({type: 'UpdateBankOtherList', value: {...payload}});
        callback && callback();

    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}



// 把内容暴露出去
export default function* sagaIndex() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery("GetOssSign", EffGetOssSign);
    yield takeEvery("CreaditAuth", EffCreaditAuth);
    yield takeEvery("CreaditAuthData", EffCreaditAuthData);
    yield takeEvery("CreditNoSelect", EffCreditSelect);
    yield takeEvery("SelectCreditListDetail", EffCreditListDetail);
    yield takeEvery("AddCreditListDetail", EffAddCreditListDetail);
    // 检查用户授信信息是否已经传完
    yield takeEvery("CheckCreditListDetail", EffCheckCreditListDetail);
    // yield takeEvery("UpdateUploadImgList", EffUpdateImgList);
    // 补充材料列表数据状态
    yield takeEvery("CreditNoAuthDataSelect", EffCreditAuthDataSelect);
    // 补充材料照片列表
    yield takeEvery("UpdateAuthUploadList", EffUpdateAuthUploadList);
    yield takeEvery("UpdateAuthOperationList", EffUpdateAuthOperationList);
    yield takeEvery("UpdateAuthNoticeList", EffUpdateAuthNoticeList);
    yield takeEvery("UpdateAuthBankList", EffUpdateAuthBankOtherList);

}
