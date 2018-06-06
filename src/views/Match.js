import {withContext} from "../context/withContext";
import React from 'react';
import {Text, Container} from 'native-base';
import compose from "recompose/compose";


class MyMatch extends React.Component {
    state = {

    };



    render() {
        if  (this.props.context.currentUser === null ){
            return (null)
        }
        return (
            <Container>
                <Text>
                    This is My Match
                </Text>
            </Container>
        )
    }
}

export default compose(withContext) (MyMatch)