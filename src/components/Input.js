import React, { PureComponent } from "react";
import { TextInput,StyleSheet,View,Text } from "react-native";
import variables from "../utils/platform";
class Input extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            text: 'value' in props? props.value:props.defaultValue,
            height:40
         };
    }
    onChangeText = (text)=>{
        this.setState({text})
        if(typeof this.props.onChange =="function"){
            this.props.onChange(text)
        }

    }
    onContentSizeChange = (event)=>{
        const {onContentSizeChange,multiline } = this.props;
        if(multiline){
            this.setState({
                height: event.nativeEvent.contentSize.height
            });
            if(onContentSizeChange){
                onContentSizeChange(event);
            }
        }

    }

    componentWillReceiveProps(nextProps){
        if('value' in nextProps){
            this.setState({
                text:nextProps.value
            })
        }
    }
    render(){
        const {text,height} = this.state;
        const {style,defaultValue,underline,...rest} = this.props;
        const inputStyle = StyleSheet.flatten([
            styles.container,
            underline&&styles.underline,
            {height:height},
            style
        ])
        return(
            <TextInput
                {...rest}
                style={inputStyle}
                onChangeText={this.onChangeText}
                value={String(this.state.text)}
                 onChange={this.onContentSizeChange}
                 placeholderTextColor={variables.placeholderTextColor}
                underlineColorAndroid="rgba(0,0,0,0)"
          />
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        fontSize:15,
        color:variables.textColor,

        paddingLeft: 5,
		paddingRight: 5,
        paddingVertical:5,

    },
    underline:{
        borderColor: "#D9D5DC",
        borderWidth: variables.borderWidth,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
    }

})

Input.defaultProps = {
    defaultValue:""
}
export default Input
