import { Platform, Linking } from 'react-native';
/**
 * 加载图片是压缩图片
 * @param url：原始图片地址
 * @param compress：压缩比例 缩放规则：http://wiki.hualala.com/pages/viewpage.action?pageId=2790539
 * @return {string} 返回压缩后的图片地址
 */
const compressUrl=(url,compress)=>{
    let index=url.lastIndexOf(".");
    return `${url.substring(0,index)}=${compress}${url.substring(index,url.length)}`;
}
const Dimensions = require('Dimensions');
const X_WIDTH = 375;  
const X_HEIGHT = 812;
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const isIphoneX = ()=>{  
    return (  
        Platform.OS === 'ios' &&   
        ((ScreenHeight === X_HEIGHT && ScreenWidth === X_WIDTH) ||   
        (ScreenHeight === X_WIDTH && ScreenWidth === X_HEIGHT))  
    )
}

const Time=(text)=>{
    let now = new Date();
    let y=now.getFullYear();
    let m=now.getMonth()+1;
    let d=now.getDate();

    let TODAY=`${y}${m<10?`0${m}`:m}${d<10?`0${d}`:d}`;

    return {
        y:`${y}`,
        m:m<10?`0${m}`:m,
        d:d<10?`0${d}`:d,
        FORMTODAY:`${y}-${m<10?`0${m}`:m}-${d<10?`0${d}`:d}`,
        TODAY,
        YESTERDAY:`${y}${m<10?`0${m}`:m}${d-1<10?`0${d-1}`:d-1}`,
        THISWEAK:{
            startDate:getWeak(0),
            // endDate:getWeak(-6),
            endDate:TODAY,
        },
        LASTWEAK:{
            startDate:getWeak(7),
            endDate:getWeak(1),
        },
        THISMONTH:{
            startDate:`${y}${m<10?`0${m}`:m}01`,
            endDate:TODAY,
        },
        LASTMONTH:{
            startDate:`${m-1<1?y-1:y}${m-1<1?12:m-1}01`,
            endDate:`${m-1<1?y-1:y}${m-1<1?12:m-1}31`,
        },
        THISQUARTER:{
            startDate:`${y}${m>=10?10:m>=7?'07':m>=4?'04':'01'}01`,
            endDate:TODAY,
        },
        THISYEAR:{
            startDate:`${y}0101`,
            endDate:TODAY,
        },
        LASTYEAR:{
            startDate:`${y-1}0101`,
            endDate:`${y-1}1231`,
        },
    }
}

const getWeak=(n)=>{
    let now = new Date();
    let year=now.getFullYear();

    let month=now.getMonth()+1;
    let date=now.getDate();
    let day=now.getDay();

    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if(day!==0){
        n=n+(day-1);
    }
    else{
        n=n+day;
    }
    if(day){
        //解决跨年的问题
        if(month>1){
            month=month;
        }
        //解决跨年的问题,月份是从0开始的
        else{
            year=year-1;
            month=12;
        }
    }
    now.setDate(now.getDate()-n);
    year=now.getFullYear();
    month=now.getMonth()+1;
    date=now.getDate();
    return s=`${year}${month<10?('0'+month):month}${date<10?('0'+date):date}`;
}

const sendSms = (phone, body='')=>{
    if(Platform.OS === 'ios'){
        Linking.openURL(`sms:${phone}&body=${body}`);
    } else {
        Linking.openURL(`sms:${phone}?body=${body}`);
    }
}

export default {
    compressUrl,
    Time,
    isIphoneX,
    sendSms
}