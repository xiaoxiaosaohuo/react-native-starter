/**
 * Created by choayo on 2016/12/19.
 */

/**
 * 状态栏背景颜色文字色
 * 1. 透明背景色 白色文字
 * 2. 白色背景色 蓝色文字
 * 3. 蓝色背景色 白色文字
 *
 */

/**
 *禁用功能图标颜色
 * applicationButton 应用功能图标
 * tabButton 底部tab图标
 */
const applicationButton={
    bgColor:'#e4e4e4',
    textInBgColor:'#666666',
    textColor:'#333',
}

const tabButton={
    iconColor:'#999999',
    textColor:'#999',
}

const ButtonClickDown={
    defaultButton:'#308eff',
    greenButton:'#5ebe54',
    defaultButtonDown:'#2c7fe5',
    greenButtonDown:'#52a649'
}

const listItem={
    buttonDown:'#f4f4f4'
}

const navBarColor={
    default:'#3096ff',  //导航栏默认颜色
    deepColor:'#2881f5'  //搜索栏深度颜色
}

//信息录入字体颜色设置
/*const infoInput={
    labelText:{
        fontSize:15,
        color:'#333333',

    },
}*/

export default ColorConfig={
    applicationButton:applicationButton,
    tabButton:tabButton,
    forbiddenBgColor:'#f4f4f4',
    navBarColor:navBarColor,
    ButtonClickDown:ButtonClickDown
}