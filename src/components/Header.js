import React from 'react'
import {Header} from 'react-native-elements'
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";

class HeaderBar extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <Header
                leftComponent={{ icon: "user-o", type: "font-awesome", color: "white" }}
                centerComponent={{ text: 'MY TITLE', style: { color: "white" } }}
                rightComponent={{ icon: 'home', color: '#fff', type: "font-awesome" }}>
                { children }
            </Header>
        )
    }
}

export default compose(withContext)(HeaderBar);