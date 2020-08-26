// 定义Reducer ，State 的设计 使用名字空间
import {MergeState} from '../utils';

const initState = {
  name: 'NSUser',
  // 用户信息
  userInfo: {},
};


export default (state = initState, action) => {
  const {type, value} = action;
  switch (type) {
    case 'updateUserInfo':
      let data = {};
      if (value['token']) {
        data = value.info;
      } else {
        data = value;
      }
      return MergeState(state, {
        userInfo: data,
      });
      break;
    default:
      return state;
      break;
  }
};
