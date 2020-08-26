import { MergeState } from '../utils/index';

const initState = {
    name: 'NSBasic',
    // 用户信息认证状态
    AuthInfoList: {},
    // 学历列表
    schoolList: [],
    // 城市列表
    areaList: [],
    // 当前选择的城市
    citySelectList: [],
    // 行业列表
    jobList: [],
    //工作城市
    workList: [],
    // 添加客户基本信息
    basicUserInfo: [],
    // 通讯
    contacts: [],
    // 已选的通讯录 SavaContactTwoInfoList
    contactsInfoList: [],
    contactsTwoInfoList: [],

    // 维护通讯录1 2 状态
    contactsStatus: undefined,

    // 基本信息 状态 学历
    schoolSelectList:[],
    moneySelectList:[],
    MarrySelectList:[],
    contactSelectList:[],
    contactTwoSelectList:[],
    wechatqqSelectList:[],

};

export default (state = initState, action) => {
    const { type, value } = action;
    switch (type) {
        case 'UpdateAuthInfoList':
            return MergeState(state, { AuthInfoList: value });
            break;
        case 'UpdateAreaList':
            return MergeState(state, { areaList: value });
            break;
        case 'UpdateCitySelect':
            return MergeState(state, { citySelectList: value.pickedValue });
            break;
        case 'UpdateJobListSelect':
            return MergeState(state, { jobList: value.pickedValue });
            break;
        case 'UpdateWorkCitySelect':
            return MergeState(state, { workList: value.pickedValue });
            break;
        case 'UpdateEducation':
            return MergeState(state, { schoolList: value });
            break;
        case 'UpdateUserBasicInfo':
            return MergeState(state, { basicUserInfo: value });
            break;
        case 'UpdateContact':
            return MergeState(state, { contacts: value });
            break;
        case 'UpdateContactInfoList':
            return MergeState(state, { contactsInfoList: value });
            break;
        case 'UpdateContactTwoInfoList':
            return MergeState(state, { contactsTwoInfoList: value });
            break;
        case 'UpdateContactStatus':
            return MergeState(state, { contactsStatus: value });
            break;
        // 基本信息  收入
        case 'UpdateMoneyListSelect':
            return MergeState(state, {  moneySelectList: value.pickedValue });
            break;
        // 基本信息 学历 
        case 'UpdateSchoolListSelect':
            return MergeState(state, { schoolSelectList: value.pickedValue });
            break;
        // 基本信息 婚姻
        case 'UpdateMarryListSelect':
            return MergeState(state, { MarrySelectList: value.pickedValue });
            break;
         // 基本信息 婚姻
         case 'UpdateContactListSelect':
            return MergeState(state, { contactSelectList: value.pickedValue });
            break;
         // 基本信息 婚姻
         case 'UpdateContactTwoListSelect':
            return MergeState(state, { contactTwoSelectList: value.pickedValue });
            break;
        // qq 
        case 'UpdateWechatqqListSelect':
            return MergeState(state, { wechatqqSelectList: value.pickedValue });
            break;
        default:
            return state;
            break;
    }
};
