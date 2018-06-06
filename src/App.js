import React from 'react'
import {SafeAreaView} from 'react-navigation';
import {StyleSheet, View} from 'react-native'
import ContextProvider from "./context/withContext"
import {Container} from 'native-base';
import _ from "lodash";
import {compose} from "recompose";
import Routes from "./routes";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    container: {
        paddingLeft: '0%',
        paddingRight: '0%',
        backgroundColor: "white"
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
        console.log("update next state", ..._.pick(nextState, Object.keys(this.state)));
        this.setState({
            ..._.pick(nextState, Object.keys(this.state))
        }, cb);
    };

    render() {
        return (
            <ContextProvider state={{context: this.state, setContext: this.updateState}}>
                <SafeAreaView style={styles.safeArea}>
                    <Routes />
                </SafeAreaView>
            </ContextProvider>
        )
    }
}

export default compose()(App);
