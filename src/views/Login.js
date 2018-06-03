import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {facebookLogin} from "../api/authentication/FacebookAuthentication";
import { Button } from 'react-native-elements';

import compose from 'recompose/compose'
import {withContext} from "../context/withContext";

type Props = {};

class Login extends Component<Props> {

  facebookLoginHandler = async () => {
      try {
          const currentUser = facebookLogin();

          this.props.setContext({
              currentUser: await currentUser,
              authenticated: true,
              loading: false
          }, () => this.props.navigation.navigate("Home"))
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
        <Button onPress={this.facebookLoginHandler} title={'Login With Facebook'} rounded={true}
                activeOpacity={1}
                underlayColor="transparent"
                // buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
                // containerStyle={{marginVertical: 10}}
                buttonStyle={styles.signUpButton}
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                titleStyle={{fontWeight: 'bold', color: 'white'}}>
        </Button>
    );
  }
}

export default compose(withContext)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#293046',
        alignItems: 'center',
        justifyContent: 'space-around',
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
    signUpButton: {
        width: 250,
        borderRadius: 50,
        height: 45,
    }
});
