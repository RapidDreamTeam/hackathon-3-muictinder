import React from "react";
import {StyleSheet, Dimensions} from 'react-native'
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import {
    Container,
    Text,
    Header,
    Thumbnail,
    Content,
    Separator,
    ListItem
} from 'native-base'
const {height} = Dimensions.get('window');

class Profile extends React.Component {

    static navigationOptions = {
        title: 'My Profile',
        currentPage: "PROFILE"
    };

    state = {
    };

    updateData = (data) => {

    };

    render() {
        const { currentUser: { photo, firstname, lastname, bio, displayname, uid } } = this.props.context;
        const {modalVisible} = this.state;

        if  (this.props.context.currentUser === null || uid === null) {
            console.log("should not be null", uid);
            return (null)
        }else {
            console.log("its not null")
        }

        return (
            <Container>
                <Header noShadow style={styles.header}>
                    <Text>Profile</Text>
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

export default compose(withContext)(Profile)