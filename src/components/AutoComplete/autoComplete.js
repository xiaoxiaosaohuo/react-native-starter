import React, { Component } from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import SearchBar from "../SearchBar";
import variables from "../../utils/platform";
import {getValuePropValue} from "./utils";
class Autocomplete extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
        dataSource: ds.cloneWithRows(props.data),
        hideResults:props.hideResults?true:false,
        selectValue:''
    };
    this.resultList = null;
  }

  componentWillReceiveProps({ data }) {
    const dataSource = this.state.dataSource.cloneWithRows(data);
    this.setState({ dataSource });
  }


  focus = ()=>{
    this.setState({
        hideResults:false
    })
  }

  renderResultList = ()=>{
    const { dataSource } = this.state;
    const { listStyle, renderSeparator, keyboardShouldPersistTaps } = this.props;

    return (
      <ListView
        ref={(resultList) => { this.resultList = resultList; }}
        dataSource={dataSource}
        keyboardShouldPersistTaps={true}
        renderRow={this.renderItem}
        renderSeparator={renderSeparator}
        style={[styles.list, listStyle]}
      />
    );
  }

    onItemPress = (value,rowData)=>{
        const {onItemPress} = this.props;
        this.setState({
            hideResults:true,
            selectValue:value
        })
        onItemPress&&onItemPress(rowData)

    }

  renderTextInput = ()=> {
    const { onEndEditing, style,onCancle,keyboardShouldPersistTaps,onStartShouldSetResponderCapture,renderItem,renderSeparator,...restProps } = this.props;
    const props = {
      onEndEditing: e => onEndEditing && onEndEditing(e),
      onFocus:this.focus,
      ...restProps
    };
    const {selectValue} = this.state;
    return <SearchBar
            {...props}
            onCancle={onCancle}
            ref={ref => this.searchBarRef = ref}
            // value={selectValue}
        />
  }
  renderItem = (rowData)=>{
      const {renderItem} = this.props;
      const option = renderItem(rowData);
      let optionName = option.type.name;
      if(optionName!=='Option'){
           throw new Error(
            'the renderItem should return `Option` as the container ' +
              `instead of \`${optionName ||
                option.type.displayName ||
                option.type}\`.`
          );
      }

      if('children' in option.props){
          let value = getValuePropValue(option);
          return(
              <TouchableOpacity
                  style={styles.listBtn}
                  onPress = {()=>this.onItemPress(value,rowData)}
                  	underlayColor={variables.listBtnUnderlayColor}
                  >
                      <View style={styles.wrapperStyle}>
		                   {option.props.children}
  					</View>

              </TouchableOpacity>
          )
      }

  }

  render() {
    const { dataSource, hideResults } = this.state;
    const {
      style,
      onShowResults,
      onStartShouldSetResponderCapture,
      children
    } = this.props;
    const showResults = dataSource.getRowCount() > 0;

    onShowResults && onShowResults(showResults);
    return (
      <View style={[styles.container, style]}>
        {React.isValidElement(children)?children:this.renderTextInput()}

        {!hideResults && (
          <View
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {showResults && this.renderResultList()}
          </View>
        )}
      </View>
    );
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: variables.borderWidth
};

const androidStyles = {
  container: {
    flex: 1
  },
  inputContainer: {
    ...border,
    marginBottom: 0
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 10,
    marginTop: 0
  }
};

const iosStyles = {
  container: {
    zIndex: 1
  },
  inputContainer: {
    ...border
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0
  }
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },

  wrapperStyle:{
      flex:1,
      paddingVertical:variables.listItemPadding,
      borderBottomWidth:variables.borderWidth,
      borderBottomColor:variables.listBorderColor,
      backgroundColor:variables.listBg
  },
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
});




 Autocomplete.defaultProps = {
   data: [],
   defaultValue: '',
   keyboardShouldPersistTaps: 'always',
   onStartShouldSetResponderCapture: () => false,
   renderSeparator: null,
 };
export default Autocomplete;
