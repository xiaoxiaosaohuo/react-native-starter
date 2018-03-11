import { AsyncStorage } from 'react-native'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user']
};

export default persistConfig
