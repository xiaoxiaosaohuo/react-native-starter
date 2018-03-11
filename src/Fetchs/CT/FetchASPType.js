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
import auth from '../../Config/config_auth'
import UtilData from '../../Views/CommercialTenant/DataBase/UtilData'

const refreshASPType=(_this)=> {
    fetchData.postData(auth.queryOrgAgentInfoList, {"orgID":Config.cpyOrgID},_this, 'body')
        .then( res=> {
            // ACSPType:['哗啦啦.云店', '饮食通'], //门店系统类型
            console.log('refreshASPType',res);
            UtilData.ACSPType=[];
            let temp=res.data.records[0].agentType;
            temp.indexOf('HLL')>-1&&UtilData.ACSPType.push('哗啦啦.云店');
            temp.indexOf('YST')>-1&&UtilData.ACSPType.push('饮食通');
        },  err=> {
            console.log(err);
        })
}

export default refreshASPType;