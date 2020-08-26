import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {isIos} from './utils';
import Storage from './utils/storage';
import AsyncStorage from '@react-native-community/async-storage';
// Redux 的Provider的根节点
import {withReduxProvider} from './store';
// 路由
import Screens from './Navigator';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

// 注册页面组件
Screens.forEach((C, key) => {
    Navigation.registerComponent(
        key, // 这个key 是 Router.xxx 里面的内容
        () => gestureHandlerRootHOC(withReduxProvider(C)),
        () => C,
    );
});
// 路由
import mainRouter from './routers/main';
import loginRouter from './routers/login';

export const startApp = async () => {
    !isIos && SplashScreen.hide();
    // 这里判断当前用户是否登录，其实后续，还需要更多的操作
    // 包括，自动更新 等什么东西的

    // 清空指定的storage,为了测试登录写的，平常注释掉
    // Storage.removeValue("token").then((res)=>{
  
    // });

    const token = await AsyncStorage.getItem('token');
 
    if (token === null) {
        Navigation.setRoot(loginRouter);
    } else {
        Navigation.setRoot(mainRouter);
    }
};

