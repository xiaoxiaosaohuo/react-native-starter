import React,{PureComponent} from "react";
import {
    View,
    StyleSheet
} from "react-native"
class  Content  extends PureComponent{
    render(){
        const {style,styles,...restProps} = this.props
        return(
            <View style={[styles.content, style]} {...restProps}>
                {this.props.children}
            </View>
        )
    }

}



export default Content
