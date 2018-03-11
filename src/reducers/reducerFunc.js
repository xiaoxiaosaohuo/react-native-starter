import { combineReducers } from 'redux';
import user from "./index";
import navigationReducer from "./navigation";
import {store} from '../../App';
export const makeRootReducer = (reducers) =>{
    return combineReducers({
        user:user,
        nav:navigationReducer,
        ...reducers
    })
}

export function injectReducer(name,reducers) {
  store.reducers[name] = reducers;
  store.replaceReducer(makeRootReducer(store.reducers));
}
