import React from "react";
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
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
    }

    componentDidMount(){
        const { uid, from } = this.props.navigation.state.params;
        getProfile(uid)
            .then(data => {
                console.log(data.val());
                this.setState({
                    profile: data.val()
                })
            })
    }


    render() {
        if (this.state.profile === null){
            return (null)
        }

        const { photo, firstname, lastname, bio, displayname } = this.state.profile;
        const { from } = this.props.navigation.state.params;
        return (
            <Container style={{backgroundColor: "white"}}>
                <Header noShadow style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(from)}>
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