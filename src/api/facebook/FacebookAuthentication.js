import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'


export const facebookLogin = async () => {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
        throw new Error('User cancelled request');
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    return await firebase.auth().signInAndRetrieveDataWithCredential(credential);
};

export const facebookLogout = async () => {

}