/**
 * @desc [Navigation导航相关Redux]
 */
import React from 'react';
import {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';
import { combineReducers } from 'redux';
import {RootNavigator} from "../navigation/RootNavigation"


 const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Login'));

 const navReducer = (state = initialState, action) => {
   const nextState = RootNavigator.router.getStateForAction(action, state);

   // Simply return the original `state` if `nextState` is null or undefined.
   return nextState || state;
 };



export default navReducer
