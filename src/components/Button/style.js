import variables from "../../utils/platform";
const styles ={
    //基础样式
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        wrapperStyle:{
            borderWidth: null,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: variables.btnPrimaryBg,
            borderRadius: variables.borderRadiusBase,
            backgroundColor: variables.btnPrimaryBg,
            alignSelf:"center",
            paddingVertical: variables.buttonPadding,
            paddingHorizontal: variables.buttonPadding + 10,
            height: 50,
            // elevation: 2,
            flexDirection: 'row',


        },

        indicator: {
            marginRight: variables.h_spacing_md,
        },
        text:{
            marginLeft: 0,
            marginRight: 0,
            color: variables.color_text_base_inverse,
            fontSize: 16,
            lineHeight: variables.btnLineHeight,
            paddingHorizontal: 10,
            backgroundColor: 'transparent',
        },
        // 禁用
        disabled: {
          backgroundColor: variables.btnDisabledBg,
        },
        //小
        small: {
            height: 30,
        },
        smallText: {
            fontSize: 14,
        },
        //大
        large: {
            height: 60,
        },
        largeText:{
            fontSize: 22,
            lineHeight: 32,
        },
        //填充
        full: {
          justifyContent: 'center',
          alignSelf: 'stretch',
          borderRadius: 0,
        },
        //默认
        primary: {
            backgroundColor:variables.btnPrimaryBg,
            borderColor: variables.btnPrimaryBg,
        },

        primaryIcon:{
            color: variables.btnPrimaryBg,
        },
        danger: {
            backgroundColor: variables.btnDangerBg,
            borderColor: variables.btnDangerBg,
            borderWidth: variables.borderWidth * 2,
        },

        dangerIcon:{
            color: variables.btnDangerBg,
        },
        //成功
        success:{
            backgroundColor: variables.btnSuccessBg,
            borderColor: variables.btnSuccessBg,
            borderWidth: variables.borderWidth * 2,
        },
        warning:{
            backgroundColor: variables.btnWarningBg,
            borderColor: variables.btnWarningBg,
            borderWidth: variables.borderWidth * 2,
        },
        danger:{
            borderColor: variables.btnDangerBg,
            borderWidth: variables.borderWidth * 2,
            backgroundColor: variables.btnDangerBg,
        },
        info:{
            borderColor: variables.btnInfoBg,
            borderWidth: variables.borderWidth * 2,
            backgroundColor: variables.btnInfoBg,
        },
        light:{
            borderColor: variables.brandLight,
            borderWidth: variables.borderWidth * 2,
            backgroundColor: variables.brandLight,
        },
        lightText:{
            color: variables.brandDark,
        },
        dark:{
            borderColor: variables.brandDark,
            borderWidth: variables.borderWidth * 2,
            backgroundColor: variables.brandDark,
        },
        darkText:{
            color: variables.brandLight,
        },
        transparent:{
            backgroundColor: null
        },
        primaryText:{
            color:variables.btnPrimaryBg
        },
        warningText:{
            color:variables.btnWarningBg
        },
        dangerText:{
            color:variables.btnDangerBg
        },
        infoText:{
            color:variables.btnInfoBg
        },
        successText:{
            color:variables.btnSuccessBg
        },
        block: {
            justifyContent: 'center',
            alignSelf: 'stretch',
            marginHorizontal:variables.h_spacing_lg
        },
        rounded: {
            paddingHorizontal: variables.buttonPadding + 20,
            borderRadius: variables.borderRadiusLarge,
        },
        // bordered:{
        //     backgroundColor: 'transparent',
        //     borderColor: variables.brandDark,
        //     borderWidth: variables.borderWidth * 2,
        // }









    }


export default styles
