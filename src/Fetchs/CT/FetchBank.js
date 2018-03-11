/**
 * Created by choayo on 2017/5/9.
 */
/**
 * 获取银行数据
 * CT.bankUrl:basic/group/bank/getAllBank
 * @return sourceBankData:返回的所有数据
 * @return bankData:只返回银行名字数据
 */

import fetchData from '../FetchData'
import Config from '../../Config/config'
import CT from '../../Config/config_CommercialTenant'

const getBankData=(_this)=> {
    fetchData.getData(CT.bankUrl, Config.empID,_this, 'restful')
        .then(function (res) {
            CT.bankDataSource=res.data.records;
            CT.bankData = [];
            res.data.records.forEach(function (item, index) {
                CT.bankData.push(item.bankName);
            });
        }, function (err) {
            console.log(err);
        })
}

export default getBankData;