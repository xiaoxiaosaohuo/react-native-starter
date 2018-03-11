import React, {PureComponent} from 'react'
import {Animated,StyleSheet, Easing,View,Text,Image,
Dimensions,} from 'react-native'
// import IsLoading from '../Status/IsLoading'
const {width,height}=Dimensions.get('window')
class AnimateView extends PureComponent{
    constructor(props){
        super(props)
        //this.spinValue = new Animated.Value(0)
    }
    spin = ()=>{
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
            toValue: 1,
            duration: 1100,
            easing: Easing.linear
            }).start(() => this.spin());// 开始spring动画
    }
    componentDidMount() {
        //this.spin()
    }
    componentWillUnmount(){

    }

    render(){
        // const animateValue = this.spinValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['0deg', '360deg']
        //   })
        return(
            <Animated.View style={[styles.container]}>
            {/*<Animated.View style={[styles.spin,{transform: [{rotate: animateValue}] }]}>
                <View style={[styles.dot,styles.dot0]}>
                </View>
                <View style={[styles.dot,styles.dot1]}>
                </View>
                <View style={[styles.dot,styles.dot2]}>
                </View>
                <View style={[styles.dot,styles.dot3]}>
                </View>

            </Animated.View>*/}
            {/* <Image
                style={styles.icon}
                resizeMode='contain'
                source={require('../../assets/statusImages/isLoading.gif')}
            /> */}
        </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:"rgba(0, 0, 0, 0.15)",
        justifyContent:"center",
        alignItems:"center",
        alignSelf : 'stretch',
        zIndex:9999,
    },
    spin:{
        width:25,
        height:25,
        position:"relative",
    },
    dot:{
        width:9,
        height:9,
        position:"absolute",
        borderRadius:100,
        backgroundColor:'#1890ff',
    },
    dot0:{
        left:0,
        top:0
    },
    dot1:{
        right:0,
        top:0
    },
    dot2:{
        right:0,
        bottom:0
    },
    dot3:{
        bottom:0,
        left:0
    },
    icon:{
        width:width/5,
        // top:-50
    }
})
export default AnimateView
