import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {facebookLogin} from "../api/authentication/FacebookAuthentication";
import {createProfileIfNotExist } from "../api/profile/ProfileManagement"
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import {View} from 'react-native'
import { Container, Header, Content, Button, Text } from 'native-base';


type Props = {};

class Login extends Component<Props> {

    static navigationOptions = {
        title: 'Login',
    };

  facebookLoginHandler = async () => {
      try {
          const currentUser = await facebookLogin();

          this.props.setContext({
              currentUser: currentUser,
              authenticated: true,
              loading: false
          }, () => {
              // console.log("b", currentUser)
              createProfileIfNotExist(currentUser)
          })
      } catch (e) {
          this.props.setContext({
              currentUser: null,
              authenticated: false,
              loading: false
          })

      }
  };

  render() {
    return (
       <Container style={styles.container}>
            <Button block onPress={this.facebookLoginHandler} >
                <Text>Login with Facebook</Text>
            </Button>
        </Container>
    );
  }
}

export default compose(withContext)(Login);


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    }
})