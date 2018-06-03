import React from "react";
import {Text} from 'react-native'
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";

const TestPage = () => {

    return (
        <Text>This is a Test</Text>
    )

};

TestPage.navigationOptions = {
    title: 'My Profile',
    currentPage: "PROFILE"
};


export default compose(withContext)(TestPage);