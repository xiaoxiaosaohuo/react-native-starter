import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native';
import IconfontConf from '../../utils/iconfontConf'
import variables from '../../utils/platform';
import {Icon} from "../Icon";
const titleFontSize = 26;
const titleTextSize = 18;
const barHeight = variables.platform === "ios" ? (variables.isIphoneX ? 84 : 64) : 44;

const barMarginTop = Platform.OS === 'android' ? 0 : 20;
let ScreenWidth = Dimensions.get('window').width;
const Styles = StyleSheet.create({});

export default class Header extends Component {
    /*构造器*/
    constructor(props) {
        super(props);

        this.state = {};
    }


    /*渲染*/
    render() {
        /*left:[{text:''，press:'',icon:boolean},{text:''，press:'',icon:boolean}]*/
        /*title:[{text:''，press:'',icon:boolean},{text:''，press:'',icon:boolean}]*/
        /*right:[{text:''，press:'',icon:boolean},{text:''，press:'',icon:boolean}]*/

        let leftText = this.props.left[0].icon ? IconfontConf('return') : this.props.left[0].text;
        let leftTextFontFamily = this.props.left[0].icon ? {fontFamily: 'iconfont'} : null;
        if(!this.props.left[1]){
            this.props.left[1] = {};
        }
        let leftText1 = this.props.left[1].icon ? IconfontConf(this.props.left[1].text) : this.props.left[1].text;
        let leftTextFontFamily1 = this.props.left[1].icon ? {fontFamily: 'iconfont'} : null;

        let titleText = this.props.title[0].icon ? IconfontConf(this.props.title[0].text) : this.props.title[0].text;
        let titleTextFontFamily = this.props.title[0].icon ? {fontFamily: 'iconfont'} : null;
        let titleIconText = this.props.title[1].icon ? IconfontConf(this.props.title[1].text) : this.props.title[1].text;
        let titleIconTextFontFamily = this.props.title[1].icon ? {fontFamily: 'iconfont'} : null;
        let titleIconWidth = this.props.title[1].text ? 30 : 0;
        let titleTextColor = this.props.title[0].color ? this.props.title[0].color : '#FFF';

        let rightText1 = this.props.right[0].icon ? IconfontConf(this.props.right[0].text) : this.props.right[0].text;
        let righText1FontFamily = this.props.right[0].icon ? {fontFamily: 'iconfont'} : null;
        let rightStyle1 = this.props.right[0].style ? this.props.right[0].style : null
        let rightText2 = this.props.right[1].icon ? IconfontConf(this.props.right[1].text) : this.props.right[1].text;
        let righText2FontFamily = this.props.right[1].icon ? {fontFamily: 'iconfont'} : null;
        let rightStyle2 = this.props.right[1].style ? this.props.right[1].style : null
        let color = this.props.color ? this.props.color : '#308eff';
        return (
            <View>
                {variables.isIphoneX ?
                    <View
                        style={{height:20,backgroundColor:color}}
                    />:null
                }
                <View style={{width:ScreenWidth,height:barHeight,paddingTop:barMarginTop,flexDirection:'row',backgroundColor:color}}>
                    
                    {/*左--按钮*/}
                    <View style={[{flexDirection:'row',justifyContent:'flex-start'},titleText === '' && titleIconText === '' ? {flex:1}:{width:100}]}>
                        <TouchableOpacity style={{width:(this.props.left[1].press||this.props.left[1].text)?40:80,flexDirection:'row',alignItems:'center'}}
                                        onPress={this.props.left[0].press}>
                            <Text
                                style={[{textAlign:'left',color:'#fff',fontSize:titleFontSize,paddingLeft:15},leftTextFontFamily]}
                                numberOfLines={1}
                                >
                                {leftText}
                            </Text>

                        </TouchableOpacity>
                        {this.props.left[1] ?
                            <TouchableOpacity style={[
                                {flexDirection:'row',alignItems:'center'},
                                titleText === '' && titleIconText === '' ? {flex:1}:{width:70}
                            ]}
                                onPress={this.props.left[1].press}>
                                <Text numberOfLines={1}
                                    style={[{textAlign:'left',color:'#fff',fontSize:16,paddingLeft:15},leftTextFontFamily1]}>
                                    {leftText1}
                                </Text>
                            </TouchableOpacity>:null
                        }
                    </View>

                    {/*中--标题栏*/}
                    {titleText === '' && titleIconText === '' ? null :
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                            <Text
                                numberOfLines={1}
                                style={[{textAlign:'center',color:titleTextColor,fontSize:titleTextSize,},titleTextFontFamily]}
                                onPress={this.props.title[0].press}>
                                {titleText}
                            </Text>
                        </View>
                        {this.props.title[1].icon?
                        <TouchableOpacity
                            style={{width:titleIconWidth,flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                            onPress={this.props.title[1].press}>
                            <Text
                                style={[{textAlign:'left',color:'#fff',fontSize:titleFontSize,},titleIconTextFontFamily,this.props.title[1].style?this.props.title[1].style:{}]}>
                                {titleIconText }
                            </Text>
                        </TouchableOpacity>:null}
                    </View>}

                    {/*右--按钮*/}
                    <View style={{width:100,flexDirection:'row',justifyContent:'flex-end'}}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}
                                        onPress={this.props.right[0].press}>
                            <Text
                                style={[{textAlign:'right',color:'#fff',fontSize:titleFontSize,paddingRight:15},righText1FontFamily,rightStyle1]}>
                                {rightText1}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}
                                        onPress={this.props.right[1].press}>
                            <Text
                                style={[{textAlign:'right',color:'#fff',fontSize:this.props.right[1].icon ? titleFontSize : titleTextSize,paddingRight:15},righText2FontFamily,rightStyle2]}>
                                {rightText2}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )

    }
}


const styles = StyleSheet.create({

})
