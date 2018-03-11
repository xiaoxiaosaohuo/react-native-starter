
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Badge} from "../../components";
export default class ExampleScreen extends React.Component {
    constructor(props){
        super(props);
    }
  static navigationOptions = {
    title:"BadgeExample",
  };
  render(){
      return(
          <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={{flexDirection: 'row'}}>
                <Badge count={6} />
                <View style={{width: 4}} />
                <Badge count={68} />
                <View style={{width: 4}} />
                <Badge count={689} />
                <View style={{width: 4}} />
                <Badge count='new' />
              </View>
              <View style={{flexDirection: 'row',marginVertical:10}}>
                <Badge type='square' count={6} />
                <View style={{width: 4}} />
                <Badge type='square' count={68} />
                <View style={{width: 4}} />
                <Badge type='square' count={689} />
                <View style={{width: 4}} />
                <Badge type='square' count='new' />
              </View>
              <View style={{flexDirection: 'row',marginVertical:10}}>
                <Badge style={{backgroundColor: '#5bc0de'}} type='square' count='券' />
                <View style={{width: 4}} />
                <Badge style={{backgroundColor: '#777', paddingLeft: 0, paddingRight: 0}}>
                  <Text style={{color: '#fff'}}>$</Text>
                </Badge>
              </View>
            </ScrollView>
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    },
})
