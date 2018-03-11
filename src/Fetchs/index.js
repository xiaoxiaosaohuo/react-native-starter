import * as config from '../Config/config'

function getData(listType) {
    var pageIndex = 1, pageSize = 10;

    return new Promise(function (resolve, reject) {
        fetch(`${config.SERVER_PATH}${listType}?start=${pageIndex}&count=${pageSize}`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                }
            })
            .then((data) => {
                resolve(data)
            })
            .catch((err)=> {
                reject(err)
            })
    });
}

export default {
    getData:getData,
    postData:()=>{
        console.log('post data');
    }
}