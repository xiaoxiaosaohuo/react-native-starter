import React,{Component} from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import setNormalizedColorAlpha from 'react-native/Libraries/StyleSheet/setNormalizedColorAlpha';
import normalizeColor from 'react-native/Libraries/StyleSheet/normalizeColor';
import AndroidStyle from './style';
import variables from '../../utils/platform';



class Segment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onPress(e, index, value) {
    const { disabled, onChange, onValueChange } = this.props;
    if (!disabled) {
      e.nativeEvent.selectedSegmentIndex = index;
      e.nativeEvent.value = value;
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(value);
      }
      this.setState({
        selectedIndex: index,
      });
    }
  }

  render() {
    const { style, disabled, values = [], tintColor } = this.props;

    const selectedIndex = this.state.selectedIndex;
    const items = values.map((value, idx) => {
      let itemRadius = null;
      if (idx === 0) {
        itemRadius = styles.itemLeftRadius;
      } else if (idx === values.length - 1) {
        itemRadius = styles.itemRightRadius;
      }

      const itemStyle = [styles.item, itemRadius, {
        backgroundColor: idx === selectedIndex ? tintColor : 'transparent',
        borderColor: tintColor,
      }];

      const underlayColor = idx === selectedIndex ? tintColor : setNormalizedColorAlpha(
        normalizeColor(tintColor), 0.3,
      );

      return (
        <TouchableHighlight
          disabled={disabled}
          key={idx}
          onPress={(e) => this.onPress(e, idx, value)}
          underlayColor={underlayColor}
          style={itemStyle}
          activeOpacity={1}
        >
          <Text style={[styles.itemText, { color: idx === selectedIndex ? '#fff' : tintColor }]}>
            {value}
          </Text>
        </TouchableHighlight>
      );
    });

    const enabledOpacity = !disabled ? 1 : 0.5;
    const segmentedStyle = {
      ...style,
      opacity: enabledOpacity,
      borderColor: tintColor,
    };

    return (
      <View style={[styles.segment, segmentedStyle, style]}>
        {items}
      </View>
    );
  }
}

Segment.defaultProps = {
  selectedIndex: 0,
  disabled: false,
  values: [],
  onChange() {},
  onValueChange() {},
  tintColor: variables.brandPrimary,
  style: {},
};


const styles = StyleSheet.create({
      segment: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: variables.borderWidth,
        borderColor: variables.brand_primary,
        borderRadius: variables.radius_md,
      },
      item: {
        flex: 1,
        paddingVertical: variables.h_spacing_sm,
        borderLeftWidth: variables.borderWidth,
        borderRightWidth: variables.borderWidth,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
      },
      itemLeftRadius: {
        borderTopLeftRadius: variables.radius_md,
        borderBottomLeftRadius: variables.radius_md,
      },
      itemRightRadius: {
        borderTopRightRadius: variables.radius_md,
        borderBottomRightRadius: variables.radius_md,
      },
      itemText: {
        textAlign: 'center',
        fontSize: variables.font_size_caption_sm,
      },
})

export default  Segment;
