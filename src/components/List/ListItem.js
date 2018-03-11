import React, { PureComponent } from "react";
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Platform,
    StyleSheet,
} from "react-native";

import variables from "../../utils/platform";

class ListItem extends PureComponent {
	render() {
        const {style,itemDivider,...rest} = this.props;
        const wrapperStyle=StyleSheet.flatten([
            styles.item,
            itemDivider&&styles.itemDivider,
            style
        ]);

			return (
				<TouchableHighlight
					onPress={this.props.onPress}
					onLongPress={this.props.onLongPress}
					ref={c => (this._root = c)}
					underlayColor={variables.listBtnUnderlayColor}
				>
					<View {...rest} style={wrapperStyle}>
						{this.props.children}
					</View>
				</TouchableHighlight>
			);

	}
}

const styles = StyleSheet.create({
    item:{
        flex:1,
        paddingVertical:variables.listItemPadding,
        borderBottomWidth:variables.borderWidth,
        borderBottomColor:variables.listBorderColor,
        backgroundColor:variables.listBg
    },
    itemDivider: {
      borderBottomWidth: null,
      marginLeft: null,
      padding: variables.listItemPadding,
      paddingLeft: variables.listItemPadding + 5,
      backgroundColor: variables.listDividerBg,
      flexDirection: "row",
      borderColor: variables.listBorderColor,
      alignItems:"center"
    },
})


export default ListItem ;
