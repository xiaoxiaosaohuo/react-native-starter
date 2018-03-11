/**
 * Created by choayo on 2017/3/16.
 * 在线地址 http://tools.jb51.net/regex/create_reg
 */

/**
* 验证时间
* @param dataValue 格式为：YYYY-MM-DD
* @returns 匹配返回true 不匹配返回false
*/
function valiDate(dateValue){
    var result = dateValue.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    if(result==null){
        return false;
    }
    return true;
}

/**
 * 验证电话号码
 * @param phoneValue 要验证的电话号码
 * @returns 匹配返回true 不匹配返回false
 */
function validatePhone(phoneValue) {
    var reg = /^[1][0-9]{10}$/;
    return reg.test(phoneValue);
}

/**
 * 验证邮箱
 * @param emailValue 要验证的邮箱
 * @returns 匹配返回true 不匹配返回false
 */
function validateEmail(emailValue){
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(emailValue);
}

/**
 * 判断是否是数字
 * @param numberValue 要验证的数据
 * @returns 匹配返回true 不匹配返回false
 */
function isNumber(numberValue){
    //定义正则表达式部分
    var reg1 = /^[0-9]{0,}$/;
    var reg2 = /^[1-9]{1}[0-9]{0,}$/;
    //alert(numberValue);
    if(numberValue ==null || numberValue.length==0){
        return false;
    }
    //判断当数字只有1位时
    if(numberValue.length<2){
        return reg1.test(numberValue);
    }
    return reg2.test(numberValue);;
}

/***
 * 金额
 * @param value
 * @returns
 */
function isMoney(value) {
    var reg = /^[0-9]*\.?[0-9]{0,2}$/;
    if(isNumber(value)){
        return true;
    }
    if(value.length>3){
        if(value.substr(0, 1)=="0"){
            if(value.substr(3,value.length).length>2){
                return false;
            }
        }
    }
    return reg.test(value);
}

/***
 * 正整数
 * @param value
 * @returns
 */
function isPositiveInteger(value) {
    var reg = /^[0-9]*$/;
    if(isNumber(value)){
        return true;
    }
    if(value.length>3){
        if(value.substr(0, 1)=="0"){
            if(value.substr(3,value.length).length>2){
                return false;
            }
        }
    }
    return reg.test(value);
}

/**
 * 验证是否是浮点数
 * @param floatValue 要验证的数据
 * @returns 匹配返回true 不匹配返回false
 */
function isMyFloat(floatValue){
    var reg = /^(\d+)(\.\d+)$/;
    if(isNumber(floatValue)){
        return true;
    }
    if(floatValue.length>3){
        if(floatValue.substr(0, 1)=="0"){
            if(floatValue.substr(0, 2)!="0."){
                return false;
            }
        }
    }
    return reg.test(floatValue);
}

/**
 * 判断是否是汉字
 * @param charValue 要验证的数据
 * @returns 匹配返回true 不匹配返回false
 */
function isCharacter(charValue){
    var reg = /^[\u4e00-\u9fa5]{0,}$/;
    return reg.test(charValue);
}

/**
 * 验证座机号
 * @param telValue 要验证的座机号
 * @returns 匹配返回true 不匹配返回false
 */
function valiDateTel(telValue){
    var reg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/;
    if(!reg.test(telValue)){
        return false;
    }
    return true;
}

var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
/**
 * 验证身份证
 * @param idCard 需要验证的身份证号
 * @returns 匹配返回true 不匹配返回false
 */
function IdCardValidate(idCardValue) {
    //去掉字符串头尾空格
    idCardValue = valueTrim(idCardValue.replace(/ /g, ""));
    if (idCardValue.length == 15) {
        //进行15位身份证的验证
        return isValidityBrithBy15IdCard(idCardValue);
    } else if (idCardValue.length == 18) {
        // 得到身份证数组
        var a_idCard = idCardValue.split("");
        //进行18位身份证的基本验证和第18位的验证
        if(isValidityBrithBy18IdCard(idCardValue)&&isTrueValidateCodeBy18IdCard(a_idCard)){
            return true;
        }else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
    }
    for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];// 加权求和
    }
    valCodePosition = sum % 11; // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18){
    var year =  idCard18.substring(6,10);
    var month = idCard18.substring(10,12);
    var day = idCard18.substring(12,14);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if(temp_date.getFullYear()!=parseFloat(year)
        ||temp_date.getMonth()!=parseFloat(month)-1
        ||temp_date.getDate()!=parseFloat(day)){
        return false;
    }else{
        return true;
    }
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15){
    var year =  idCard15.substring(6,8);
    var month = idCard15.substring(8,10);
    var day = idCard15.substring(10,12);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if(temp_date.getYear()!=parseFloat(year)
        ||temp_date.getMonth()!=parseFloat(month)-1
        ||temp_date.getDate()!=parseFloat(day)){
        return false;
    }else{
        return true;
    }
}

