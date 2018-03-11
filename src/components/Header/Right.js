import React, { Component } from "react";
import { View,StyleSheet} from "react-native";
import variables from "../../utils/platform";

class Right extends Component {
  render() {
      const {style,text,children,...restProps} = this.props;
    return <View  style={[styles.right,style]} {...restProps.props}>
            {children}
    </View>
  }
}

const barMarginTop = variables.platform === "ios" ? (variables.isIphoneX ? 44 : 20) : 0;

const styles = StyleSheet.create({
    right:{
        flex: 1,
        alignSelf: 'center',
    	alignItems: 'flex-end',
        marginTop:barMarginTop,
        paddingRight:15
    }
})
export default Right;
