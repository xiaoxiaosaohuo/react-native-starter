import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation'
import HomeScreen from '../Views/HomeScreen';
import MineScreen from '../Views/MineScreen';
const homeStack = StackNavigator({
    Home: {
        screen: HomeScreen,

    },
    Detail: {
        screen: MineScreen,
        navigationOptions: (props) => ({
            title: "Detail",
            tabBarVisible: false
        })
    },

},{
    initialRouteName: 'Home',
})

export default homeStack;
