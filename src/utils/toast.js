import Toast from 'react-native-simple-toast';
import {EasyLoading} from 'react-native-easy-loading';

export const ToastShow = (msg) => (Toast.showWithGravity(msg, 1.5, Toast.CENTER));

// 显示Loading
export const ToastLoadingShow = (msg, time = -1, type = 'default') => {
    EasyLoading.show(msg, time, type);
};
// 隐藏loading
export const ToastLoadingHide = (type = 'default') => {
    EasyLoading.dismis(type);
};

export default Toast;
