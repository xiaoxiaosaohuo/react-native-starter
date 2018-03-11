import React, { PureComponent } from "react";
import { TouchableOpacity,StyleSheet,View,Text} from "react-native";
import Icon from "../Components/Icon"
import variables from "../utils/platform";
const platform = variables.platform;
class Radio extends PureComponent {
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

		if (!('checked' in this.props)) {
	      this.setState(prevState=>{
	        return {
				checked: !prevState.checked,
			}
	      });
	    }
    };

	render() {
		const hasChecked  = this.state.checked;
        const {type="radio",size="xxs",disabled,children,onChange,style,radioStyle,checked,label,defaultChecked,inverse,...rest} = this.props;

		let color = hasChecked?"#308eff":"transparent";
		color = inverse?"#308eff":color;
		color = disabled?variables.btnDisabledBg:color;
		let iconType = `${type}${hasChecked?"checked":"uncheck"}`;
		const RadioWithChild = ()=>{
			if(inverse){
				return <View style={[styles.radio,radioStyle]}>
					<Icon type={iconType} color={color} size={size} style={styles.icon}></Icon>
					{children}
				</View>
			}else{
				return <View style={[styles.radio,radioStyle]}>
					{children}
					<Icon type={iconType} color={color} size={size} style={styles.icon}></Icon>
				</View>
			}
		}
		const RadioView = ()=>{
			if(inverse){
				return 	<View style={[styles.radio,radioStyle]}>
                        <Icon type={iconType} color={color} size={size} style={styles.icon}></Icon>
						<Text style={styles.label}>{label}</Text>
                    </View>
			}else{
				return <View style={[styles.radio,radioStyle]}>
						<Text style={styles.label}>{label}</Text>
                        <Icon type={iconType} color={color} size={size} style={styles.icon}></Icon>
                    </View>
			}
		}
		return (
			<TouchableOpacity
                ref={c => (this._root = c)}
                {...rest}
				style={[styles.container,style]}
                disabled={disabled}
				onPress={this.handleChange}
                >
				{React.isValidElement(children)?<RadioWithChild/>:<RadioView/>}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container:{
        paddingLeft:10,
        backgroundColor:'#fff',
        flexDirection:'row',
        height:40,
        alignItems:'center',
    },
    radio:{
		flex:1,
		height:40,
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
    },
    icon:{
		marginRight:5,
        textAlign:'right',
    },
	label:{
		fontSize:14
	},
	left:{

	}
})


export default Radio
