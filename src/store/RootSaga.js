import {all} from 'redux-saga/effects';

import indexSaga from '../sagas/index';
import bankSaga from '../sagas/bank';
import loginSaga from '../sagas/login';
import userSaga from '../sagas/user';
import authnameSaga from '../sagas/authname';
import hospitalSaga from '../sagas/hospital';
import applyitemSaga from '../sagas/applyitem';
import surgeryitemSaga from '../sagas/surgeryitem';
import loanmoneySaga from '../sagas/loanmoney';
import authpersonalSaga from '../sagas/authpersonal';
import signSaga from '../sagas/sign';
import billSaga from '../sagas/bill';
import basicSaga from '../sagas/basic';
import policySaga from '../sagas/policy';

export default function* rootSaga() {
    yield all([
        loginSaga(),
        bankSaga(),
        indexSaga(),
        userSaga(),
        authnameSaga(),
        hospitalSaga(),
        applyitemSaga(),
        surgeryitemSaga(),
        authpersonalSaga(),
        loanmoneySaga(),
        billSaga(),
        basicSaga(),
        policySaga(),
    ]);
}
