import { Login, Home, TestPage, Profile, Match } from "../views"
import React from 'react'
import AuthenticationLoading from './AuthenticationLoading';
import {createSwitchNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import {
    Button,
    Text,
    Icon,
    Footer,
    FooterTab
} from "native-base";

const AuthenticatedRoute  = createBottomTabNavigator(
    {
        Home, Profile, Match
    },
    {
        initialRoute: "Home",
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            console.log("Props",props);

            const {state: { routeName }} = props.navigation;


            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={ routeName === "Profile" }
                            onPress={() => props.navigation.navigate("Profile")}
                        >
                            <Icon name="bowtie" />
                            <Text>Profile</Text>
                        </Button>
                        <Button
                            vertical
                            active={ routeName === "Home"}
                            onPress={() => props.navigation.navigate("Home")}
                        >
                            {/*<Icon name="briefcase"/>*/}
                            <Text>Minder</Text>
                        </Button>
                        <Button
                            vertical
                            active={ routeName === "Match" }
                            onPress={() => props.navigation.navigate("Match")}
                        >
                            {/*<Icon name="headset"/>*/}
                            <Text>My Match</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }

);

const UnauthenticatedRoute = createStackNavigator({
    Login
});

export default createSwitchNavigator(
    {
        AuthenticatedRoute,
        UnauthenticatedRoute,
        AuthenticationLoading
    },
    {
        initialRouteName: 'AuthenticationLoading',
    }
)