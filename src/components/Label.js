import React, { Component } from "react";
import { View,StyleSheet } from "react-native";
import Text from "./Text";
import variables from "../utils/platform";

class Label extends Component {
    constructor(props){
        super(props)

    }
    render(){
        const {label,value,style,labelStyle,valueStyle}= this.props;
        return(
            <View style={[styles.container,style]}>
                {label&&<Text style={labelStyle} size={15} >{`${label}:  `}</Text>}
                <Text style={valueStyle} size={14} color="#666">{value}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        marginVertical:3,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    }
})
export default Label
