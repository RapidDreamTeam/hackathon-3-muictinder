import React from 'react'
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import { withNavigation } from 'react-navigation';


class HeaderBar extends React.Component {

    render() {
        const {children: Children, context: {appBarTitle}, ...rest} = this.props;
        return (null)
    }
}

export default compose(withContext, withNavigation)(HeaderBar);