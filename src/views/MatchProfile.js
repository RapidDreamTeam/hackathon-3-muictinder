import React from "react";
import {StyleSheet, Dimensions, TouchableOpacity, Linking, Alert} from 'react-native'
import {getProfile} from "../api/profile/ProfileManagement";
import {
    Container,
    Text,
    Header,
    Thumbnail,
    Content,
    Separator,
    ListItem, Left, Right, Body
} from 'native-base'
const {height} = Dimensions.get('window');

class MatchProfile extends React.Component {

    state = {
        profile: null
    };

    componentDidMount(){
        // this.props.navigation.addListener('focus', (status: boolean) => {
            // do something;
            const { uid } = this.props.navigation.state.params;
            console.log("view", uid);
            getProfile(uid)
                .then(data => {
                    console.log(data.val());
                    this.setState({
                        profile: data.val()
                    })
                })
        // });

    }

    notice = (fbid) => () => {
        Alert.alert(
            'Notice',
            `Facebook have banned profile page redirection on mobile platform. To view this user\'s profile this link on your computer facebook.com/${fbid}`,
            [
                {text: 'OK', onPress: this.linkFacebook(fbid)},
            ],
            { cancelable: false }
        )
    }

    linkFacebook = (fbid) => () =>{
        const fbappurl  = `fb://profile/${fbid}`;
        const fbweburl = `https://www.facebook.com/${fbid}`;



        Linking.canOpenURL(fbappurl).then(supported => {
            if (!supported) {
                console.log("Opening in browser", fbweburl);
                return Linking.openURL(fbweburl);
            } else {
                console.log("Opening in native app", fbappurl);

                return Linking.openURL(fbappurl);
            }
        }).catch(err => console.error('An error occurred', err));
    };


    render() {
        if (this.state.profile === null){
            return (null)
        }

        const { photo, firstname, lastname, bio, displayname, facebookid} = this.state.profile;
        const { from } = this.props.navigation.state.params;
        return (
            <Container style={{backgroundColor: "white"}}>
                <Header noShadow style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text>Match</Text>
                    </Body>

                    <Right>
                    </Right>
                </Header>
                <Container style={styles.container}>
                    <Container style={styles.bioContainer}>
                        <Thumbnail circular style={{marginBottom: "8%" }} large source={{uri: photo}} />
                        <Text>{`${displayname || "-"}`}</Text>
                    </Container>
                    <Content>
                        <Separator>
                            <Text>First Name</Text>
                        </Separator>

                        <ListItem >
                            <Text>{firstname || "-"}</Text>
                        </ListItem>

                        <Separator>
                            <Text>Last Name</Text>
                        </Separator>

                        <ListItem>
                            <Text>{lastname || "-"}</Text>
                        </ListItem>

                        <Separator>
                            <Text>Bio</Text>
                        </Separator>
                        <ListItem>
                            <Text>{bio || "-"}</Text>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={this.notice(facebookid)}>
                                <Text>Open Profile</Text>
                            </TouchableOpacity>
                        </ListItem>
                    </Content>
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {

    },
    container: {
        paddingLeft: '3%',
        paddingRight: '3%',

    },
    bioContainer: {
        flex: 1,
        marginTop: "15%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        backgroundColor: 'white'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
    },
    modalContent: {
        padding: 22,
        alignItems: 'center'
    },
    buttonContent: {
        justifyContent: 'flex-end',
    },
    bioText: {
        height: height * 0.2,
        paddingBottom: height * 0.001,
        marginTop: height * 0.005,
        marginBottom: height * 0.01,
    }

});

export default MatchProfile;