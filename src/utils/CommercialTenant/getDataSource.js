/**
 * Created by choayo on 2017/1/7.
 */

import fetchData from '../../Fetchs/FetchData';

//获取城市菜系
function getCityCuisne(cityID) {
    let _this = this;
    let sourceCityCuisne,cityCuisne;
    let url = `basic/group/area/getCityCuisne`
    fetchData.getData(url, {cityID: cityID, cuisineName: ''})
        .then(function (res) {
            sourceCityCuisne=res.data.records;
            res.data.records.forEach(function (item, index) {
                cityCuisne.push(item.cuisineName);
            });
            return {
                sourceCityCuisne:sourceCityCuisne,
                cityCuisne:cityCuisne
            }
        }, function (err) {
            console.log(err);
        })
}