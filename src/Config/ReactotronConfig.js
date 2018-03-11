import Config from './DebugConfig';
import Reactotron,{networking,asyncStorage,overlay,trackGlobalErrors} from 'reactotron-react-native';
import { reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
console.disableYellowBox = true;
if (Config.useReactotron) {
  Reactotron
    .configure({ name: 'misApp' })
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .use(trackGlobalErrors())
    .connect()

  Reactotron.clear();

  console.tron = Reactotron;
}
