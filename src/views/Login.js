/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import { Container, Button, Text } from 'native-base';


type Props = {};

class Login extends Component<Props> {

  facebookLoginHandler = async () => {
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
