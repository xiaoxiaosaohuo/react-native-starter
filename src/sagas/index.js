import {fork} from 'redux-saga/effects'
import {loginFlow} from './LoginSaga'
export default function* rootSaga() {
    yield  fork(loginFlow);
    // yield  fork(userInfoFlow);
}
