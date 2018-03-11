import React,{PureComponent} from "react";
import {
    View,
    StyleSheet,
    PixelRatio,
} from "react-native";
import variables from "../../utils/platform";
class  Card  extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        const {style,children,full,...restProps} = this.props;
        const cardStyle = full ? styles.full : {};
        const childWitStyle = React.Children.map(children, (child) => React.cloneElement(
                child, { styles },
                ),
            );
        return(
            <View style={[styles.card,cardStyle,style]} {...restProps}>
                {childWitStyle}
            </View>

        )
    }

}

Card.defaultProps = {
    style: {},
    full: false,
}
export default Card

const styles = StyleSheet.create({
    card:{
        borderColor: variables.listBorderColor,
        borderRadius: variables.radius_md,
        flexDirection: 'column',
        backgroundColor: variables.fill_base,
        marginHorizontal: variables.h_spacing_md,
        marginVertical:variables.v_spacing_md,
        borderWidth:variables.borderWidth,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 1.5,
        // elevation: 3,
        alignSelf: 'stretch',
    },

    full: {
        borderRadius: 0,
        borderWidth: 0,
        marginHorizontal:0,
        marginVertical:0,
        // flex:1,
    },
    headerWrap: {
        flexDirection: 'row',
        paddingVertical: variables.v_spacing_sm,
        paddingRight: variables.h_spacing_lg,
        marginLeft: variables.h_spacing_lg,
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerContent: {
        color: variables.color_text_base,
        fontSize: variables.font_size_heading,
        flex: 1,
    },
    headerExtra: {
        flex: 1,
        fontSize: variables.font_size_heading,
        color: variables.color_text_caption,
        textAlign: 'right',
    },
    content: {
        flexGrow: 1,
        // flex:1,
        paddingVertical: variables.v_spacing_md,
        paddingHorizontal: variables.h_spacing_lg,
        minHeight: 48,
        borderTopWidth: variables.borderWidth,
        borderColor: variables.listBorderColor,
    },
    footerWrap: {
        flexDirection: 'row',
        paddingHorizontal: variables.h_spacing_lg,
        paddingVertical:variables.v_spacing_sm,
        borderTopWidth: variables.borderWidth,
        borderColor: variables.listBorderColor,
    },
    footerContent: {
        flex: 1,
        fontSize: variables.font_size_base,
        color: variables.color_text_caption,
    },
    footerExtra: {
        textAlign: 'right',
        fontSize: variables.font_size_base,
        color: variables.color_text_caption,
    },

})
