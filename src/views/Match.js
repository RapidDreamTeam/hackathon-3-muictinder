import {withContext} from "../context/withContext";
import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import compose from "recompose/compose";
import firebase from "react-native-firebase";

class MyMatch extends React.Component {
    state = {
        matches: []
    };

    componentDidMount() {
        firebase.database().ref('').once('value').then( snapshot => {
            const uid = firebase.auth().currentUser.uid;
            const store = snapshot.val();
            let matchList = [];
            if (store.hasOwnProperty('matches')) {
                if (store.matches.hasOwnProperty(uid) && store.matches[uid].hasOwnProperty('matched')) {
                    const matches = store.matches[uid]['matched'];
                    for (const k in matches) {
                        if (matches.hasOwnProperty(k)) {
                            const matchedUID = matches[k];
                            const {displayname, photo, bio} = store.users[matchedUID];
                            matchList = matchList.concat({key: matchedUID, displayname: displayname, photo: photo, bio});
                        }
                    }
                }
                this.setState({matches: matchList});
            }
        })
    }

    render() {
        if  (this.props.context.currentUser === null ){
            return (null)
        }
        return (
            <Container>
                <Header style={{backgroundColor: 'white'}}>
                    <Left>
                    </Left>
                    <Body>
                        <Text>My Match</Text>
                    </Body>
                    <Right/>
                </Header>
              <Content>
                <List>
                  {
                      this.state.matches.map((match) =>
                        <ListItem avatar key={match.key} onPress={() => this.props.navigation.navigate("MatchProfile", {uid: match.key, from: "Match"})}>
                            <Left>
                                <Thumbnail source={{uri: match.photo}} />
                            </Left>
                            <Body>
                                <Text>{match.displayname}</Text>
                                <Text note>{match.bio.toString().length > 30 ? match.bio.toString().substring(0, 30) + "....." : match.bio}</Text>
                            </Body>
                            <Right>
                            </Right>
                        </ListItem>
                      )
                  }
              </List>
            </Content>
          </Container>
        );
    }
}

export default compose(withContext) (MyMatch)