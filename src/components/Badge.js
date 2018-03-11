// Badge.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes} from 'react-native';

import variables from "../utils/platform";
export default class Badge extends Component {

  static propTypes = {
    ...ViewPropTypes,
    type: PropTypes.oneOf(['capsule', 'square', 'dot']),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    countStyle: Text.propTypes.style,
    overflowCount: PropTypes.number,
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'capsule',
    overflowCount: 99,
  };

  buildProps() {
    let {style, type, count, countStyle, overflowCount, children, ...others} = this.props;

    let width, height, minWidth, borderRadius, borderWidth, padding;
    switch (type) {
      case 'capsule':
        height = variables.badgeSize;
        minWidth = variables.badgeSize;
        borderRadius = variables.badgeSize / 2;
        borderWidth = variables.badgeBorderWidth;
        padding = (count + '').length === 1 ? 0 : variables.badgePadding;
        break;
      case 'square':
        height = variables.badgeSize;
        minWidth = variables.badgeSize;
        borderRadius = 2;
        borderWidth = variables.badgeBorderWidth;
        padding = (count + '').length === 1 ? 0 : variables.badgePadding;
        break;
      case 'dot':
        width = variables.badgeDotSize;
        height = variables.badgeDotSize;
        borderRadius = variables.badgeDotSize / 2;
        borderWidth = 0;
        padding = 0;
        break;
    }

    style = [{
      backgroundColor: variables.badgeColor,
      width: width,
      height: height,
      minWidth: minWidth,
      borderRadius: borderRadius,
      borderColor: variables.badgeBorderColor,
      borderWidth: borderWidth,
      paddingLeft: padding,
      paddingRight: padding,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }].concat(style);

    if (type === 'dot') children = null;
    else if (count || count === 0) {
      countStyle = [{
        color: variables.badgeTextColor,
        fontSize: variables.badgeFontSize,
      }].concat(countStyle);
      children = (
        <Text style={countStyle} allowFontScaling={false} numberOfLines={1}>
          {count > overflowCount ? overflowCount + '+' : count}
        </Text>
      );
    }

    this.props = {style, type, count, countStyle, overflowCount, children, ...others};
  }

  render() {
    this.buildProps();
    return <View {...this.props} />;
  }

}
