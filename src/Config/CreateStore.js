import { createStore, applyMiddleware, compose } from 'redux';
import Config from '../Config/DebugConfig';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist'
import ReduxPersist from '../Config/ReduxPersist';
import ScreenTracking from '../middlewares/ScreenTracking';
import {navigationMiddleware} from "../Config/navWithReduxConfig";
import {makeRootReducer} from "../reducers/reducerFunc";
import rootSaga from "../sagas"
const configStore = ()=>{
    let middleware = [];
    let enhancers = [];

    middleware.push(navigationMiddleware);
    middleware.push(ScreenTracking);
    const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null;
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    middleware.push(sagaMiddleware);

    enhancers.push(applyMiddleware(...middleware));
    const persistedReducer = persistReducer(ReduxPersist, makeRootReducer())

    const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;
    const store = createAppropriateStore(persistedReducer, {}, compose(...enhancers));


    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = persistedReducer
            store.replaceReducer(nextRootReducer)
            //saga热更新
        })
    }

  sagaMiddleware.run(rootSaga);


  return store;
}
export default configStore
