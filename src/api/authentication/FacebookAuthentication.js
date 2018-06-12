import { AccessToken, LoginManager,  } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'


export const facebookLogin = async (permissions=['public_profile', 'email']) => {
    console.log('test');
    const result = await LoginManager.logInWithReadPermissions(permissions);

    console.log('res:',result);
    if (result.isCancelled) {
        throw new Error('User cancelled request');
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    console.log("credentials", credential);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
};

export const facebookLogout = async () => {
    LoginManager.logOut();
    return firebase.auth().signOut();
};

export const onAuthStateChanged = (cb) => {
    return firebase.auth().onAuthStateChanged(cb);
};