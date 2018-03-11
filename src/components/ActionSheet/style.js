import { StyleSheet, Dimensions, StatusBar } from 'react-native'
import variables from "../../utils/platform";
export const hairlineWidth = StyleSheet.hairlineWidth

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.5,
    backgroundColor: '#000'
},
scrollContainer:{
    // flex:1,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,

}
})

export const sheetStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',

  },
  bd: {
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom:10,

  },
  title: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal:variables.h_spacing_md,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  message: {
    height: 40,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#8f8f8f',
    fontSize: 12
  }
})

export const btnStyle = StyleSheet.create({
  wrapper: {
    height: 50,
    borderTopWidth: hairlineWidth,
    borderColor:variables.listBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal:variables.h_spacing_md,
  },
    title: {
        fontSize: 18
    },
    cancel:{
        marginTop:10,
        borderRadius:10,
    },
    last:{
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderWidth: hairlineWidth,
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderColor:variables.listBorderColor,
    }

})
