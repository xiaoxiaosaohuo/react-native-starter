import React, { Component } from 'react'
import {
  Text, View, StyleSheet, Dimensions,
  Modal, TouchableHighlight, Animated, ScrollView
} from 'react-native'
import styles, { btnStyle, sheetStyle, hairlineWidth } from './style'

const TITLE_H = 40
const MESSAGE_H = 40
const CANCEL_MARGIN = 6
const BUTTON_H = 50 + hairlineWidth
const WARN_COLOR = '#ff3b30'
const MAX_HEIGHT = Dimensions.get('window').height * 0.7

class ActionSheet extends Component {
  constructor (props) {
    super(props)
    this.scrollEnabled = false
    this.translateY = this.calculateHeight(props)
    this.state = {
      visible: false,
      sheetAnim: new Animated.Value(this.translateY)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.translateY = this.calculateHeight(nextProps)
  }

  show  = ()=> {
    this.setState({visible: true})
    this.showSheet()
  }

  hide  = (index)=> {
    this.hideSheet(() => {
      this.setState({visible: false})
      this.props.onPress(index)
    })
  }

  cancel  = ()=> {
    const { cancelButtonIndex } = this.props
    // 保持和 ActionSheetIOS 一致，
    // 未设置 cancelButtonIndex 时，点击背景不隐藏 ActionSheet
    if (cancelButtonIndex > -1) {
      this.hide(cancelButtonIndex)
    }
  }

  showSheet  = ()=> {
    Animated.timing(this.state.sheetAnim, {
      toValue: 0,
      duration: 250
    }).start()
  }

  hideSheet  = (callback) => {
    Animated.timing(this.state.sheetAnim, {
      toValue: this.translateY,
      duration: 150
    }).start(callback || function () {})
  }

  calculateHeight  =(props)=> {
    let count = props.options.length
    let height = BUTTON_H * count + CANCEL_MARGIN
    if (props.title) height += TITLE_H
    if (props.message) height += MESSAGE_H
    if (height > MAX_HEIGHT) {
      this.scrollEnabled = true
      return MAX_HEIGHT
    } else {
      this.scrollEnabled = false
      return height
    }
  }

  renderTitle  = ()=> {
    const title = this.props.title

    if (!title) {
      return null
    }

    if (React.isValidElement(title)) {
      return (
        <View style={sheetStyle.title}>{title}</View>
      )
    }

    return (
      <View style={sheetStyle.title}>
        <Text style={sheetStyle.titleText}>{title}</Text>
      </View>
    )
  }

  renderMessage  = ()=> {
    const message = this.props.message

    if (!message) {
      return null
    }

    if (React.isValidElement(message)) {
      return (
        <View style={sheetStyle.message}>{message}</View>
      )
    }

    return (
      <View style={sheetStyle.message}>
        <Text style={sheetStyle.titleText}>{message}</Text>
      </View>
    )
  }

  renderCancelButton  = ()=> {
    let {options, cancelButtonIndex, tintColor} = this.props
    if (cancelButtonIndex > -1 && options[cancelButtonIndex]) {
      return (
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#f4f4f4"
          style={[btnStyle.wrapper, btnStyle.cancel]}
          onPress={this.cancel}
        >
          <Text style={[btnStyle.title, {fontWeight: '700', color: tintColor}]}>{options[cancelButtonIndex]}</Text>
        </TouchableHighlight>
      )
    } else {
      return null
    }
  }

  createButton  = (title, fontColor, index,len)=> {
    let titleNode = null
    if (React.isValidElement(title)) {
      titleNode = title
    } else {
      titleNode = <Text style={[btnStyle.title, {color: fontColor}]}>{title}</Text>
    }
    return (<TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor="#f4f4f4"
        style={[btnStyle.wrapper,len==index?btnStyle.last:null,{backgroundColor:"#fff"}]}
        onPress={()=>this.hide(index)}
      >
        {titleNode}
      </TouchableHighlight>
    )
  }

  renderOptions  = ()=> {
    let {options, tintColor, cancelButtonIndex, destructiveButtonIndex} = this.props;
    let len = options.length-1;
    return options.map((title, index) => {
      let fontColor = destructiveButtonIndex === index ? WARN_COLOR : tintColor
      return index === cancelButtonIndex ? null : this.createButton(title, fontColor, index,len)
    })
  }

  render () {
    const { cancelButtonIndex } = this.props;
    const { visible, sheetAnim } = this.state;
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={this.cancel}
      >
        <View style={sheetStyle.wrapper}>
          <Text style={styles.overlay} onPress={this.cancel}></Text>
          <Animated.View
            style={[sheetStyle.bd, {height: this.translateY+15, transform: [{translateY: sheetAnim}]}]}
          >
            {this.renderTitle()}
            {this.renderMessage()}
            <ScrollView
                style={styles.scrollContainer}
              scrollEnabled={this.scrollEnabled}
              contentContainerStyle={sheetStyle.options}>
              {this.renderOptions()}
            </ScrollView>
            {this.renderCancelButton()}
          </Animated.View>
        </View>
      </Modal>
    )
  }
}



ActionSheet.defaultProps = {
  tintColor: '#007aff',
  onPress: () => {}
}

export default ActionSheet
