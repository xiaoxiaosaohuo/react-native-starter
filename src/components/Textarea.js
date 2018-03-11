import React, { Component } from "react";
import { TextInput,StyleSheet } from "react-native";
import variables from "../utils/platform";

class Textarea extends Component {
    constructor(props){
        super(props);
        this.state={
            value:'value' in props? props.value:props.defaultValue,
        }
    }
    onChangeText=(value)=>{
        this.setState({
            value:value
        })
        this.props.onChangeText&&this.props.onChangeText(value)
    }
    componentWillReceiveProps(nextProps){
        if('value' in nextProps){
            this.setState({
                value:nextProps.value
            })
        }
    }
	render() {
        const {rowSpan,placeholderTextColor,value,defaultValue,bordered,underline,onChangeText,style,...restProps} = this.props;
        const height = rowSpan?rowSpan * 25:100;
        const textareaStyle = StyleSheet.flatten([
            styles.textarea,
            bordered&&styles.bordered,
            underline&&styles.underline,
            {height:height},
            style

        ])
		return (
			<TextInput
                {...restProps}
                value={this.state.value}
				style={textareaStyle}
				multiline
                onChangeText={this.onChangeText}
				placeholderTextColor={
					placeholderTextColor ? placeholderTextColor : variables.placeholderTextColor
				}
				underlineColorAndroid="rgba(0,0,0,0)"
			/>
		);
	}
}

// style,rowSpan,bordered,underline
Textarea.defaultProps={
    bordered:true,
    underline:true,
    defaultValue:'',
}

const styles = StyleSheet.create({
    textarea:{
        color: variables.textColor,
        paddingLeft: 10,
        paddingRight: 5,
        paddingVertical:5,
        fontSize: 14,
        textAlignVertical: "top",
        backgroundColor:variables.fill_base,
    },
    bordered:{
        borderWidth: variables.borderWidth,
        // marginTop: 5,
        borderColor: variables.inputBorderColor,
        borderRadius:5,
  },
  underline:{
      borderBottomWidth: variables.borderWidth,
      marginTop: 5,
      borderColor: variables.inputBorderColor
  }

})

export default Textarea ;
