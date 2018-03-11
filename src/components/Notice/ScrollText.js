import React,{PureComponent } from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
  StyleProp,
  TextStyle,
} from 'react-native';



class ScrollText extends PureComponent {


  constructor(props) {
    super(props);

    this.texts = {};
    this.twidth = 0;
    this.width = 0;
    this.state = {
      left: new Animated.Value(0),
    };
  }

  onLayout = (e) => {
    if (this.twidth) {
      return;
    }

    this.twidth = e.nativeEvent.layout.width;
    // onLayout may be earlier than onLayoutContainer on android, can not be sure width < twidth at that time.
    this.tryStart();
  }

  tryStart() {
    if (this.twidth > this.width && this.width) {
      this.startMove();
    }
  }

  onLayoutContainer = (e) => {
    if (!this.width) {
      this.width = e.nativeEvent.layout.width;
      this.setState({
        left: new Animated.Value(0),
      }, () => {
        this.tryStart();
      });
    }
  }

  startMove = () => {
    const { fps = 120, loop } = this.props;
    const SPPED = 1 / fps * 1000;
    const { width, twidth, props } = this;
    Animated.timing(this.state.left, {
      toValue: -twidth + width,
      duration: twidth * SPPED,
      easing: Easing.linear,
      delay: props.leading,
    }).start(() => {
      if (loop) {
        this.moveToHeader();
      }
    });
  }

  moveToHeader = () => {
    Animated.timing(this.state.left, {
      toValue: 0,
      duration: 0,
      delay: this.props.trailing,
    }).start(() => {
      this.startMove();
    });
  }

  render() {
    const { style, text, maxWidth } = this.props;

    const textChildren =
      <Text
        onLayout={this.onLayout}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[{paddingVertical:7,paddingHorizontal:7},style]}
      >
        {text}
      </Text>;

    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onLayout={this.onLayoutContainer}>
        <Animated.View style={{ flexDirection: 'row', left: this.state.left, width: maxWidth }}>
          {textChildren}
        </Animated.View>
      </View>
    );
  }
}

ScrollText.defaultProps = {
  text: '',
  loop: false,
  leading: 500,
  trailing: 800,
  fps: 40,
  maxWidth: 1000,
};
export default ScrollText;
