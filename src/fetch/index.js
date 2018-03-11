import axios from 'axios'
import Config from "../Config/config";
import navigationEveryWhere from "../Config/navigationEveryWhere";

import { NavigationActions } from 'react-navigation';
let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;

//此处的headers要动态设置
let config = {
    headers: Config.headers,
    timeout: 10000,
    //其可选项是arraybuffer,blob,document,json,text,stream
    responseType: 'json',
};

//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    // if (promiseArr[config.url]) {
    //     promiseArr[config.url]('操作取消')
    //     promiseArr[config.url] = cancel
    // } else {
    //     promiseArr[config.url] = cancel
    // }
    //登录是
    if(config.url.indexOf("sendDynamicCodeMobile")>-1||config.url.indexOf("logOnDynamicCodeMobile")>-1||config.url.indexOf("logoffMobile")>-1){
        config.headers  = Config.passportHeaders
    }
    console.log(config);
      return config
}, error => {
    // console.log("草拟对对对",error);
    //  NavigationActions.navigate({ routeName: 'Login' })
    return Promise.reject(error)
})


//响应拦截器即异常处理
axios.interceptors.response.use(response => {
     //在这里对返回的数据进行处理
     const {data} = response;
     //成功
     const success = (data.hasOwnProperty('header')&&(data.header.success=='true'||data.header.code=='200'||data.header.code=='000'))||
                    (data.success=='true'||data.code=='200'||data.code=='000')||
                    (data.hasOwnProperty('result')&&(data.result.success=='true'||data.result.code=='200'||data.result.code=='000'));

     if(success){
         return Promise.resolve(data)
     }
     //失败
     const failure = (data.hasOwnProperty('header')&&(data.header.success=='false'||data.header.success==false))||
                    (data.success=='false'||data.success==false)||
                    (data.hasOwnProperty('result')&&(data.result.success=='false'||data.result.success==false));
    if(failure){
        console.log(data.msg||"错误");
        return Promise.reject(data.msg)

    }
    if(data.code == '0011111100000001'){
        Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
            {text: '确定', onPress: () => {
                navigationEveryWhere.reset("Login")
            }},
        ]);
        return Promise.reject(data.msg)
    }
    return Promise.resolve(data)
}, error => {
    navigationEveryWhere.reset("Login")
    if (error && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
      Alert.alert('提示', err.message);
      return Promise.resolve(error.response)
})








export function get(url) {
    return axios.get(url, config)
}

export function post(url, data) {
    return axios.post(url, data, config)
}

// export function getAll()
