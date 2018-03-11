import React,{Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {Icon,Text,Header} from "../components";


class  Mine extends Component{
    static navigationOptions = {
      title: '我',
      header:null,
    };
    componentDidMount(){

        this.props.navigation.addListener('didFocus', (status) => {
                console.log('state: ', this.props.user)
        });
    }
    doStuff = ()=>{
         console.log('state: ', this.props.user)
    }
    goBack = ()=>{
        this.props.navigation.goBack();
    }
    componentWillReceiveProps(nextProps){
        // console.log(this.props.navigation.state.routeName,nextProps.navigation.state.routeName)
    }

    render(){
         const {userInfo} = this.props;
        return(
            <View style={styles.container}>
                <Header
                left={[{text:'xiangzuo1',press:this.goBack,icon:true}]}
                title={[{text:'我',press:null,icon:false}, {text:'',press:null,icon:null}]}
                right={[{text:'',press:null,icon:false},{text:'',press:null,icon:false}]}
                />
              <Text style={styles.welcome}>
                {userInfo.empName}
              </Text>
            </View>
        )
    }

};

const mapStateToProps = state => ({
  userInfo:state.user.userInfo,
  nav:state.nav

})





export default  connect(mapStateToProps,null)(
    Mine
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
