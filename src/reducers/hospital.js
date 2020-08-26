import {MergeState} from '../utils/index';

const initState = {
    name: 'NSHospital',
    // 医院列表
    hospitalList: [],
    // 医院查询结果详情
    hospitalDetail: {},
    // 手术项目列表
    operationList: [],

};

export default (state = initState, action) => {
    const {type, value} = action;
    switch (type) {
        case 'UpdateHospitalList':
            return MergeState(state, {hospitalList: value});
            break;
        default:
            return state;
            break;
    }
};
