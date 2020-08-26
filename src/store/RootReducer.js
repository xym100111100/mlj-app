import {combineReducers} from 'redux';

// 这里是每一个Reducer 的引用
import NSIndex from '../reducers/index';
import NSUser from '../reducers/user';
import NSBank from '../reducers/bank';
import LOANMONEYIndex from '../reducers/loanmoney';
import AUTHNAMEIndex from '../reducers/authname';
import NSHospital from '../reducers/hospital';
import NSApplyitem from '../reducers/applyitem';
import NSurgeryitem from '../reducers/surgeryitem';
import NSAuthpersonal from '../reducers/authpersonal';
import NSSign from '../reducers/sign';
import NSBill from '../reducers/bill';
import NSBasic from '../reducers/basic';
import NSPolicy from '../reducers/policy';


// 通过combineReducers 把所有的Reducer连接起来
const rootReducer = combineReducers({
    NSIndex,
    NSUser,
    NSBank,
    AUTHNAMEIndex,
    LOANMONEYIndex,
    NSHospital,
    NSApplyitem,
    NSurgeryitem,
    NSAuthpersonal,
    NSSign,
    NSBill,
    NSBasic,
    NSPolicy,
});

// 把所有的Reducer 导出
export default rootReducer;
