// 定义Reducer ，State 的设计 使用名字空间
import {MergeState} from '../utils/index';

const initState = {
    name: "NSurgeryitem",
    // 手术项目列表
    operationList: [],
    addOperationItem:{},
};

export default (state = initState, action) => {
    const {type, value} = action;
    switch (type) {
        case 'change_surgeryitem':
            return MergeState(state, {operationList: value});
            break;
        case "change_addoperationitem":
            return MergeState(state, {addOperationItem: value});
            break;
        default:
            return state;
            break;
    }
};
