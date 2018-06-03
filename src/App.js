import React from 'react'
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import {StyleSheet} from 'react-native'
import ContextProvider from "./context/withContext"
import { Login, Home, TestPage, Profile } from "./views"
import _ from "lodash";
import {compose} from "recompose";
import Header from "./components/Header";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-between',
    }
});


class App extends React.Component {

    state = {
        currentUser: null,
        loading: false,
        authenticated: false,
        appBarTitle: "",
        currentPage: ""

    };

    componentWillMount() {
        this.state.loading = true;
    }


    updateState = (nextState, cb) => {
        this.setState({
            ..._.pick(nextState, Object.keys(this.state))
        }, cb)
    };

    render() {
        return (
            <ContextProvider state={{context: this.state, setContext: this.updateState}}>
                <SafeAreaView style={styles.container}>
                    {/*<AppNavigator />*/}
                    <Header />
                </SafeAreaView>
            </ContextProvider>
        )
    }
}

const AppNavigator = createSwitchNavigator({
    Login,
    Home,
    Test: TestPage,
    Profile
}, {
    initialRouteName: 'Login'
});

export default compose()(App);