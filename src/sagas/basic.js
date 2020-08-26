import {put, call, takeEvery} from 'redux-saga/effects';
import {
    init_sendcode_info,
    GetAreaListAll,
    GetWorkAreaListAll,
    GetAllEducation,
    SubmitUserInfo,
    AddJobInfoList,
    GetAuthInfoState,
    InitContactAllList,
    CommentSubmit,
    InitCommentType
} from '../services/services';

// 用户认证信息状态
function* AuthInfoListState({payload, callback}) {
    try {
        const data = yield call(GetAuthInfoState, payload);
        callback && callback(data);
        yield put({type: 'UpdateAuthInfoList', value: data.data});
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}

// 获取城市列表
function* GetAreaListAllSaga({payload, callback}) {
    try {
        const data = yield call(GetAreaListAll, payload);
        callback && callback(data);
        yield put({type: 'UpdateAreaList', value: data.data});
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}

// 获取工作城市列表

function* GetWorkAreaListAllSaga({payload, callback}) {
    try {
        const data = yield call(GetWorkAreaListAll, payload);
        callback && callback(data);
        yield put({type: 'updateWorkAreaList', value: data.data});
    } catch (e) {
        yield put({type: 'requestFail', value: e});
    }
}
// 修改选择的城市
function* EffcitySelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateCitySelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}
// 修改工作行业列表
function* EffJobListSelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateJobListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 更新工作城市
function* EffWorkListSelect({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateWorkCitySelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 添加用户工作信息
function* EffAddJobInfoList({payload = {}, callback}) {
    try {
        const data = yield call(AddJobInfoList, payload);
        callback && callback(data);
        yield put({type: 'UpdateAddJobInfoList', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 获取学历列表
function* EffGetAllEducation({payload = {}, callback}) {
    try {
        const data = yield call(GetAllEducation, payload);
        callback && callback(data);
        yield put({type: 'UpdateEducation', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 提交基本信息
function* EffSubmitUserInfo({payload = {}, callback}) {
    try {
        const data = yield call(SubmitUserInfo, payload);
        callback && callback(data);
        yield put({type: 'UpdateUserBasicInfo', value: data.data});
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 更新通讯录
function* EffSaveContacts({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateContact', value: payload.data});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 更新用户选择的通讯录 
function* EffSavaContactInfoList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateContactInfoList', value: payload.data});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 更新当前通讯录1 2 状态  
function* EffContactStatus({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateContactStatus', value: payload});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

function* EffSavaContactTwoInfoList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateContactTwoInfoList', value: payload.data});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 基本信息  收入

function* EffupdateMoneySelectList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateMoneyListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 基本信息  学历  

function* EffupdateSchoolSelectList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateSchoolListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 婚姻  

function* EffupdateMarrySelectList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateMarryListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 关系 

function* EffupdateContactSelectList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateContactListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


function* EffupdateContactTwoSelectList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateContactTwoListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// update wechat  

function* EffupdateWechatqqSelectList({payload = {}, callback}) {
    try {
        yield put({type: 'UpdateWechatqqListSelect', value: {...payload}});
        callback && callback();
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 上传通讯录数据 

function* EffInitContactAllList({payload = {}, callback}) {
    try {
        const data = yield call(InitContactAllList, payload.conArr);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}

// 上传意见反馈
function* EffSaveCommentSubmit({payload = {}, callback}) {
    try {
        const data = yield call(CommentSubmit, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}
// 上传意见反馈
function* EffInitCommentType({payload = {}, callback}) {
    try {
        const data = yield call(InitCommentType, payload);
        callback && callback(data);
    } catch (e) {
        yield put({type: 'fetch_error', value: e});
    }
}


// 把内容暴露出去
export default function* sagaLogin() {
    // 第一个参数 就是 actions，通过dispath 这个actions,去更新数据;
    yield takeEvery('initAreaListAll', GetAreaListAllSaga);
    yield takeEvery('initWorkAreaListAll', GetWorkAreaListAllSaga);
    // 居住地区选择
    yield takeEvery('updateCitySelectList', EffcitySelect);
    // 工作行业列表
    yield takeEvery('updateJobSelectList', EffJobListSelect);
    // 工作城市地址
    yield takeEvery('updateWorkListSelect', EffWorkListSelect);
    // 添加用户工作信息
    yield takeEvery('AddJobInfoList', EffAddJobInfoList);
    // 获取学历列表
    yield takeEvery('InitGetAllEducation', EffGetAllEducation);
    // 添加客户基本信息
    yield takeEvery('SubmitUserInfo', EffSubmitUserInfo);
    // 用户信息认证状态
    yield takeEvery('InitAuthInfoListState', AuthInfoListState);
    // 更新通讯录
    yield takeEvery('SavaContacts', EffSaveContacts);
    // 更新选中的通讯录
    yield takeEvery('SavaContactInfoList', EffSavaContactInfoList);
    yield takeEvery('SavaContactTwoInfoList', EffSavaContactTwoInfoList);
    // 维护状态
    yield takeEvery('ContactStatus', EffContactStatus);
    // 基本信息 学历

    yield takeEvery('updateMoneySelectList', EffupdateMoneySelectList);
    yield takeEvery('updateSchoolSelectList', EffupdateSchoolSelectList);
    yield takeEvery('updateMarrySelectList', EffupdateMarrySelectList);
    yield takeEvery('updateContactSelectList', EffupdateContactSelectList);
    yield takeEvery('updateContactTwoSelectList', EffupdateContactTwoSelectList);
    yield takeEvery('updateWechatqqSelectList', EffupdateWechatqqSelectList);

    // 通讯录 
    yield takeEvery('InitContactAllList', EffInitContactAllList);
    // 通讯录 
    yield takeEvery('CommentSubmit', EffSaveCommentSubmit);
    // 通讯录 
    yield takeEvery('InitCommentType', EffInitCommentType);



}
