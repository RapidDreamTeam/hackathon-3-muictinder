import { Login, Home, TestPage, Profile } from "../views"
import AuthenticationLoading from './AuthenticationLoading';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation'

const AuthenticatedRoute  = createStackNavigator({
    Home, Profile
});

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