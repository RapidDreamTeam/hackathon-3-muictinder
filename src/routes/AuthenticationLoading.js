import React from 'react';
import {ActivityIndicator} from 'react-native'
import { onAuthStateChanged } from '../api/authentication/FacebookAuthentication'
import { onProfileChange, offProfileChange } from '../api/profile/ProfileManagement'
import { withContext } from "../context/withContext";
import compose from 'recompose/compose'

class AuthenticationLoading extends React.Component {

    componentDidMount() {
        onAuthStateChanged((user) => {
            if (!!user){

                onProfileChange(user.uid, (snapshot) => {

                    this.props.setContext({
                        currentUser: snapshot.val()
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
        })
    };

    authenticated = () => {
        this.props.navigation.navigate("AuthenticatedRoute")
    };

    unauthenticated = () => {
        this.props.navigation.navigate("UnauthenticatedRoute")
    };

    render() {
        return (
            <ActivityIndicator />
        )
    }
}

export default compose(withContext)(AuthenticationLoading);
