
import React from 'react';
import { BackHandler,InteractionManager } from "react-native";
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,NavigationActions } from 'react-navigation';
import {
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../Views/LoginScreen';
import { addListener } from '../Config/navWithReduxConfig';
import variables from "../utils/platform";
import navigationEveryWhere from "../Config/navigationEveryWhere";
export const RootNavigator = StackNavigator({
  Main: {
    screen: MainTabNavigator,
  },
  Login:{
    screen: LoginScreen,
  },
},
{
  navigationOptions: () => ({
    headerTitleStyle: {
      fontWeight: 'normal',
      color:"#fff"
    },
    headerStyle:{
        backgroundColor:variables.brandPrimary,
        borderBottomColor:variables.brandPrimary,
        paddingHorizontal:10
    },

  }),
  initialRouteName: 'Login',
  transitionConfig: () => ({
   screenInterpolator: (sceneProps) => {
     const routeName = sceneProps.scene.route.routeName;
     if (routeName === 'Main') return null;

   },
 }),
});

class AppWithNavigationState extends React.Component {

    componentWillMount(){

        const {user:{tokenInfo}} = this.props;
        console.log(this.props);
        // if(tokenInfo.data&&tokenInfo.data.access_token){
            const navigateAction = NavigationActions.navigate({
              routeName: 'Main',
              params: {},
              action: NavigationActions.navigate({ routeName: 'Main' }),
            });
            this.props.dispatch(navigateAction)
        // }


    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        // console.log(RootNavigator);
        // navigationEveryWhere.reset("Main")
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
          return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
  render() {
    const { dispatch, nav } = this.props;
    return (
      <RootNavigator
          ref={navigatorRef => {
          navigationEveryWhere.setContainer(navigatorRef);
        }}
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  user:state.user
});

export default connect(mapStateToProps)(AppWithNavigationState);
