import {Platform} from 'react-native';

export const delay = (time) =>
    new Promise((resolve) => setTimeout(resolve, time));
export const createAction = (type) => (payload) => ({type, payload});
export const isIos = Platform.OS === 'ios';
import request from './fetch';
import API from '../config/api';

export {
    request,
    API,
};


export const MergeState = (state, obj = {}) => {
    return Object.assign({}, state, {...obj});
};
