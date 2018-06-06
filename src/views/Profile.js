import React from "react";
import {StyleSheet} from 'react-native'
import {facebookLogout } from "../api/authentication/FacebookAuthentication";
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import {Container, Text, Button, Header, Thumbnail} from 'native-base'

const ClickableButton = ({onPress, children, ...rest}) => (
    <Button block {...rest} style={{marginTop: "2%", marginBottom: "2%"}} onPress={onPress}>
        <Text>{children}</Text>
    </Button>
);

// const UpdateBioPage = () => {
//     return (
//
//     )
// }

class Profile extends React.Component {

    static navigationOptions = {
        title: 'My Profile',
        currentPage: "PROFILE"
    };

    render() {
        const { currentUser: { photo, firstname, lastname } } = this.props.context;
        console.log(this.props.context.currentUser);
        if  (this.props.context.currentUser === null ){
            return (null)
        }
        return (
            <Container>
                <Header noShadow style={styles.header}>
                    <Text>My Profile</Text>
                </Header>
                <Container style={styles.container}>

                    <Container style={styles.bioContainer}>
                        <Thumbnail circular style={{marginBottom: "8%"}} large source={{uri: photo}} />
                        <Text>{`${firstname} ${lastname}`}</Text>
                    </Container>



                    <ClickableButton onPress={facebookLogout}>
                        Edit Profile
                    </ClickableButton>
                    <ClickableButton onPress={facebookLogout} danger>
                        Logout
                    </ClickableButton>
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

})

export default compose(withContext)(Profile)