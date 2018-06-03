import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'


export const facebookLogin = async (credentials=['public_profile', 'email']) => {
    const result = await LoginManager.logInWithReadPermissions(credentials);

    if (result.isCancelled) {
        throw new Error('User cancelled request');
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
};

export const facebookLogout = async () => {
    return firebase.auth().signOut();
};

export const onAuthStateChanged = (cb) => {
    firebase.auth().onAuthStateChanged(cb);
};