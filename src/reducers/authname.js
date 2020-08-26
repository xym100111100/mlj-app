import {MergeState} from '../utils/index';

const initState = {
    name: 'AUTHNAMEIndex',
    // 用户提交实名认证数据
    idCardList:[],
    // oss签名
    ossSignList: [],
    // 用户身份证前面ocr信息
    frontUserInfo:{},
    // 用户身份证后面ocr信息
    backUserInfo:{},
    // 用户身份证前面url oss地址
    idFrontUrl:'',
    idClientFrontUrl:'',
    // 用户身份证后面uri oss地址
    idBackUrl:'',
    idClientBackUrl:'',

};

export default (state = initState, action) => {
    const {type, value} = action;
    switch (type) {
        case 'UpdateAuthNameCardlist':
            return MergeState(state, {idCardList: value});
            break;
        case 'UpdateGetIdCardOcr':
            return MergeState(state, {ocrList: value});
            break;
        case 'UpdateOcrOssList':
            return MergeState(state,{
                ossSignList: value,
            });
            break;
        case 'UpdateIdCardOcrUrl':
            const cameraUrl = value.cameraUrl;
            const clientUrl = value.clientUrl;
            // cameraType  1 为front 0 为back
            if(value.cameraType){
                return MergeState(state, {
                    idFrontUrl: cameraUrl,
                    idClientFrontUrl: clientUrl,
                });
            }else{
                return MergeState(state, {
                    idBackUrl: cameraUrl,
                    idClientBackUrl: clientUrl,
                });
            }
            break;
        case 'UpdateOcr':
            const userInfo = value.userInfo;
            // cameraType  1 为front 0 为back
            if(value.cameraType){
                return MergeState(state, {
                    frontUserInfo: userInfo,
                });
            }else{
                return MergeState(state, {
                    backUserInfo: userInfo,
                });
            }
            break;
        default:
            return state;
            break;
    }
};

