import axios from 'axios';
import cloneDeep from 'lodash.clonedeep';
import {ToastLoadingShow, ToastLoadingHide, ToastShow} from './toast';
import AsyncStorage from '@react-native-community/async-storage';


/*请求前处理*/
const myFetch = (options) => {
    let {
        method = 'get',
        data,
        url,
        token,
    } = options;
    const cloneData = cloneDeep(data);


    /*根据请求做switch判断*/
    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, {
                params: cloneData,
                timeout: 100000,
                withCredentials: true,
                headers: {
                    'x-auth-token': token,
                },
            });
        case 'post':
            return axios.post(url, cloneData, {
                withCredentials: true,
                timeout: 100000,
                headers: {
                    'x-auth-token': token,
                },
            });
        default:
            return axios({
                ...options,
                timeout: 100000,
                headers: {
                    'x-auth-token': token,
                },
            });
    }
};


/*把请求函数暴露出去*/
export default async function request(options) {
   
    console.log("请求：",options)
 
    
    const token = await AsyncStorage.getItem('token');
    options = {...options, token};
    // options = {...options, token};

    /*请求之前的loading函数*/
    // if (!options.data.show) {
    //     ToastLoadingShow('加载中...'); 
    // }

    return myFetch(options).then((response) => {
      console.log("返回结果",response)
        // 隐藏Loading
        ToastLoadingHide();
        const {statusText, status, data} = response;
        if (status === 200) {
            if (data.code !== 0) {
                return Promise.reject({ 
                    success: false,
                    statusCode: status,
                    code: data.code * 1,
                    message: data.msg,
                });
            } else {
                return Promise.resolve({
                    success: true,
                    statusCode: status,
                    code: data.code,
                    data: data.data,
                    message: data.msg,
                });
            }
        }
        else {
            // 错误提示
            const msg = data ? data.msg : statusText;
            return Promise.reject({
                success: false,
                statusCode: status,
                code: 1,
                message: msg,
            });
        }
    }).catch((error) => {
        // 隐藏Loading
        ToastLoadingHide();
        console.log("出错的结果",error)
      
        const {response} = error;
        let msg, statusCode, code;
       // console.log("response",response)
        if (response && response instanceof Object) {
            const {data, statusText} = response;
            statusCode = response.status;
            msg = data.message || data.msg || statusText;
            code = data.code || 500;
        } else {
            statusCode = error.code;
            code = error.code;
            msg = error.message || '网络超时';
        }
        return Promise.reject({
            success: false,
            statusCode,
            code,
            message: msg,
        });
    });
}
