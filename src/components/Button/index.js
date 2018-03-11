import React, { PureComponent } from "react";

import {
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    Platform,
    View,
    StyleSheet,
} from "react-native";
import variables from "../../utils/platform";
import btnStyle from "./style";
import Text from "../Text"
const styles = StyleSheet.create(btnStyle);

class Button extends PureComponent{
    render(){

        const {
             size, type = 'primary',transparent=false,fill, disabled, onPress, styles,style,activeOpacity,
             loading, ...restProps,
           } = this.props;
            const textStyle = StyleSheet.flatten([
                styles.text,
                styles[`${size}Text`],
                disabled && styles[`${type}DisabledText`],
                transparent&&styles[`${type}Text`],
            ]);

            const wrapperStyle = StyleSheet.flatten([
                styles.wrapperStyle,
                styles[`${size}`],
                styles[`${type}`],
                styles[`${fill}`],
                transparent&&styles.transparent,
                disabled && styles.disabled,
                style&&style
            ]);
            const indicatorColor = "#fff";
        return(
            <TouchableOpacity
                activeOpacity={activeOpacity?activeOpacity:0.5}
                style={wrapperStyle}
                onPress={(e) => onPress && onPress(e)}
                disabled={disabled}
                {...restProps}
              >
                <View style={styles.container}>
                  {
                    loading ? (
                        <ActivityIndicator
                          style={styles.indicator}
                          animating
                          color={indicatorColor}
                          size="small"
                        />
                    ) : null
                  }
                  {React.isValidElement(this.props.children)?this.props.children:<Text  style={textStyle}>{this.props.children}</Text>}
                </View>
          </TouchableOpacity>
        )
    }
}



Button.defaultProps={
    disabled: false,
    loading: false,
    styles: styles,

}
export default Button;
