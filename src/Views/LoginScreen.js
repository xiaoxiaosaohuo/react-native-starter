import React, {Component}from 'react';

import {
    View,
    TextInput,
    Alert,
    TouchableOpacity,
    Platform,
    BackAndroid,
    NativeModules,
    Keyboard,
    StyleSheet
}from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {  bindActionCreators} from 'redux';
import variables from "../utils/platform";
import {actions as IndexActions} from '../reducers';
// import Icon from "../components/Icon";
// import Input from "../components/Input";
import Config from '../Config/config';
import {Icon,Text,Input,Header} from "../components";
const {deviceHeight,deviceWidth,} = variables;
const  getVerificationCodeURL = Config.loginTestIP + 'sendDynamicCodeMobile';
const loginURL = Config.loginTestIP + 'logOnDynamicCodeMobile';
const logoutURL = Config.loginTestIP + 'logoffMobile';
let debug = true;

let firstIn = true;
let verWaitTime = 0;
let timer = null;
const  phoneReg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;


class LoginScreen extends Component {
  constructor(props){
      super(props)
      this.state={
          loading:false,
          isloading: false,
          verCode: '',
          modalText: '',
          hasMounted: false,
          firstIn: true,
          getVerText: '获取验证码',
          loginText: '登录',
          loginTextColor: '',
      }
      this.phoneNum="";
      this.verCode = "";
      this.isLogin = !!props.user.userInfo.access_token

  }
  static navigationOptions = {
    title: '用户登录',
    header:null
   //  headerStyle: {
   //   backgroundColor: variables.brandPrimary,
   //   borderBottomColor: variables.brandPrimary,
   // },
   // headerTitleStyle:{
   //     color:"#fff"
   // }
  };
  componentWillMount(){
      const {user} = this.props;
      if(this.isLogin){
          // this.props.navigation.replace("Main",{param:"金鑫"})
      }
  }
  componentDidMount(){
      console.log(this.props)
  }
  judgePhoneNumber = ()=>{
      if (!phoneReg.test(this.phoneNum)){
          Alert.alert('提示', '请正确输入手机号码');
          return false
      }
      return true

  }
  judgeCode = ()=>{
      if (this.verCode.length != 6){
          Alert.alert('提示', '请正确输入验证码');
           return false ;
      }
      return true
  }

  onPhoneNumberChange = (text)=>{
       this.phoneNum = text.trim();
  }
  codeChange = (text)=>{
       this.verCode = text.trim();
      // this.setState({verCode:text})
  }
  waitForAnotherVerCode = ()=> {
      if(timer&&verWaitTime<=0){
          clearTimeout(timer);
          timer=null
      }

      if (verWaitTime > 1) {
          verWaitTime--;
          this.setState({getVerText: verWaitTime + '秒后重新获取'})
          timer = setTimeout(this.waitForAnotherVerCode, 1000);
      } else {
          verWaitTime = 0;
          this.setState({getVerText: '获取验证码'})
      }
  }
  getVerificationCode = ()=>{
      const {getVerText} = this.state;
      const isPhoneNumber = this.judgePhoneNumber();
      //防止60s内点击
      if (this.state.getVerText !== '获取验证码'){
          return;
      }

      if(isPhoneNumber){
          const url = getVerificationCodeURL + '?phoneNumber=' + this.phoneNum + '&plat=1';
          const body = {
              phoneNumber: this.phoneNum,
              plat: 1
          }
          this.setState({getVerText: '获取中...'})
          fetch(url, {
              headers:Config.passportHeaders,
              method: 'POST',
              body: JSON.stringify(body)
          })
          .then((response) => {
              return response.json();
          })
          .then((responseData) => {

                  if (Config.production&&responseData.ip) {
                      Config.ip = `http://${responseData.ip}/`;
                      Config.testIP = `http://${responseData.ip}/`;
                  }
                  verWaitTime = 60;
                  this.setState({getVerText: verWaitTime + '秒后重新获取'});
                  this.waitForAnotherVerCode()
                  if (!responseData.success){
                      Alert.alert('错误', responseData.msg);
                  }
              }).catch((e) => {
                  console.log(e)
                  Alert.alert('错误', '网络读取失败！');
                  this.setState({getVerText: '获取验证码'});
                });
      }
  }
  login = ()=>{
      const {verCode} = this.state;
      const isPhoneNumber = this.judgePhoneNumber();
      if (isPhoneNumber){
          const isCode = this.judgeCode();
          if(isCode){
             let aaa = this.props.login({url:loginURL,phoneNumber:this.phoneNum,dynamicCode:this.verCode});

          }
      }
  }




  render() {
      const {getVerText,loginText,loading} = this.state;
      let titleColor = '#F5F5F5';
      // let loginColor = this.state.verCode ? '#FFF' : '#66b6f1';

    return (
        this.isLogin?null:<View style={{width:deviceWidth , height:deviceHeight,}}>
            <Header
            left={[{text:'',press:null,icon:false}]}
            title={[{text:'用户登录',press:null,icon:false}, {text:'',press:null,icon:null}]}
            right={[{text:'',press:null,icon:false},{text:'',press:null,icon:false}]}
            />
            <View style={{alignItems:'center',justifyContent:'center'}}>

                <View style={styles.inputWrapper}>
                    <View style={styles.codeWrapper}>
                        <Icon type="sj" color="#8d9ea7"></Icon>
                        <Input
                            maxLength={11}
                            onChange={this.onPhoneNumberChange}
                            value={this.phoneNum}
                            placeholder={'请输入11位手机号'}
                        />
                    </View>
                </View>

                <View
                    style={styles.inputWrapper}>
                    <View style={styles.codeWrapper}>
                        <Icon type="qxsd" color="#8d9ea7"></Icon>
                        <Input
                            maxLength={6}
                            onChange={this.codeChange}
                            keyboardType={'numeric'}
                            value={this.verCode}
                            placeholder={'请输入验证码'}
                        />

                        <Text
                            style={{color:'#308eff',marginRight:10}}
                             onPress={this.getVerificationCode}
                          >
                             {getVerText}
                          </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={this.login}
                disabled={loading}
                 >
                <View
                    style={{backgroundColor:'#308eff',marginTop:45,marginLeft:20,borderRadius:5,width:deviceWidth - 40,height:46,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:"#fff",fontSize:16}}>{loginText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }
}
const mapStateToProps = state => ({
  user:state.user


})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({login:IndexActions.login},dispatch)

})




export default  connect(mapStateToProps,mapDispatchToProps)(
    LoginScreen
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputWrapper:{
      flexDirection: 'row',
      width:deviceWidth - 40,
      height:40,
      paddingLeft:10,
      paddingRight:10,
      marginTop:22,
  },
  codeWrapper:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      borderBottomWidth:variables.borderWidth,
      borderBottomColor:"#ddd"
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

});
