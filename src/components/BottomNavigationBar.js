import {
    Button,
    Text,
    Footer,
    FooterTab
} from "native-base";
import React from 'react'
import compose from 'recompose/compose'

class ButtonNavigationBar extends React.Component {
    render() {
        const {navigate, state: { routes, index }} = this.props.navigation;
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        active={ routes[index].routeName === "Profile" }
                        onPress={() => navigate("Profile")}
                    >
                        {/*<Icon name="bowtie" />*/}
                        <Text>Profile</Text>
                    </Button>
                    <Button
                        vertical
                        active={ routes[index].routeName === "Home" }
                        onPress={() => navigate("Home")}
                    >
                        {/*<Icon name="briefcase"/>*/}
                        <Text>Minder</Text>
                    </Button>
                    <Button
                        vertical
                        active={ routes[index].routeName ===  "Match" }
                        onPress={() => navigate("Match")}
                    >
                        {/*<Icon name="headset"/>*/}
                        <Text>My Match</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

export default compose()(ButtonNavigationBar)