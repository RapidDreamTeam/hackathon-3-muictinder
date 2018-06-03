import React from "react";
import {facebookLogout } from "../api/authentication/FacebookAuthentication";
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";

class Profile extends React.Component {

    static propTypes = {

    };

    static navigationOptions = {
        title: 'My Profile',
        currentPage: "PROFILE"
    };

    render() {
        return (null);
    }
}

export default compose(withContext)(Profile)