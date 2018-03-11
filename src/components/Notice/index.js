import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import NoticeStyle from './style';
import ScrollText from './ScrollText';
import Icon from "../Icon";


const styles = StyleSheet.create(NoticeStyle);

export default class NoticeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  onPress = () => {
    const { type, onPress } = this.props;
    if (onPress) {
      onPress();
    }
    if (type === 'closable') {
      this.setState({
        show: false,
      });
    }
  }

  render() {
    const { children, type, icon, style, action, scrollProps } = this.props;

    let operationDom = null;
    if (type === 'closable') {
      operationDom =  (
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.actionWrap}>
            {action ? action : <Text style={[styles.close]}>×</Text>}
          </View>
        </TouchableWithoutFeedback>
      );
  } else if (type === 'link') {
      operationDom = (
        <View style={styles.actionWrap}>
          {action ? action : <Text style={[styles.link]}>∟</Text>}
        </View>
      );
    }

    const main = (
      <View style={[styles.notice, style]}>
        {icon && <Icon type={icon} style={[styles.left15,styles.icon]}></Icon>}
        <View style={[styles.container, icon ? styles.left6 : styles.left15]}>
          <ScrollText style={styles.content} text={children} {...scrollProps} />
        </View>
        {operationDom}
      </View>
    );
    return this.state.show ? type === 'closable' ? main : (
      <TouchableWithoutFeedback onPress={this.onPress}>
        {main}
      </TouchableWithoutFeedback>
    ) : null;
  }
}


NoticeBar.defaultProps = {
  type: '',
  onPress() {},
  icon:"notice",
};
