import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from "../components/Icon";

import HomeStack from './HomeStack';

import ProfileScreen from '../Views/ProfileScreen';
import MineScreen from '../Views/MineScreen';
import Example from "../Views/Example/ListExample";
export default TabNavigator(
  {
    Home: {
      screen: HomeStack,
     //  navigationOptions: ({ navigation }) => ({
     //   title: `${navigation.state.params.name}'s Profile'`,
     // }),
    },
    Contacts:{
        screen:Example,
    },
    News: {
      screen: ProfileScreen,
    },
    Mine: {
      screen: MineScreen,
    },

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let color = focused?"#007aff":"#ccc";
        switch (routeName) {
            case 'Home':
                iconName =focused?"YY1":"YY";
                break;
            case 'News':
                iconName =focused?"XX1":"XX";
                break;
            case 'Contacts':
                iconName =focused?"contancted":"contanct";
                break;
            case 'Mine':
                iconName =focused?"WO1":"WO";
                break;
        }
        return (
          <Icon
            type={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={color}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy:true
  }
);
