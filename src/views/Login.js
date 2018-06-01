/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { Container, Button, Text } from 'native-base';


type Props = {};

class Login extends Component<Props> {

  facebookLoginHandler = async () => {
      try {
          const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

          if (result.isCancelled) {
              throw new Error('User cancelled request');
          }

          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
          const data = await AccessToken.getCurrentAccessToken();

          if (!data) {
              throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
          }
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
          console.info(JSON.stringify(currentUser.user.toJSON()))
      } catch (e) {
          console.error(e);
      }
  };


  render() {
    return (
        <Container>
            <Button onPress={this.facebookLoginHandler}>
                <Text>
                    Login With Facebook
                </Text>
            </Button>
        </Container>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
