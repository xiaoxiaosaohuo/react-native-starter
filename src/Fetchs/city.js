
import fetchData from './FetchData';
import CT from '../Config/config_CommercialTenant'

let url = 'basic/group/area/getAreaJson';
let cityDataSource = [];
let cityData=[];
let cityCodeData=[];

function log(callback1,data) {
    data.forEach(item=>{
        cityDataSource.push(item);
        let tempArr=[];
        item.cities.forEach(temp=>{
            tempArr.push(temp.name);
            let cityCode={};
            cityCode.cityName=temp.name;
            cityCode.cityCode=temp.code;
            cityCode.cityId=temp.shopCityID;
            cityCodeData.push(cityCode)
        });
        let tempObj={};
        tempObj[item.name]=tempArr
        cityData.push(tempObj)
    })
    callback1({
        cityDataSource:cityDataSource,
        cityData:cityData
    })
     // console.log('城市数据源',cityDataSource);
     // console.log('城市列表',cityData);
}

function getData(_this,callback1=(data)=>console.log(data),callback2=log,) {
    fetchData.getData(url,{},_this)
        .then(function (res) {
            res.data.forEach(item=>{
                CT.cityDataSource.push(item);
                let tempArr=[];
                item.cities.forEach(temp=>{
                    tempArr.push(temp.name);
                    let cityCode={};
                    cityCode.cityName=temp.name;
                    cityCode.cityCode=temp.code;
                    cityCode.cityId=temp.shopCityID;
                    CT.cityCodeData.push(cityCode)
                });
                let tempObj={};
                tempObj[item.name]=tempArr
                CT.cityData.push(tempObj)
            })
            console.log('商户配置文件',CT);
            callback2(callback1,res.data);
            return res.data
        }, function (err) {
            console.log(err);
        })
}

export default {
    getData:getData,
    cityDataSource:cityDataSource,
    cityData:cityData,
    cityCodeData:cityCodeData
};