import React, { Component } from "react";
import { View, StatusBar,StyleSheet } from "react-native";
import variables from "../../utils/platform";

class Header extends Component {
  render() {
      const {androidStatusBarColor,iosBarStyle,children,...restProps}=this.props;
    return (
      <View>
        <StatusBar

          backgroundColor={
            androidStatusBarColor
              ?androidStatusBarColor
              : variables.statusBarColor
          }
          barStyle={
            iosBarStyle
              ? iosBarStyle
              :variables.iosStatusbar
          }
        />
        <View  {...restProps} style={[styles.header]}>
            {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header:{
        justifyContent: "center",
        backgroundColor: variables.toolbarDefaultBg,
        flexDirection: "row",
        height: variables.toolbarHeight,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth:variables.platform === "ios" ? variables.borderWidth: 0,
        borderBottomColor: variables.toolbarDefaultBorder,
    }
})

export default  Header;
