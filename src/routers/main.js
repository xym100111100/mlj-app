import Router, {MY, MYBANK, HOME} from '../Router';
import {Images} from '../common/images';

const tabBarStyle = {
    fontSize: 10,
    selectedFontSize: 10,
    textColor: '#BBBBBB',
    selectedTextColor: '#F64976',
    disableIconTint:false,
    disableSelectedIconTint:false
};

const botTabs = {
    visible:true,
    backgroundColor:"#fff",
    elevation:3,
    preferLargeIcons:false,
    tabsAttachMode:'onSwitchToTab', //together  afterInitialTab  onSwitchToTab
    hideShadow:false,
    translucent:false,
    barStyle:'black',
    animate:false,
    drawBehind:false,
    titleDisplayMode: 'alwaysShow',
};

export default {
    root: {
        bottomTabs: {
            children: [
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    name: HOME,
                                    options: {
                                        topBar: {
                                            visible: false,
                                            animate: false
                                        }
                                    },
                                    statusBar: {
                                        visible: false,
                                        style: 'dark',
                                        backgroundColor: '#ff0',
                                        drawBehind: false,
                                    },
                                },
                            },
                        ],
                        options: {
                            bottomTabs: {
                                ...botTabs
                            },
                            bottomTab: {
                                text: '首页',
                                icon: Images.tabs.Home,
                                selectedIcon: Images.tabs.HomeSelected,
                                ...tabBarStyle,
                            },
                        },
                    },
                },

                {
                    stack: {
                        children: [
                            {
                                component: {
                                    name: MY,
                                    options: {
                                        topBar: {
                                            visible: false,
                                            animate: false
                                        },
                                        statusBar: {
                                            visible: true,
                                            style: 'light',
                                            backgroundColor: 'transparent',
                                            drawBehind: true,
                                        },
                                    },
                                },
                            },
                        ],
                        options: {
                            bottomTabs: {
                              ...botTabs
                            },
                            bottomTab: {
                                text: '我的',
                                icon: Images.tabs.Account,
                                selectedIcon: Images.tabs.AccountSelected,
                                ...tabBarStyle,
                            },
                        },
                    },
                },

            ],
        },
    },
};
