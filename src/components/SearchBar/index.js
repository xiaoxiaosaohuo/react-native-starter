import React from 'react';
import { View, TextInput, Text, Image, StyleSheet } from 'react-native';
import Icon from "../Icon";
import variables from "../../utils/platform";

const barHeight = variables.toolbarHeight;
const barMarginTop = variables.platform === "ios" ? (variables.isIphoneX ? 44 : 20) : 0;
const paddingHight = variables.platform === 'android' ? 0 : -8;

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      value = '';
    }
    this.state = {
      value,
      focus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
      // console.log(nextProps.value);
    if ('value' in nextProps&&nextProps.value!==this.props.value) {

      this.setState({
        value: nextProps.value,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  }

  onChangeText = (value) => {
      this.setState({ value });
    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel(this.state.value);
    }
  }

  onFocus = () => {
    this.setState({
      focus: true,
    });
    // console.log("锁定了斐林试剂代付款");
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur = () => {
    this.setState({
      focus: false,
    });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  render() {
    const {
      showCancelButton, value: propsValue, cancelText,
      onChangeText, onChange, onSubmitEditing, disabled,style,
      ...restProps,
    } = this.props;
    const { value, focus } = this.state;
    const _showCancelButton = showCancelButton || focus;

    return (
      <View style={styles.wrapper}>

          <View style={styles.leftIcon}>
             <Icon type="xiangzuo1" color="#fff" onPress={this.onCancel}></Icon>
          </View>
        <View style={styles.inputWrapper}>
         <Icon type="secrch" style={styles.searchIcon}/>
          <TextInput
            value={value}
            onChangeText={this.onChangeText}
            style={[styles.input, style]}
            editable={!disabled}
            ref={el => this.inputRef = el}
            onSubmitEditing={this.onSubmit}
            clearButtonMode="always"
            underlineColorAndroid="transparent"
            // autoFocus
            {...restProps}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </View>

        {
          _showCancelButton &&
            <View style={styles.cancelTextContainer}>
              <Text style={styles.cancelText} onPress={this.onCancel}>
              {cancelText}
              </Text>
            </View>
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    backgroundColor:'#fff'
  },
  leftIcon:{
     alignSelf:"center",
     justifyContent:"flex-start",
     paddingRight:10
  },
  searchIcon:{
        right:5,
        color:"#ddd"
  },
  input: {
    borderRadius: variables.radius_md,
    backgroundColor: '#fff',
    height: variables.search_bar_input_height,
    color: variables.color_text_base,
    fontSize: variables.font_size_base,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },

  wrapper: {
    backgroundColor: variables.brandPrimary,
    height: barHeight,
    paddingTop:barMarginTop,
    paddingLeft: variables.h_spacing_md,
    paddingRight: variables.h_spacing_md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    borderColor: variables.listBorderColor,

  },
  cancelTextContainer: {
    height: variables.search_bar_input_height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: variables.font_size_caption,
    color: "#fff",
    paddingLeft: variables.h_spacing_lg,
  },
  search: {
    tintColor: variables.input_color_icon,
    position: 'absolute',
    left: 20,
    top: (variables.search_bar_height - variables.icon_size_xxs) / 2,
    width: variables.icon_size_xxs,
    height: variables.icon_size_xxs,
  },
});

SearchBar.defaultProps = {
  cancelText:"取消",
  showCancelButton:true
};

export default SearchBar
