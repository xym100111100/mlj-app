import {Platform} from 'react-native';
export const navigationConfig =  (textTitle)=>{
    if(Platform.OS === 'ios'){
        return {
            bottomTabs: {
                visible: false,
                drawBehind: true,
                animate: false,
            },
            topBar: {
                animate: false,
                title: {
                    text: textTitle
                },
                noBorder:false,
            },
        }
    }else {
        return {
            bottomTabs: {
                visible: false,
                drawBehind: true,
                animate: false,
            },
            topBar: {
                background:"#ffffff",
                animate: false,
                title: {
                    text: textTitle,
                    alignment: 'center',
                },
                // 阴影
                elevation:2,
                noBorder:false,
            },
        }
    }
};
