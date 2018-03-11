import {put, take, call, fork} from 'redux-saga/effects'
import {get, post} from '../fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import Config from "../Config/config";
import DeviceInfo from 'react-native-device-info';
const authBody = {
    empID:"",
    systemKey: 'MIS_MOBILE',
    plat: 1,
    accessToken: "",
    appVersion:String(Config.version),
    deviceUniqueID:DeviceInfo.getUniqueID(),
    deviceSystemName:DeviceInfo.getSystemName(),
    deviceSystemVersion:DeviceInfo.getSystemVersion(),
    deviceManufacturer:DeviceInfo.getManufacturer(),
    deviceBrand:DeviceInfo.getBrand(),
    deviceModel:DeviceInfo.getModel(),
    deviceID:DeviceInfo.getDeviceId(),
    deviceCountry:DeviceInfo.getDeviceCountry(),
    deviceName:DeviceInfo.getDeviceName(),
    userAgent:DeviceInfo.getUserAgent(),
    appName:DeviceInfo.getBundleId(),
    appBundleID:DeviceInfo.getBundleId(),
    appBuildNumber:DeviceInfo.getBuildNumber(),
    appVersion:DeviceInfo.getVersion()
}
function* login(url,phoneNumber,dynamicCode) {
    yield put({type: IndexActionTypes.FETCH_START});

    try {
        let psoturl = url + '?phoneNumber=' + phoneNumber + '&dynamicCode=' + dynamicCode + '&plat=1'
        return yield call(post, psoturl)
    } catch (error) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msg:'登录失败',success:false});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}

function* userInfo(token) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let body= {
            plat: 1,
            accessToken: token,
        }
        let psoturl = Config.ip + Config.DengLuXinXi + '?' + Config.extraInfo + token;
        return yield call(post,psoturl,body)
    } catch (error) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msg:'获取用户个人信息失败',success:false});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}
function* authInfo(empID,token) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let psoturl = Config.ip + Config.RightInfo + '?' + Config.extraInfo + token;
        const body = Object.assign({},authBody,{empID:empID,accessToken:token})
        return yield call(post,psoturl,body)
    } catch (error) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msg:'获取用户权限失败',success:false});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}


export function* loginFlow() {
    //触发登录，--开始发请求--成功或者失败--设置信息
    while (true) {
        let request = yield take(IndexActionTypes.USER_LOGIN);
        let loginResponse = yield call(login, request.url, request.phoneNumber,request.dynamicCode);

        if(loginResponse){  //登录成功
            yield put({type:IndexActionTypes.SET_MESSAGE,msg:'登录成功!',success:true});
            yield put({type:IndexActionTypes.TOKEN_INFO,payload:loginResponse})

            let userResponse = yield call(userInfo, loginResponse.data.access_token);
            if(userResponse){//获取个人信息成功
                yield put({type:IndexActionTypes.SET_MESSAGE,msg:'获取个人信息成功!',success:true});
                yield put({type:IndexActionTypes.USER_INFO,payload:userResponse.data.user})

                let authResponse = yield call(authInfo, userResponse.data.empID,loginResponse.data.access_token);
                if(authResponse){ //获取个人权限成功
                    yield put({type:IndexActionTypes.SET_MESSAGE,msg:'获取个人权限成功!',success:true});
                    yield put({type:IndexActionTypes.AUTH_INFO,payload:authResponse.right})
                }

            }

        }

    }
}
