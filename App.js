import React,{Component} from 'react';
import {StatusBar} from "react-native";
import { Provider } from 'react-redux';
import codePush from "react-native-code-push";

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import RootNavigation from './src/navigation/RootNavigation';
import './src/Config/ReactotronConfig';
import DebugConfig from './src/Config/DebugConfig';
import createStore from './src/Config/CreateStore';

export const store = createStore()
export const persistor = persistStore(store);
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <PersistGate  persistor={persistor}>
                  <StatusBar
                      hidden={false}
                      animated={false}
                      backgroundColor={'#308eff'}
                      barStyle={"light-content"}
                      translucent={false}
                  />
                <RootNavigation/>
              </PersistGate>
          </Provider>

      );
  }

}
export default codePush(codePushOptions)(App);
