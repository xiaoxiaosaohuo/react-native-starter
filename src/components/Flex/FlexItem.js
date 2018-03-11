import React ,{PureComponent} from 'react';
import { View } from 'react-native';
class FlexItem extends PureComponent {
    render(){
        let { style, children, flex, ...restProps } = this.props;
        const flexItemStyle = {
          flex: flex || 1,
        };
        return(
            <View style={[flexItemStyle, style]} {...restProps}>
                {children}
            </View>
        )
    }
}


FlexItem.defaultProps = {
    flex: 1,
  };

  export default FlexItem
