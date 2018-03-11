import React from "react";
import { Text as RNText,StyleSheet } from "react-native";
import variables from "../utils/platform"
const  Text =  (props)=> {
    const {children,color,size=14,style,...rest} = props;
    return (
			<RNText style={[styles.text,{color:color},{fontSize:size},style]} {...rest}>
				{children}
			</RNText>
		);
}

const styles = StyleSheet.create({
    text:{
        color:variables.color_text_base,
        alignItems:"center",
        textAlignVertical:'center',

    }
})


export default Text
