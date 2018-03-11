import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
//border 适应平台的宽度
const borderWidth = 1 / PixelRatio.getPixelSizeForLayoutSize(1);
const brandPrimary ="#007aff";
const brandPrimaryTap = '#1284d6';
const fontSizeBase =  14;
export default{
    deviceWidth,
    deviceHeight,
    platform,
    isIphoneX,
    fontSizeBase,
    // list
    listBg : "#fff",
    listBorderColor: "#e5e5e5",
    listDividerBg: "#f4f4f4",
    listItemHeight:45,
    listBtnUnderlayColor :"#666",
    listItemPadding : platform === "ios" ? 10 : 12,
    list_title_height: 30,
    list_item_height_sm: 35,
    list_item_height: 44,

    // Color
    brandPrimary: brandPrimary,
    brandInfo: "#62B1F6",
    brandSuccess: "#5cb85c",
    brandDanger: "red",
    brandWarning: "#f0ad4e",
    brandSidebar: "#252932",
    brandDark: "#000",
    brandLight: "#f4f4f4",
    brandError: '#f4333c',
    brandImportant: '#ff5b05',  // 用于小红点
    brandWait: '#108ee9',
    // 文字色
    textColor:'#333',
    color_text_base: '#333',                  // 基本
    color_text_base_inverse: '#ffffff',          // 基本 _ 反色
    color_text_secondary: '#999',          // 辅助色
    color_text_placeholder: '#bbbbbb',           // 文本框提示
    color_text_disabled: '#b5b5b5',              // 失效
    color_text_caption: '#888888',               // 辅助描述
    color_text_paragraph: '#333333',             // 段落
    color_link: brandPrimary,                   // 链接
    color_text_gray:"#666",
    // 背景色
    fill_base: '#ffffff',                           // 组件默认背景
    fill_body: '#f4f4f4',                        // 页面背景
    fill_tap: '#dddddd',                            // 组件默认背景 _ 按下
    fill_disabled: '#dddddd',                       // 通用失效背景
    fill_mask: 'rgba(0, 0, 0, .4)',              // 遮罩背景
    iconGray: '#cccccc',                     // 许多小图标的背景，比如一些小圆点，加减号
    fill_grey: '#f7f7f7',
  // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    lineHeightH4: 20,
    lineHeight: platform === "ios" ? 20 : 24,


  // 字体尺寸

    // ---
    font_size_icontext: 12,
    font_size_caption_sm: 13,
    font_size_base: 14,
    font_size_subhead: 15,
    font_size_caption: 16,
    font_size_heading: 17,
    // 圆角
    // ---
    radius_xs: 2,
    radius_sm: 3,
    radius_md: 5,
    radius_lg: 7,

    // 边框尺寸
    // ---
    borderWidth,
    borderRadiusBase: platform === "ios" ? 5 : 2,
      // 间距
      // ---
      // 水平间距
      h_spacing_sm: 5,
      h_spacing_md: 8,
      h_spacing_lg: 15,

      // 垂直间距
      v_spacing_xs: 3,
      v_spacing_sm: 6,
      v_spacing_md: 9,
      v_spacing_lg: 15,
      v_spacing_xl: 21,

      // 图标尺寸
      // ---
      icon_size_xxs: 15,
      icon_size_xs: 18,
      icon_size_sm: 21,
      icon_size_md: 22,       // 导航条上的图标
      icon_size_lg: 36,


    // 组件变量
    // ---
    actionsheet_item_height: 50,
    actionsheet_item_font_size: 18,

    // 按钮类
    btnDisabledBg: "#b5b5b5",//按钮禁用背景色
    buttonPadding: 6,

    //input
    inputBorderColor: "#D9D5DC",
    inputSuccessBorderColor: "#2b8339",
    inputErrorBorderColor: "#ed2f2f",
    input_color_icon: '#cccccc',

    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return "#575757";
    },
    get defaultTextColor() {
        return this.textColor;
    },

    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.color_text_base_inverse;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.color_text_base_inverse;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.color_text_base_inverse;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.color_text_base_inverse;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.color_text_base_inverse;
    },
    // get btnTextSize() {
    //     return platform === "ios" ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
    // },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },

    //标题 H1,H2,H3
    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },
    get fontSizeH4() {
        return this.fontSizeBase * 1.2;
    },
    // toast提示
    toast_fill: 'rgba(0, 0, 0, .8)',
    toast_zindex: 1999,

    // notice_bar，通知
    notice_bar_fill: '#fffada',
    notice_bar_height: 36,

    // Tabs
     tabBgColor: "#F8F8F8",
     tabFontSize: 15,
     tabTextColor: "#222222",
     //  Tab
    tabDefaultBg: platform === "ios" ? "#F8F8F8" : "#3F51B5",
    topTabBarTextColor: "#6b6b6b" ,
    topTabBarActiveTextColor: "#007aff",
    topTabActiveBgColor: "#cde1f9",
    topTabBarBorderColor: "#a7a6ab",
    topTabBarActiveBorderColor:"#007aff",

    // Header
  toolbarBtnColor: platform === "ios" ? "#007aff" : "#fff",
  toolbarDefaultBg:'#308eff',
  toolbarHeight: platform === "ios" ? (isIphoneX ? 88 : 64) : 56,
  toolbarIconSize: platform === "ios" ? 20 : 22,
  toolbarSearchIconSize: platform === "ios" ? 20 : 23,
  toolbarInputColor: platform === "ios" ? "#CECDD2" : "#fff",
  searchBarHeight: platform === "ios" ? 30 : 40,
  searchBarInputHeight: platform === "ios" ? 30 : 50,
  toolbarInverseBg: "#222",
  toolbarTextColor: platform === "ios" ? "#000" : "#fff",
  toolbarDefaultBorder: platform === "ios" ? "#a7a6ab" : "#3F51B5",
  iosStatusbar: "light-content",
  get statusBarColor() {
    return this.toolbarDefaultBg
  },

  // search_bar
  search_bar_fill: '#efeff4',
  search_bar_height: 44,
  search_bar_input_height: 28,
  search_bar_font_size: 15,
  search_color_icon: '#bbbbbb', // input search icon 的背景色


  //Badge
  badgeSize: 18,
  badgeDotSize: 6,
  badgePadding: 5,
  badgeColor: '#f00',
  badgeBorderColor: '#f8f8f8',
  badgeBorderWidth: 0,
  badgeTextColor: '#fff',
  badgeFontSize: 11,

}
