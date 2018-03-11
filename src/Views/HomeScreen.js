import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import {  bindActionCreators} from 'redux';
import {actions as IndexActions} from '../reducers'
import Button from "../components/Button";
import { StackNavigator } from 'react-navigation';

import {Icon,Text,Badge,Grid,Header} from "../components";
const underlayColor = '#f4f4f4';

const  applicationList = [
    {
        screen: "Sales",
        text: '销售',
        type: 'XS',
        color:'#75b8fd',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "CommercialTenant",
        text: '商户',
        type: 'SH',
        color:'#f8a364',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "WorkOrder",
        text: '工单',
        type: 'GD',
        color:'#4bd69f',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "NewJournal",
        text: '日志',
        type: 'RIZHI',
        color:'#a987e5',
        hasRight: true,
        forbidden: false,
    },
    {
        screen: "Report",
        text: '报表',
        type: 'baobiao',
        color:'#55a3f9',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "Knowledge",
        text: '知识',
        type: 'zsk',
        color:'#FFB21C',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "Approve",
        text: '审批',
        type: 'shenpi1',
        color:'#ff5d5d',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "PreSales",
        text: '售前',
        type: 'hetong',
        color:'#f86881',
        hasRight: false,
        forbidden: false
    },
    {
        screen: "Punch",
        text: '打卡',
        type: 'daka',
        color:"#4aa9fd",
        hasRight: false,
        forbidden: true
    },
    {
        screen: "SignIn",
        text: '签到',
        type: 'qiandao',
        color:"#59d191",
        hasRight: false,
        forbidden: true
    },
    {
        screen: "CheckAttendance",
        text: '考勤',
        type: 'kaoqin',
        color:'#fcb036',
        hasRight: false,
        forbidden: true
    },
    {
        screen: "Schedule",
        text: '日程',
        type: 'richeng',
        color:'#f8a364',
        hasRight: false,
        forbidden: true
    },
    {
        screen: "Feedback",
        text: '反馈',
        type: 'fankui',
        color:'#f8a364',
        hasRight: false,
        forbidden: true
    },
    {
        screen: "Notice",
        text: '公告',
        type: 'gonggao',
        color:'#F8A364',
        hasRight: false,
        forbidden: false
    }
];
class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    static navigationOptions = ({ navigation }) => {
      const {state} = navigation;

      return {
        title:"应用",
        header:null,
        // headerRight: (
        //     <Icon type="saoyisao" color="#fff" onPress={state.params.scan}></Icon>
        // ),
      };
    };
  onPress = (item)=>{
     this.props.navigation.navigate("Detail")
  }
  scanCode = ()=>{
      this.props.login({url:"loginURL",phoneNumber:this.phoneNum,dynamicCode:this.verCode})

  }
  componentDidMount(){
      this.props.navigation.setParams({
           scan: this.onScan
   });
  }
  // componentWillReceiveProps(nextProps){
  //     console.log(nextProps.navigation.staterouteName)
  // }
  renderItem = ({item})=>{
      return <TouchableHighlight
          underlayColor={underlayColor}
          onPress = {()=>this.onPress(item)}
            >
          <View style={styles.listItem}>

              <Icon type={item.type} style={styles.icon} size={32} color={item.color}></Icon>
              <Text style={styles.text} size={16} color='#333' >{item.text}</Text>
          </View>
      </TouchableHighlight>
  }
  render() {
      const {data} = this.state;
    return (
      <View style={styles.container}>
          <Header
          left={[{text:'',press:null,icon:false}]}
          title={[{text:'应用',press:null,icon:false}, {text:'',press:null,icon:null}]}
          right={[{text:'',press:null,icon:false},{text:'saoyisao',press:this.scanCode,icon:true}]}
      />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Grid
              data={applicationList}
              renderItem={this.renderItem}
              numColumns={3}
              >

          </Grid>
        </ScrollView>


      </View>
    );
  }
}

const mapStateToProps = state => ({
  user:state.user


})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({login:IndexActions.login,},dispatch)

})




export default  connect(mapStateToProps,mapDispatchToProps)(
    HomeScreen
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
  },
  icon:{
     paddingVertical:10,
     // paddingHorizontal:10,
  },
  textWithIcon:{
      backgroundColor: '#000',
      textAlign: 'center',
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
