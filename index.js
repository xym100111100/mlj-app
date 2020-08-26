import {Navigation} from 'react-native-navigation';
import {startApp as startReduxApp} from './src/App';

Navigation.events().registerAppLaunchedListener(() => {
  startReduxApp();
});