//去掉字符串头尾空格
function valueTrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 检验18位身份证号码（15位号码可以只检测生日是否正确即可，自行解决）
 * @param idCardValue 18位身份证号
 * @returns 匹配返回true 不匹配返回false
 */
function idCardVildate(cid) {
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (reg.test(cid)) {
        var sum = 0, idx;
        for (var i = 0; i < cid.length - 1; i++) {
            // 对前17位数字与权值乘积求和
            sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法）
        idx = sum % 11;
        // 检验第18为是否与校验码相等
        return arrValid[idx] == cid.substr(17, 1).toUpperCase();
    } else {
        return false;
    }
}

/**
 * 银行卡号校验
 * Luhm校验规则：16位银行卡号（19位通用）:
 *  1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 *  2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 *  3.将加法和加上校验位能被 10 整除。
 */
function luhmCheck(bankno){
    if (bankno.length < 16 || bankno.length > 19) {
        //$("#banknoInfo").html("银行卡号长度必须在16到19之间");
        return false;
    }
    var num = /^\d*$/;  //全数字
    if (!num.exec(bankno)) {
        //$("#banknoInfo").html("银行卡号必须全为数字");
        return false;
    }
    //开头6位
    var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bankno.substring(0, 2))== -1) {
        //$("#banknoInfo").html("银行卡号开头6位不符合规范");
        return false;
    }
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9

    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
            else
                arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }

    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhm= 10-k;

    if(lastNum==luhm){
        $("#banknoInfo").html("Luhm验证通过");
        return true;
    }
    else{
        $("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
    }
}

function mul(a, b) {
    let c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

function add(a, b) {
    let c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

function addAll(){
    let n = 0;
    for(let i in arguments){
        n = add(n, arguments[i]);
    }
    return n;
}

function sub(a, b) {
    let c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

/**
 * 时间格式化
 * @param {*string} 20170805112233
 * return 2017-08-05  11:22:33
 */
function formatTime(time){
    if(typeof time === 'string'){
        if(time.length === 14){
            return time.substr(0,4) + '-' + time.substr(4,2) + '-' + time.substr(6,2) + '  ' + time.substr(8,2) + ':' + time.substr(10,2) + ':' + time.substr(12,2);
        }
        if(time.length === 12){
            return time.substr(0,4) + '-' + time.substr(4,2) + '-' + time.substr(6,2) + '  ' + time.substr(8,2) + ':' + time.substr(10,2);
        }
        if(time.length === 8){
            return time.substr(0,4) + '-' + time.substr(4,2) + '-' + time.substr(6,2) + '  ' + time.substr(8,2);
        }
    } else {
        return time;
    }
}

/**
 * 计算两个日期之间相隔的天数
 * @param {*string} startDate
 * @param {*string} endDate
 * e.g:  GetDateDiff('2018-08-08','2018-08-09')
 */
function GetDateDiff(startDate,endDate){
    if(startDate.length === 8){
        startDate = startDate.substr(0,4) + '/' + startDate.substr(4,2) + '/' + startDate.substr(6,2)
    }
    if(endDate.length === 8){
        endDate = endDate.substr(0,4) + '/' + endDate.substr(4,2) + '/' + endDate.substr(6,2)
    }
    let startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
    let endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    let dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return  dates;
}

export default {
    valiDate:valiDate,
    validatePhone:validatePhone,
    validateEmail:validateEmail,
    isNumber:isNumber,
    isMoney:isMoney,
    isPositiveInteger:isPositiveInteger,
    isMyFloat:isMyFloat,
    isCharacter:isCharacter,
    valiDateTel:valiDateTel,
    IdCardValidate:IdCardValidate,
    isTrueValidateCodeBy18IdCard:isTrueValidateCodeBy18IdCard,
    isValidityBrithBy18IdCard:isValidityBrithBy18IdCard,
    valueTrim:valueTrim,
    idCardVildate:idCardVildate,
    luhmCheck:luhmCheck,
    add:add,
    addAll:addAll,
    mul:mul,
    sub:sub,
    formatTime:formatTime,
    GetDateDiff:GetDateDiff
}
