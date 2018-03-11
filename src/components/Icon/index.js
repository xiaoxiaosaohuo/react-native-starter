import React from 'react';
import { Text,StyleSheet }  from 'react-native';
import IconfontConf from '../../utils/iconfontConf';
import variables from "../../utils/platform";
export default class Icon extends React.Component{
  static defaultProps = {
    size: 'md',
    color: '#000',
  };

  render() {
    const { size, type, color,style,children,...restProps } = this.props;
    const sizeMap = { 'xxs': 15, 'xs': 18, 'sm': 21, 'md': 22, 'lg': 36 };
    const fontSize = typeof size === 'string' ? sizeMap[size] : size;
    const TextIconStyle = {
      fontSize,
      color: color,
    };
    return <Text style={[styles.icon,TextIconStyle,style]} {...restProps}>
        {IconfontConf(type||"ok")}{children}
    </Text>;
  }
}

const styles = StyleSheet.create({
    icon:{
        fontFamily: 'iconfont',
        flexDirection: 'row',
        alignItems:"center",
        borderWidth:null,
    }
})
