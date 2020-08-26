import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import createSagaMiddleware from 'redux-saga';
import fetchErrorMiddleware from '../common/fetchError';
import logger from 'redux-logger';

// 引入Saga和Reducer
import reducer from './RootReducer';
import saga from './RootSaga';


// Redux-persist 来实现持久化数据存储，平常我们用localStorage 来做；
const persistConfig = {
    key: 'rootKeyPersist',
    storage: AsyncStorage,
};
// 这里，以插拔的形式，对reducer 进行包裹；
const persistedReducer = persistReducer(persistConfig, reducer);

// 引用saga
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer,
   // applyMiddleware(sagaMiddleware, fetchErrorMiddleware, logger),
    applyMiddleware(sagaMiddleware, fetchErrorMiddleware),
);

const persist = persistStore(store);
// persist.persist();
// persist.purge();

// saga中间件运行
sagaMiddleware.run(saga);

export const withReduxProvider = (C) => (props) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <C {...props}/>
        </PersistGate>
    </Provider>
);
