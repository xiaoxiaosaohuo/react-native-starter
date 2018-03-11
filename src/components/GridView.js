import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import variables from "../utils/platform";
const {deviceWidth,deviceHeight,borderWidth} = variables
class GridView extends Component {
  constructor(props) {
    super(props);
    this.width = deviceWidth/props.numColumns;
  }
  keyExtractor = ()=>{

  }
  renderItem  = (item)=>{

      return(
          <View style={[styles.item,{width:this.width},{height:this.width}]}>
              {this.props.renderItem(item)}
          </View>
      )
  }
  render(){
      const {data,numColumns} = this.props;

      return(
          <View style={styles.container}>
              <FlatList
              data={data}
              numColumns={numColumns}
              renderItem={this.renderItem}
            />
          </View>
      )
  }
}
GridView.defaultProps={
    numColumns:3,
    data:[],
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    item:{
        borderRightWidth:variables.borderWidth,
        borderBottomColor: '#eee',
        borderBottomWidth: variables.borderWidth,
        borderRightColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    }
});

export default GridView;
