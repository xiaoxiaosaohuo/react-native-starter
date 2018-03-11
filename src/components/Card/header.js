import React,{PureComponent} from "react";
import { View, Text, Image } from 'react-native';
import Thumbnail from "../Thumbnail";
class  Header  extends PureComponent{
    render(){
        const { title, thumb,thumbType, thumbStyle, extra, style, styles, ...restProps } = this.props;
        const titleDom = React.isValidElement(title) ? (
          title
        ) : (
            <Text style={styles.headerContent}>{title}</Text>
          );

        const extraDom = React.isValidElement(extra) ? (
          extra
        ) : (
            <Text style={styles.headerExtra}>{extra}</Text>
          );
        return(
            <View style={[styles.headerWrap, style]} {...restProps}>
                <View style={[styles.headerTitle]}>
                      {
                        typeof thumb === 'string' ? (
                            <Thumbnail url={thumb} {...thumbType} style={[thumbStyle]}></Thumbnail>
                        ) : thumb
                      }
                      {titleDom}
               </View>
               {extra ? extraDom : null}
            </View>
        )
    }

}

Header.defaultProps = {
    thumbStyle: {},
    style: {},
  };

export default Header
