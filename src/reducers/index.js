import {combineReducers} from 'redux'
const initialState = {
    isFetching: false,
    msg: {},
    userInfo: {},
    tokenInfo:{},
    authInfo:[]
};
export const actionsTypes = {
    FETCH_START: "FETCH_START",//开始请求
    FETCH_END: "FETCH_END",//请求结束
    SET_MESSAGE: "SET_MESSAGE",//设置信息

    USER_LOGIN: "USER_LOGIN",//用户登录
    TOKEN_INFO:"TOKEN_INFO",//token信息

    USER_INFO:"USER_INFO",//用户信息

    GET_AUTH_INFO:"GET_AUTH_INFO",
    AUTH_INFO:"AUTH_INFO",//权限信息

};

export const actions = {
    login: function (userInfo) {
        return {
            type: actionsTypes.USER_LOGIN,
            ...userInfo
        }
    },
    clearMsg: function () {
        return {
            type: actionsTypes.SET_MESSAGE,
            success: false,
            msg: ''
        }
    },
    getUserInfo:function () {
        return{
            type:actionsTypes.GET_USER_INFO
        }
    },
    getUserAuth:function () {
        return{
            type:actionsTypes.GET_AUTH_INFO
        }
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.FETCH_START:
            return {
                ...state, isFetching: true
            };
        case actionsTypes.FETCH_END:
            return {
                ...state, isFetching: false
            };
        case actionsTypes.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    success: action.success,
                    msg: action.msg
                }
            };
        case actionsTypes.TOKEN_INFO:
            return {
                ...state, tokenInfo: {...action.payload}
            };
        case actionsTypes.USER_INFO:
            return {
                ...state, userInfo:action.payload
            };
        case actionsTypes.AUTH_INFO:

            return {
                ...state, authInfo: action.payload
            };
        default:
            return state
    }
}

export default reducer;
