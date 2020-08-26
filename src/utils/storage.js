import AsyncStorage from '@react-native-community/async-storage';

const key = 'status';
export default class Storage {
  
  static async getValue(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        const result = JSON.parse(value);
        return result;
      } else {
        return null;
      }
    } catch (e) {
    }
  }
  
  static async setValue(key, value) {
    try {
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      await AsyncStorage.setItem(key, value);
    } catch (e) {
    }
  }
  
  static async removeValue(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
    }
  }
}
