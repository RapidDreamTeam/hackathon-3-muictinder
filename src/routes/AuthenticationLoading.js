import React from 'react';
import {ActivityIndicator} from 'react-native'
import { onAuthStateChanged } from '../api/authentication/FacebookAuthentication'
import { withContext } from "../context/withContext";
import compose from 'recompose/compose'

class AuthenticationLoading extends React.Component {

    componentDidMount() {

        onAuthStateChanged((user) => {
            if (!!user){
                this.props.setContext({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                }, this.authenticated)
            } else {
                this.props.setContext({
                    authenticated: false,
                    loading: false,
                    currentUser: null
                }, this.unauthenticated)
            }
        })
    };

    authenticated = () => {
        this.props.navigation.navigate("Home")
    };

    unauthenticated = () => {
        this.props.navigation.navigate("Login")
    };

    render() {
        return (
            <ActivityIndicator />
        )
    }
}

export default compose(withContext)(AuthenticationLoading);
