import {MergeState} from '../utils';

const initState = {
    name: 'NSIndex',
    clientInfo: {},
};

export default (state = initState, action) => {
    const {type, value} = action;
    switch (type) {
        case 'UpdateClientInfo':
            return MergeState(state, {
                clientInfo: {...value},
            });
            break;
        default:
            return state;
            break;
    }
};
