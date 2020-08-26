// 定义Reducer ，State 的设计 使用名字空间
import { MergeState } from '../utils/index';
const initState = {
    name: "NSAuthpersonal",

    // 用户上传的认证图列表 
    imgList: {},
    //  授权信息列表
    authList: [],
    // 当前选择的上传认证id   文件上传是需要 creditTypeName （fileType ）
    selectCreditTypeNo: {},
    // 补充材料列表
    authDataList: [],
    // 补充材料当前用户选择的类别 
    selectCreditTypeNoAuthData: {},
    // 补充材料 客户经理列表
    customerList: [],
    // 补充材料 手术单照片
    opertionList: [],
    // 补充材料 告知书照片
    noticeList: [],
    // 补充材料 银行卡照片
    bankPhotoList: [],
};


export default (state = initState, action) => {
    const { type, value } = action;
    switch (type) {
        // 授权信息列表 
        case 'UpdateAuthListNum':


            return MergeState(state, {
                authList: value,
            });
            break;
        // 授权信息列表 
        case 'UpdateAuthList':
            const {authList ,imgList} = state;
           
            value.forEach((item, index) => {
                if( authList && authList.length &&  item.number != authList[index].number && imgList&& imgList.length && imgList.length > 0 ){
                    item['uri'] = imgList[imgList.length-1].creditUrlPath
                }
            })

            return MergeState(state, {
                authList: value,
            });
            break;
        //补充材料初始化数据 并计算当前照片数量
        case 'UpdateAuthDataList':
            // 处理当前数据是否已经有图片
            const { customerList, opertionList, noticeList, bankPhotoList } = state;
           
            value.forEach((item, index) => {
                switch (item.certificateTypeNo) {
                    case '30003':
                        value[index]['num'] = customerList !== undefined ? customerList.length : 0;
                        value[index]['uri'] = customerList !== undefined && customerList.length &&  customerList.length >0 ? customerList[customerList.length-1].certificateUrlPath : null;
                        break;
                    case '30004':
                        value[index]['num'] = opertionList !== undefined ? opertionList.length : 0;
                        value[index]['uri'] = opertionList !== undefined && opertionList.length &&  opertionList.length >0 ? opertionList[opertionList.length-1].certificateUrlPath : null;
                        break;
                    case '30005':
                        value[index]['num'] = noticeList !== undefined ? noticeList.length : 0;
                        value[index]['uri'] = noticeList !== undefined && noticeList.length &&  noticeList.length >0 ? noticeList[noticeList.length-1].certificateUrlPath : null;

                        break;
                    case '30006':
                        value[index]['num'] = bankPhotoList !== undefined ? bankPhotoList.length : 0;
                        value[index]['uri'] = bankPhotoList !== undefined && bankPhotoList.length &&  bankPhotoList.length >0 ? bankPhotoList[bankPhotoList.length-1].certificateUrlPath : null;

                        break;
                    default:
                        break;
                }
            });
            return MergeState(state, {
                authDataList: value,
            });
            break;
        // 当前用户选择的列表标识
        case 'UpdateCreditTypeNo':
            return MergeState(state, {
                selectCreditTypeNo: value,
            });
            break;
        // 用户已经传过的图列表 imgList
        case 'UpdateCreditImgList':
            return MergeState(state, {
                imgList: value,
            });
            break;
        // 添加到后台不需要更新当前前端imglist
        // case 'UpdateCreditListDetail':
        //     return MergeState(state, {
        //         imgList: value,
        //     });
        //     break;
        // 用户提交后修改新上传或删除的列表 
        // case 'UpdateUploadImgList':
        //     return MergeState(state, {
        //         imgList: value,
        //     });
        //     break;
        // 补充材料状态数据   当前选中的列表

        case 'UpdateCreditTypeNoAuthData':
            return MergeState(state, {
                selectCreditTypeNoAuthData: value,
            });
            break;
        // 选中之后  当前分类已经上传的照片列表  
        case 'UpdateCustomerList':
            return MergeState(state, {
                customerList: value.imgList,
            });
            break;
        // 手术单列表
        case 'UpdateOperationList':
            return MergeState(state, {
                opertionList: value.imgList,
            });
            break;
        //   告知书列表
        case 'UpdateNoticeList':
            return MergeState(state, {
                noticeList: value.imgList,
            });
            break;
        // 银行卡照片
        case 'UpdateBankOtherList':
            return MergeState(state, {
                bankPhotoList: value.imgList,
            });
            break;
        default:
            return state;
            break;
    }
};