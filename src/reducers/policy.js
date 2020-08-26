import { MergeState } from '../utils';

const initState = {
    name: 'NSPolicy',
    policyUrlList: [],
    // 当前选中的url
    selectPolicyUrl: [],
};

export default (state = initState, action) => {
    const { type, value } = action;
    switch (type) {
        case 'UpdatePolicyUrl':
            return MergeState(state, {
                policyUrlList: value,
            });
            break;
        case 'UpdateSelectPolicyList':
            return MergeState(state, {
                selectPolicyUrl: value,
            });
            break; 
        default:
            return state;
            break;
    }
};
