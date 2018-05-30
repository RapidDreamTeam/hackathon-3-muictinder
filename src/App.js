import React from 'react'
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import {StyleSheet} from 'react-native'

import { Login, Home } from "./views"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-between',
    }
});


class App extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AppNavigator />
            </SafeAreaView>
        )
    }
}

const AppNavigator = createSwitchNavigator({
    Login, // This screen renders a navigator!
    Home,
}, {
    initialRouteName: 'Login'
});

export default App;