import React, { Component } from "react";
import { View,StyleSheet,Text} from "react-native";
import Icon from "../Icon";
import Button from "../Button";
import variables from "../../utils/platform";
class Left extends Component {
  render() {
      const {style,text,icon,onPress,children,...restProps} = this.props;
      let textDom,iconDom;
      if(icon){
         iconDom= (<Icon type={icon} color="#fff" size="sm" style={styles.icon}></Icon>)
      }


    return <View  style={[styles.left,style]} {...restProps.props}>
        <Button transparent style={styles.button} onPress={onPress}>
            <View style={styles.wrapper}>
                {iconDom}{text&&<Text style={styles.text}>我曹</Text>}
            </View>

        </Button>
    </View>
  }
}
const barMarginTop = variables.platform === "ios" ? (variables.isIphoneX ? 44 : 20) : 0;
const styles = StyleSheet.create({
    left:{
        flex: 1,
		alignSelf: 'center',
		alignItems: 'flex-start',
        marginTop:barMarginTop,
        paddingLeft:15,
        height:30,
    },
    button:{
        marginLeft: 0,
        paddingHorizontal:0,
        paddingVertical:0,
        borderRadius:0,
        alignSelf: null,
        height:30,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper:{
        flex: 1,
        flexDirection:"row"
    },
    // icon:{
    //     paddingHorizontal:15,
    // },
    text:{

        fontSize: 18,
        color: "#fff",
        marginLeft: 2,
        lineHeight: 21,
        paddingHorizontal:0
    }

})
export default Left;
