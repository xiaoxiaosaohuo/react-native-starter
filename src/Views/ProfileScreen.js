import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class  ProfileScreen extends Component{
    static navigationOptions = {
      title: '消息',
    };
    componentDidMount(){

        this.props.navigation.addListener('didFocus', (status) => {
                console.log('state: ', this.props.user)
        });
    }
    doStuff = ()=>{
         console.log('state: ', this.props.user)
    }
    componentWillReceiveProps(nextProps){
        // console.log(this.props.navigation.state.routeName,nextProps.navigation.state.routeName)
    }

    render(){
         // console.log('state: ', this.props.nav)
        return(
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Profile Screen
              </Text>
            </View>
        )
    }

};

const mapStateToProps = state => ({
  user:state.user,
  nav:state.nav

})





export default  connect(mapStateToProps,null)(
    ProfileScreen
);
