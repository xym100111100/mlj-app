import {ToastShow} from '../utils/toast';

export default function fetchErrorMiddleware({dispatch, getState}) {
    return next => action => {
        if (action.type === 'fetch_error') {
            const {message} = action.value;
            ToastShow(message);
        }
        next(action);
    };
}
