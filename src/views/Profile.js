import React from "react";
import {StyleSheet} from 'react-native'
import {facebookLogout } from "../api/authentication/FacebookAuthentication";
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import {Container, Text, Button} from 'native-base'

class Profile extends React.Component {

    static propTypes = {

    };

    static navigationOptions = {
        title: 'My Profile',
        currentPage: "PROFILE"
    };

    logout = () => {
        facebookLogout();
    }

    render() {
        return (
            <Container >
                <Text>
                    This is Profile
                </Text>

                <Button block onPress={this.logout}>
                    <Text>Logout</Text>
                </Button>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default compose(withContext)(Profile)