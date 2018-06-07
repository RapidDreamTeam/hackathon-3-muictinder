import {withContext} from "../context/withContext";
import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import compose from "recompose/compose";
import firebase from "react-native-firebase";

class MyMatch extends React.Component {
    state = {

    };

    componentDidMount() {
        firebase.database().ref('matches').once('value').then( snapshot => {
            const uid = firebase.auth().currentUser.uid;
            const users = snapshot.val();
            let uids = [];
            if (users.hasOwnProperty(uid)) {
              const matches = users[uid]['matched'];
              for (const k in matches) {
                  const matchedUID = matches[k];
                uids = uids.concat(matches[k]);
              }
              console.log("hi ", uids);
            }
        })
    }

    render() {
        if  (this.props.context.currentUser === null ){
            return (null)
        }
        return (
          <Container>
            <Header />
            <Content>
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10211916806220903&height=200&width=200&ext=1528613743&hash=AeTvfL6iteXO51kZ' }} />
                  </Left>
                  <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note></Text>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
    }
}

export default compose(withContext) (MyMatch)