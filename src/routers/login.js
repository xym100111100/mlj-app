/*
*  这个文件处理login 登录页面的路由
*  未登录下，启动这个路由，登录下 启动另外一个路由
* */


import {LOGIN} from "../Router";

export default {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: LOGIN,
                        options: {
                            topBar: {
                                visible: false
                            }
                        }
                    }
                }
            ]
        }
    }
}
