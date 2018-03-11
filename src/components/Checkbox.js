import React, {PureComponent} from 'react'
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    View,
} from  'react-native'
import IconfontConf from '../utils/iconfontConf'
class CheckBox extends PureComponent{
    constructor(props){
        super(props)
        const checked = 'checked' in props ? props.checked : props.defaultChecked;
        this.state={
            checked:checked
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
          this.setState({
            checked: nextProps.checked,
          });
        }
    }
    handleChange = () => {
        const { props } = this;
        if (props.disabled) {
          return;
        }
        //props不存在checked
        let checked = this.state.checked

        if(typeof props.onChange =="function"){
            props.onChange({...props,checked: !checked,});
        }
        this.setState(prevState=>{
            return{
                checked: !prevState.checked,
            }
        });
    };
    render(){
        const { checked } = this.state;
        const {label,disabled} = this.props;
        return (
            <TouchableHighlight
                onPress={this.handleChange}
                style={styles.container}
                underlayColor='transparent'
                disabled={disabled}
                >
                    <View style={styles.wrapper}>
                        <Text style={[styles.box,!checked?styles.checked:null,disabled?styles.disabled:null]}>
                            {IconfontConf(checked?'checked':'uncheck')}
                        </Text>
                        <Text style={styles.text}>{label}</Text>
                    </View>

            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        // marginVertical:4,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
    },
    wrapper:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:8
    },
    box:{
        fontFamily:'iconfont',
        color:'#308eff',
        fontSize:20,
        marginLeft:5,
        marginRight:5,

    },
    text:{
        fontSize:14,
        color:"#666"

    },
    checked:{
        color:'#999',
    },
    disabled:{
        color:"#ddd"
    }
})

CheckBox.defaultProps = {
    defaultChecked: false,
    onChange:()=>{},
  };
export default CheckBox
