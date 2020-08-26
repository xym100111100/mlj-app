import {MergeState} from '../utils/index';

const initState = {
    name: 'NSSign',
    // 签约合同
    contractList: [],
    previewContractUrl:null,
    contractSign:{},
    completeStatus:1,
    
};

export default (state = initState, action) => {
    const {type, value} = action;
    switch (type) {
        // 修改合同列表数据
        case 'UpdateContractList':
            return MergeState(state, {contractList: value});
            break;
        // 合同预览  废弃接口
        case 'UpdateContractDetail':
            return MergeState(state, {previewContractUrl: value});
            break;
        // 合同签约确认 
        case 'UpdateContractSign':
            return MergeState(state, 
            {
                contractSign: value,
                completeStatus: true,
            }
            );
            break;
        default:
            return state;
            break;
    }
};
