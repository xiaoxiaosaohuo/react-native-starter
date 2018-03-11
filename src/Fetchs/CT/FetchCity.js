/**
 * 获取城市数据
 * CT.cityUrl:basic/group/area/getAreaJson
 * @return cityDataSource:返回的所有数据
 * @return cityCodeData:
 * @return cityData:只返回名字
 */

import fetchData from '../FetchData';
import CT from '../../Config/config_CommercialTenant'

function getCityData(_this) {
    fetchData.getData(CT.cityUrl,{},_this,'url')
        .then(function (res) {
            res.data.forEach(item=>{
                CT.cityDataSource.push(item);
                item.cities.forEach(temp=>{
                    let cityCode={};
                    cityCode.name=temp.name;
                    cityCode.code=temp.code;
                    cityCode.shopCityID=temp.shopCityID;
                    CT.cityData.push(cityCode)
                });
            })
        }, function (err) {
            console.log(err);
        })
}

export default getCityData