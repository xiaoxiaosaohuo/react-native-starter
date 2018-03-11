/**
 * Created by choayo on 2017/1/7.
 */

//查找菜系ID
function findcuisineID(str,sourceCityCuisne) {
    for (let ii = 0; ii < sourceCityCuisne.length; ii++) {
        if (sourceCityCuisne[ii].cuisineName == str) {
            return sourceCityCuisne[ii].cuisineID;
            break;
        }
    }

}

//查找银行itemID
function findBankItemID(str){
    let itemID='';
    let data=this.state.sourceBankData;
    for (let ii=0;ii<data.length;ii++){
        if (data[ii].bankName==str){
            return data[ii].itemID;
        }
    }
}