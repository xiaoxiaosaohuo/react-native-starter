import React, { Component } from 'react';
import {
    Animated,
    Easing,
     View,
     TouchableOpacity,
     Text,
     StyleSheet,
     TouchableWithoutFeedback
 } from 'react-native';
 import variables from "../../utils/platform";
 const barMarginTop = variables.platform === "ios" ? (variables.isIphoneX ? 84 : 64) : 44;

 class FilterModal extends Component {


   render(){
       const {
           visible,
           onCancel =()=>{},
           onOk=()=>{},
       } = this.props;
       const defaultFooter = (
           <View style={styles.footer}>
                <TouchableOpacity onPress={onCancel} style={styles.filterButton}>
                    <Text style={styles.cancelColor}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={onOk} style={[styles.filterButton,styles.okBgColor]}>
                    <Text style={styles.okColor}>确定</Text>
                </TouchableOpacity>
            </View>
       )
       return(
           visible?<View
               style={styles.container}
           >
               <FadeView>
                   {this.props.children}
                   {defaultFooter}
               </FadeView>
               <FadeView>
                   <TouchableWithoutFeedback onPress={onCancel}>
                       <View style={styles.blankArea}></View>
                   </TouchableWithoutFeedback>
               </FadeView>

        </View>:null
       )
   }

}

class FadeView extends Component{
    constructor(props){
        super(props)
        this.state = {
            fade: new Animated.Value(0),          // 透明度初始值设为0
        }
    }
    componentDidMount() {
        Animated.timing(this.state.fade, {
            toValue: 1,
            easing: Easing.linear,
            duration: 500,
          }).start();
    }
    render(){
        return(
            <Animated.View
            style={[styles.animated,{ opacity: this.state.fade,}]}
          >
              {this.props.children}
        </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'absolute',
        backgroundColor:'#fff',
        top:barMarginTop,
        left:0,
        right:0,
        bottom:0,
        zIndex:9999999
    },
    animated:{
        flex:1,
        zIndex:9999999,
        height:2/3*variables.deviceHeight,
        backgroundColor:"#fff"
    },
    blankArea:{
        flex:1,
        backgroundColor:'#000',
        opacity:0.3
    },

    footer:{
        position:"absolute",
        bottom:0,
        flex:1,
        width:variables.deviceWidth,
        borderTopWidth:1,
        borderColor:'#eee',
        flexDirection:'row',
        height:40,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    filterButton:{
        padding:15,justifyContent:'center',alignItems:'center',
        borderRadius:2,
        paddingVertical:5,
        marginRight:15,
        borderWidth:1,
        borderColor:'#308eff'
    },
    okBgColor:{
        backgroundColor:'#308eff'
    },
    okColor:{
        color:'#fff'
    },
    cancelColor:{
        color:'#308eff'
    }
})
export default FilterModal;
