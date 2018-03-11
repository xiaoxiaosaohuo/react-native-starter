import {Alert} from 'react-native'

import Config from '../Config/config'

function RN_GET(url,params,_this,type="url",handleErr=_handleErr) {

    let _handleErr=handleErr||_handleErr;

    url = `${Config.ip}${url}`;
    if (type=='url') {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }

        url+=`&accessToken=${Config.token}&plat=1`
    }else if(type=='restful'){
        // url+=`/${params}?accessToken=${Config.token}&plat=1`
        url+=`/${params}?${Config.extraInfoAndToken}`
    }
    // console.log(url);
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'get',
            headers: Config.headers
        })
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
                    if(data.hasOwnProperty('header')){
                        setTimeout(()=>{Alert.alert('错误', data.header.msg)},100);
                        return false;
                    }

                    if(data.code=='0011711100080015'||data.msg=='工单不存在'){
                        resolve(data)
                        return false
                    }

                    _handleErr(data.msg)
                    _this.setState({isLoading:false})

                    setTimeout(()=>{Alert.alert('错误', data.msg)},100)
                }

            })
            .catch((err) => {
                setTimeout(()=>{
                    _this.setState({
                        isLoading:false,
                    });
                    Alert.alert('错误', '网络读取失败！\n' + err)
                },100)
                reject(err);
            })
    })
}


function RN_POST(url,params,_this,type,handleErr=_handleErr) {

    let _handleErr=handleErr||_handleErr;
    url = `${Config.ip}${url}`;
    switch (type){
        case 'url':
            let paramsArray = []
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
            url+=`&accessToken=${Config.token}&plat=1`
            // console.log(url);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'post',
                    headers: Config.headers
                    //body: JSON.stringify(params)
                })
                    .then((response) =>{return response.json()})
                    .then((data) => {
                        // console.log(data);
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
                            _handleErr(data.msg)
                            if(data.hasOwnProperty('header')){
                                setTimeout(()=>{Alert.alert('错误', data.msg)},100);
                                return false;
                            }

                            setTimeout(()=>{Alert.alert('错误', data.msg)},100)
                        }

                    })
                    .catch((err) => {
                        setTimeout(()=>{
                            _this.setState({
                                isLoading:false,
                            });
                            Alert.alert('错误', '网络读取失败！\n' + err)
                        },100)
                        reject(err);
                    })
            })
            break;
        case 'restful':
            for(let ii in params){
                url+="/"+params[ii]
            }
            url+=`?accessToken=${Config.token}&plat=1`
            // console.log(url);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'post',
                    headers: Config.headers
                    //body: JSON.stringify(params)
                })
                    .then((response) =>{return response.json()})
                    .then((data) => {
                        // console.log(data);
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
                            _handleErr(data.msg)
                            if(data.hasOwnProperty('header')){
                                setTimeout(()=>{
                                    Alert.alert('错误', data.header.msg,[
                                        {text: '确定', onPress: () => {
                                            handleErr();
                                        }},
                                    ])},100);
                                return false;
                            }
                            setTimeout(()=>{
                                Alert.alert('错误', data.msg,[
                                    {text: '确定', onPress: () => {
                                        handleErr();
                                    }},
                                ])},100);
                        }

                    })
                    .catch((err) => {
                        setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                        reject(err);
                    })
            })
            break;
        case 'body':
            url+=`?accessToken=${Config.token}&plat=1`
            // console.log(url,params);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'post',
                    headers: Config.headers,
                    body: JSON.stringify(params)
                })
                    .then((response) =>{return response.json()})
                    .then((data) => {
                        // console.log(data);
                        if(data.hasOwnProperty('header')&&(data.header.success=='true'||data.header.code=='200'||data.header.code=='000')){
                            resolve(data)
                        }
                        else if(data.hasOwnProperty('result')&&(data.result.success=='true'||data.result.code=='200'||data.result.code=='000')){
                            resolve(data)
                        }else if(data.success=='true'||data.code=='200'||data.code=='000'){
                            resolve(data)
                        } else if(data.code == '0011111100000001'){
                            Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
                                {text: '确定', onPress: () => {
                                    _this.props.navigator.popToTop();
                                }},
                            ]);
                        }
                        else{
                            if(_handleErr(data.msg, data.code) === 'disableContinue'){
                                return;
                            }
                            if(data.hasOwnProperty('header')){
                                setTimeout(()=>{
                                    Alert.alert('错误', data.header.msg,[
                                        {text: '确定', onPress: () => {
                                            _handleErr();
                                        }},
                                    ])},100);
                                return false;
                            }else if(data.hasOwnProperty('result')){
                                setTimeout(()=>{
                                    Alert.alert('错误', data.result.msg,[
                                        {text: '确定', onPress: () => {
                                                _handleErr();
                                            }},
                                    ])},100);
                                return false;
                            }else {
                                setTimeout(()=>{
                                    Alert.alert('错误', data.msg,[
                                        {text: '确定', onPress: () => {
                                            _handleErr();
                                        }},
                                    ])},100);

                            }
                            _this.setState({isLoading:false})
                        }

                    })
                    .catch((err) => {
                        setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                        reject(err);
                    })
            })
            break;
        case 'bodySource':
            url+=`?accessToken=${Config.token}&plat=1`
                // console.log(url,params);
                return new Promise(function (resolve, reject) {
                    fetch(url, {
                        method: 'post',
                        headers: Config.headers,
                        body: JSON.stringify(params)
                    })
                        .then((response) =>{return response.json()})
                        .then((data) => {
                            if(data){
                                if(data.code != '0011111100000001'){
                                    resolve(data)
                                } else {
                                    Alert.alert('错误！','登录已失效，请重新登录！点击确定返回登录界面',[
                                        {text: '确定', onPress: () => {
                                            _this.props.navigator.popToTop();
                                        }},
                                    ]);
                                }
                            } else {
                                if(_handleErr(data.msg) === 'disableContinue'){
                                    return;
                                }
                                if(data.hasOwnProperty('header')){
                                    setTimeout(()=>{
                                        Alert.alert('错误', data.header.msg,[
                                            {text: '确定', onPress: () => {
                                                _handleErr();
                                            }},
                                        ])},100);
                                    return false;
                                } else {
                                    setTimeout(()=>{
                                        Alert.alert('错误', data.msg,[
                                            {text: '确定', onPress: () => {
                                                _handleErr();
                                            }},
                                        ])},100);

                                }
                                _this.setState({isLoading:false})
                            }

                        })
                        .catch((err) => {
                            setTimeout(()=>{Alert.alert('错误', '网络读取失败！\n' + err)},100)
                            reject(err);
                        })
                })
            break;
        default:
            // console.log(url);
            break;
    }
}

function _handleErr(err='') {
    console.log('默认返回报错',err)
}

export default {
    getData: RN_GET,
    postData:RN_POST,
}
