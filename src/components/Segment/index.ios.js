import React,{Component} from 'react';
import { SegmentedControlIOS } from 'react-native';
import variables from "../../utils/platform"


class Segment extends Component {

  render() {
    const { tintColor, disabled, selectedIndex, ...restProps } = this.props;

    return (
      <SegmentedControlIOS
        tintColor={tintColor}
        selectedIndex={selectedIndex}
        {...restProps}
        enabled={!disabled}
      />
    );
  }
}

Segment.defaultProps = {
  tintColor: variables.brandPrimary,
  selectedIndex: 0,
};

export default Segment;
