import {Alert} from 'react-native'

import config from '../Config/config'

function RN_GET(url,params,_this,type="url") {

    url = `${config.ip}${url}`;
    if (type=='url') {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }

        url+=`&accessToken=${config.token}&plat=1`
    }else if(type=='restful'){
        url+=`/${params}?accessToken=${config.token}&plat=1`
    }
    console.log(url);
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((response) =>{return response.json()})
            .then((data) => {
                if(data.hasOwnProperty('header')&&(data.header.success=='true'||data.header.code=='200')){
                    resolve(data)
                }
                else if(data.success=='true'||data.code=='200'||data.code=='000'){
                    resolve(data)
                }
                else if(data.code == '0011111100000001'){
                    Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
                        {text: '确定', onPress: () => {
                            _this.props.navigator.popToTop();
                        }},
                    ]);
                }
                else{
                    //Alert.alert('post body 请求错误',data.msg);
                    if(data.hasOwnProperty('header')){
                        setTimeout(()=>{Alert.alert('错误', data.msg)},100);
                        return false;
                    }
                    console.log('post body 请求错误',data.msg);

                    setTimeout(()=>{Alert.alert('错误', data.msg)},100)
                }

            })
            .catch((err) => {
                setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                reject(err);
            })
    })
}

function RN_POST(url,params,_this,type) {
    url = `${config.ip}${url}`;
    switch (type){
        case 'url':
            let paramsArray = []
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
            url+=`&accessToken=${config.token}&plat=1`
            console.log(url);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify(params)
                })
                    .then((response) =>{return response.json()})
                    .then((data) => {
                        console.log(data);
                        if(data.hasOwnProperty('header')){
                            if(data.header.success){
                                resolve(data)
                            }
                            else {
                                resolve(data)
                            }
                        }
                        else if(data.code == '0011111100000001'){
                            Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
                                {text: '确定', onPress: () => {
                                    _this.props.navigator.popToTop();
                                }},
                            ]);
                        }
                        else{
                            //Alert.alert('post body 请求错误',data.msg);
                            if(data.hasOwnProperty('header')){
                                setTimeout(()=>{Alert.alert('错误', data.msg)},100);
                                return false;
                            }
                            console.log('post body 请求错误',data.msg);

                            setTimeout(()=>{Alert.alert('错误', data.msg)},100)
                        }

                    })
                    .catch((err) => {
                        setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                        reject(err);
                    })
            })
            break;
        case 'restful':
            for(let ii in params){
                url+="/"+params[ii]
            }
            url+=`?accessToken=${config.token}&plat=1`
            console.log(url);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify(params)
                })
                    .then((response) =>{return response.json()})
                    .then((data) => {
                        console.log(data);
                        if(data.hasOwnProperty('header')&&(data.header.success=='true'||data.header.code=='200')){
                            resolve(data)
                        }
                        else if(data.success=='true'||data.code=='200'){
                            resolve(data)
                        }
                        else if(data.code == '0011111100000001'){
                            Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
                                {text: '确定', onPress: () => {
                                    _this.props.navigator.popToTop();
                                }},
                            ]);
                        }
                        else{
                            //Alert.alert('post body 请求错误',data.msg);
                            if(data.hasOwnProperty('header')){
                                setTimeout(()=>{Alert.alert('错误', data.msg)},100);
                                return false;
                            }
                            console.log('post body 请求错误',data.msg);

                            setTimeout(()=>{Alert.alert('错误', data.msg)},100)
                        }

                    })
                    .catch((err) => {
                        setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                        reject(err);
                    })
            })
            break;
        case 'body':
            url+=`?accessToken=${config.token}&plat=1`
            console.log(url);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                })
                    .then((response) =>{return response.json()})
                    .then((data) => {
                        console.log(data);
                        if(data.hasOwnProperty('header')&&(data.header.success=='true'||data.header.code=='200')){
                            resolve(data)
                        }
                        else if(data.success == 'true'|| data.code=='200'){
                            resolve(data)
                        }
                        else if(data.code == '0011111100000001'){
                            Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
                                {text: '确定', onPress: () => {
                                    _this.props.navigator.popToTop();
                                }},
                            ]);
                        }
                        else{
                            //Alert.alert('post body 请求错误',data.msg);
                            if(data.hasOwnProperty('header')){
                                setTimeout(()=>{Alert.alert('错误', data.msg)},100);
                                return false;
                            }
                            console.log('post body 请求错误',data.msg);

                            setTimeout(()=>{Alert.alert('错误', data.msg)},100)
                        }

                    })
                    .catch((err) => {
                        setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                        reject(err);
                    })
            })
            break;
        default:
            console.log(url);
            break;
    }
}

export default {
    getData: RN_GET,
    postData:RN_POST,
}