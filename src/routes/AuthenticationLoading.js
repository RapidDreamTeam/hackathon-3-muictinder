import React from 'react';
import {ActivityIndicator} from 'react-native'
import { onAuthStateChanged } from '../api/authentication/FacebookAuthentication'
import { onProfileChange, offProfileChange } from '../api/profile/ProfileManagement'
import { withContext } from "../context/withContext";
import {facebookLogout} from "../api/authentication/FacebookAuthentication";
import compose from 'recompose/compose'

class AuthenticationLoading extends React.Component {

    state = {
        loading: true
    };

    componentDidMount() {
        onAuthStateChanged((user) => {
            console.log("auth state change")
            if (!!user){
                onProfileChange(user.uid, (snapshot) => {
                    this.props.setContext({
                        currentUser: {...snapshot.val(), uid: snapshot.key},
                        authenticated: true,
                        loading: false,
                    }, () => console.log("profile updated", this.props.context));
                }, this.authenticated);
            } else {
                if (!!this.props.context.currentUser){
                    offProfileChange(this.props.context.currentUser.uid , () => {
                        this.props.setContext({
                            authenticated: false,
                            loading: false,
                            currentUser: null
                        })
                    });
                }
                this.unauthenticated();
            }
            this.setState({
                loading: false
            });
        })
    };

    authenticated = () => {
        this.props.navigation.navigate("AuthenticatedRoute")
    };

    unauthenticated = () => {
        this.props.navigation.navigate("UnauthenticatedRoute");
        facebookLogout();
    };

    render() {
        return (
            <ActivityIndicator />
        )
    }
}

export default compose(withContext)(AuthenticationLoading);
