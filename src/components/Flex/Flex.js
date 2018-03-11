import React,{PureComponent} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

class Flex extends PureComponent {
    render(){
        const {style,direction,wrap,justify,align,children,...restProps}=this.props;
        let transferConst = [justify, align];
        transferConst = transferConst.map(el => {
          let tempTxt;
          switch (el) {
            case 'start':
              tempTxt = 'flex-start';
              break;
            case 'end':
              tempTxt = 'flex-end';
              break;
            case 'between':
              tempTxt = 'space-between';
              break;
            case 'around':
              tempTxt = 'space-around';
              break;
            default:
              tempTxt = el;
              break;
          }

          return tempTxt;
        });
        const flexStyle = {
          flexDirection: direction,
          flexWrap: wrap,
          justifyContent: transferConst[0],
          alignItems: transferConst[1],
        };
        return(
            <View style={[flexStyle, style]} {...restProps}>
              {children}
            </View>
        )
    }
}

Flex.defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center',
  };
export default Flex
