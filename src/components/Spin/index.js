import React, {PureComponent} from 'react'
import {StyleSheet,View} from 'react-native'
import AnimateView from "./Spin";
// import IsLoading from '../Status/IsLoading'
class Spin extends PureComponent{
    constructor(props){
        super(props)
        const spinning = props.spinning;
        this.state = {
          spinning,
        };
    }

    componentWillUnmount() {
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
    }
    componentWillReceiveProps(nextProps: SpinProps) {
        const currentSpinning = this.props.spinning;
        const spinning = nextProps.spinning;
        const { delay } = this.props;

        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        if (currentSpinning && !spinning) {
          this.debounceTimeout = setTimeout(() => this.setState({ spinning }), 200);
          if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
          }
        } else {
          if (spinning && delay && !isNaN(Number(delay))) {
            if (this.delayTimeout) {
              clearTimeout(this.delayTimeout);
            }
            this.delayTimeout = setTimeout(() => this.setState({ spinning }), delay);
          } else {
            this.setState({ spinning });
          }
        }
    }

    render(){
        const {spinning} = this.state;
        const {style} = this.props;
        return(
            <View style={[styles.container,style]} >
                {this.props.children}
                {spinning?<AnimateView />:null}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})
Spin.defaultProps={
    delay:300
}
export default Spin
