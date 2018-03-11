import React, {PureComponent} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    View,
} from  'react-native';
import Checkbox from './Checkbox';
class CheckboxGroup extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
          value: props.value || props.defaultValue || [],
         };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          this.setState({
            value: nextProps.value || [],
          });
        }
    }
    getOptions() {
        const { options } = this.props;
        return options.map(option => {
          if (typeof option === 'string') {
            return {
              label: option,
              value: option,
            }
          }
          return option;
        });
    }
    toggleOption = (option) => {
        const optionIndex = this.state.value.indexOf(option.value);
        const value = [...this.state.value];
        if (optionIndex === - 1) {
          value.push(option.value);
        } else {
          value.splice(optionIndex, 1);
        }
        if (!('value' in this.props)) {
          this.setState({ value });
        }
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(value);
        }
    }
    render(){
        const { props, state } = this;
        let children = props.children;
        const {options} =props;
        if (options && options.length > 0) {
            children = this.getOptions().map(option => (
                <Checkbox
                  key={option.value}
                  disabled={'disabled' in option ? option.disabled : props.disabled}
                  value={option.value}
                  checked={state.value.indexOf(option.value) !== -1}
                  onChange={() => this.toggleOption(option)}
                  label={option.label}
                >
                </Checkbox>
                ));
            }
        return(
                <View style={styles.container}>
                    {children}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    }
})
CheckboxGroup.defaultProps={
    options:[]
}
export default CheckboxGroup
