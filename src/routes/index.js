import { Login, Home, TestPage, Profile, Match, MatchProfile } from "../views"
import {ButtomNavigationBar} from '../components'
import React from 'react'
import AuthenticationLoading from './AuthenticationLoading';
import {createSwitchNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation'

const ProfileRoute = createStackNavigator(
  {
      MatchProfile,
      Match

  },
  {
    initialRouteName: "Match",
    headerMode: 'none'
  }
);

const AuthenticatedRoute  = createBottomTabNavigator(
    {
        Home,Profile, ProfileRoute
    },
    {
        initialRouteName: "Home",
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <ButtomNavigationBar {...props}/>
            );
        }
    }

);

const UnauthenticatedRoute = createStackNavigator({
    Login
});

export default createSwitchNavigator(
    {
        AuthenticatedRoute,
        UnauthenticatedRoute,
        AuthenticationLoading
    },
    {
        initialRouteName: 'AuthenticationLoading',
    }
)