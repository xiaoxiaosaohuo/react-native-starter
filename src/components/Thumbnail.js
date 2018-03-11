import React, { PureComponent } from "react";
import { Image,StyleSheet } from "react-native";
const prefixUrl =  'http://res.hualala.com/';
class Thumbnail extends PureComponent {
	render() {
        const {style,square=false,prefix=prefixUrl,url,size,...restProps}=this.props;
        const imageStyle = [
            styles.image,
            square&&styles.square,
            size&&styles[size]
        ]
		const uri = !!prefix?`${prefixUrl}${url}`:url;
        return (
            <Image
                style={[imageStyle,style]}
                {...restProps}
                source={{uri:uri}}
            />
        )
	}
}


const styles = StyleSheet.create({
    image:{
        width: 50,
		height: 50,
		borderRadius: 25,
    },
    square:{
        borderRadius: 0,
    },
    small:{
        width: 36,
		height: 36,
	    borderRadius: 18,
    },
    large:{
        width: 80,
		height: 80,
		borderRadius: 40,
    },


})

export default Thumbnail ;
