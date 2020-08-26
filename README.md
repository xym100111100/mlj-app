## react-native-webview
安卓端配置的时候，需要把buildSDk 的版本修改为29，因为react-native-webview 组件当中使用了
29 API的方法


### 打包ios方法

+  `mkdir release_ios`

+ `npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output release_ios/main.jsbundle --assets-dest release_ios/`


+ release_ios 下的文件 添加到xcode项目，RnMlj -》 `add files to  RnMlj` ->选择目录release_ios-》folders类型为“Create folder references” -》 Add

+ 添加证书、配置描述文件打包 -》product ->archive => Distribute App => 然后有4个选择，IOS App Store 上架、Development 测试，Enterprise 企业包，然后一直下一步，导出ipa

### 安卓打包

+ `keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 `

+ `https://www.react-native.cn/docs/signed-apk-android`

+ Notice：macos下可能需要sudo 执行 `sudo ./gradlew assembleRelease`


### Notice 


+ ios 增加选择框长按中文提示，修改info.plist

+ 安卓打包realease版本后，默认 ReactNative Android9.0以上打包apk后http无法请求

    + `/Users/yylc/work/react-navigation-best-practice/android/app/src/main/AndroidManifest.xml` 
    + 增加配置application中 ` android:usesCleartextTraffic="true" `

+ ios键盘遮挡问题，使用wix下组件：`react-native-keyboard-aware-scrollview`

+ 安卓真机启动需指定开发端口：`adb reverse tcp:8081 tcp:8081`   运行：`sudo npx react-native run-android`

+ 安卓部分机型axios不能请求成功：是 ` android > gradle.properties ` 中 `FLIPPER_VERSION`版本问题





