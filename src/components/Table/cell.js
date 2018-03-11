import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import variables from "../../utils/platform";
import Text from "../Text";
class Cell extends Component {

  render() {
    const {record, width, height, flex, style,header,textStyle,children} = this.props;
    const textDom = React.isValidElement(children) ? React.cloneElement(children,{record:record},) : (
        <Text style={[styles.text,header?{color:'#333',textAlign:"center"}:null,textStyle]}>{children}</Text>
      );
    let borderWidth,borderColor;
    if (this.props.borderStyle && this.props.borderStyle.borderWidth) {
      borderWidth = this.props.borderStyle.borderWidth;
    } else {
      borderWidth = variables.borderWidth;
    }
    if (this.props.borderStyle && this.props.borderStyle.borderColor) {
      borderColor = this.props.borderStyle.borderColor;
    } else {
      borderColor = variables.listBorderColor;
    }

    return (
      <View style={[
        {
          borderTopWidth: variables.borderWidth,
          borderRightWidth: variables.borderWidth,
          borderColor: variables.listBorderColor,
        },
        styles.cell,
        width && {width: width},
        height && {height: height},
        flex && {flex: flex},
        !width && !flex && !height && {flex: 1},
        style
      ]}>
        {textDom}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal:3,
    color:"#666",

  },
})

export default Cell;
