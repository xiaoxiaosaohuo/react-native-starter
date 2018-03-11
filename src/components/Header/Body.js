import React, { Component } from "react";
import { View,StyleSheet} from "react-native";
import variables from "../../utils/platform";
import Text from "../Text";
class Body extends Component {
  render() {
      const {style,title,children,...restProps} = this.props;

    return <View  style={[styles.body,style]} {...restProps.props}>
            {title&&<Text type="H3" style={styles.title}>{title}</Text>}
            {children}
    </View>
  }
}

const barMarginTop = variables.platform === "ios" ? (variables.isIphoneX ? 44 : 20) : 0;

const styles = StyleSheet.create({
    body:{
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: barMarginTop,
        height:30,
    },
    title:{
        color:"#fff",
        fontSize:18,
    }
})
export default Body;
