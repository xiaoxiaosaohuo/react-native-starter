import React from "react";
import { View,StyleSheet } from "react-native";
import variables from "../utils/platform";
const  Container =  (props)=> {
    const {children,style,...rest} = props;
    return (
			<View style={[styles.container,style]} {...rest}>
				{children}
			</View>
		);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // height: variables.platform === "ios" ? variables.deviceHeight : variables.deviceHeight - 20
    }
})


export default Container
