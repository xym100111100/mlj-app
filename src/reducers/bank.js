import {MergeState} from '../utils/index';

const initState = {
    name: 'NSBank',
    // 银行卡列表
    bankList: [],
    // 银行类型列表
    bankTypeList: {},

};

export default (state = initState, action) => {
    const {type, value} = action;
    switch (type) {
        case 'UpdateBankList':
            return MergeState(state, {
                bankList: value
            });
            break;
        case 'UpdateBankTypeList':
            return MergeState(state, {
                bankTypeList: value
            });
            break;
        default:
            return state;
            break;
    }
};
