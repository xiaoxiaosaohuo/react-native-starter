
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {List,Icon,Delete,} from "../../components";
const  ListItem = List.Item;
export default class ExampleScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            refreshing:false,
            refreshState:"Inital",
            dataSource:[
                {
                    name:"自由明珠",
                    id:"1"
                },
                {
                    name:"平等法制",
                    id:"2"
                },
                {
                    name:"混乱失控",
                    id:"3"
                },
                {
                    name:"自由明珠",
                    id:"4"
                },
                {
                    name:"平等法制",
                    id:"5"
                },
                {
                    name:"混乱失控",
                    id:"6"
                },
                {
                    name:"自由明珠",
                    id:"7"
                },
                {
                    name:"平等法制",
                    id:"8"
                },
                {
                    name:"混乱失控",
                    id:"9"
                },
                {
                    name:"平等法制",
                    id:"10"
                },
                {
                    name:"混乱失控",
                    id:"11"
                },
                {
                    name:"自由明珠",
                    id:"12"
                },
                {
                    name:"平等法制",
                    id:"13"
                },
                {
                    name:"混乱失控",
                    id:"14"
                }
            ]
        }
    }
  static navigationOptions = {
    title:"联系人",
  };
  onListPress = (item)=>{
      console.tron.log(item)
  }
  renderRow =({item}) =>{
        return(
            <ListItem
                style={styles.item}
                onPress = {()=>this.onListPress(item)}
                >
                <Text size={15}>
                    {item.name}
                </Text>


            </ListItem>
        )
    }
    handleDel = (data,index,rowMap)=>{
        console.log(data,index,rowMap);
        rowMap[`${index}`].props.closeRow();
    }
    renderHiddenRow = (rowData,rowMap) =>{
        return(
            <Delete
                rowData = {rowData}
                rowMap={rowMap}
                onPress = {this.handleDel}
                >

            </Delete>
        )
    }
    onRefresh = ()=>{
        console.log("正在刷新");

    }
    onLoadMore = ()=>{
        console.log(this.list);
        this.setState({
            refreshState:"Refreshing"
        })
        setTimeout(()=>{
            this.setState({
                refreshState:"NoMoreData"
            })
        },2000)
    }
  render(){
      const {dataSource,refreshState} = this.state;

      return(
          <View style={styles.container}>
                <List
                    ref = {(list)=>this.list = list}
                    data={dataSource}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderRow}
                    renderRightHiddenRow={this.renderHiddenRow}
                    rightOpenValue={-100}
                    disableRightSwipe={true}
                    onRefresh={this.onRefresh}
                    onLoadMore = {this.onLoadMore}
                    refreshState={refreshState}


                    >
                </List>
        </View>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    },
    item:{
        paddingVertical:30
    },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    },
})
