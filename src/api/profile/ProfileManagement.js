import firebase from 'react-native-firebase'
import {
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const createProfileIfNotExist = (currentUser) => {
    console.log(currentUser);
    const {additionalUserInfo: {profile: {first_name, last_name, name: display_name, id}}, user: { uid, photoURL }} = currentUser;
    console.log(id);
    const userRef = firebase.database().ref(`users/${uid}`);
    console.log(photoURL, uid);
    userRef.transaction(currentData => {
        if (currentData === null){
            console.log('new');
            const photoRequest = new GraphRequest('/' + id + '/picture?type=large&redirect=false', null, (error: ?Object, result: ?Object) => {
                if (error) {
                    console.log('error getting image');
                } else {
                    const photoURL = result.data.url;
                    firebase.database().ref(`users/${uid}/photo`).set(photoURL);
                    console.log('res', photoURL);
                }
            });
            console.log('request created');
            new GraphRequestManager().addRequest(photoRequest).start();
            console.log('started');
            return {
                firstname: first_name,
                lastname: last_name,
                displayname: display_name
            }
        }
    });
    console.log('transaction complete');
};

export const getMyProfile = async (currentUser) => {
//     const {user: {uid}} = currentUser;
//     const userRef = firebase.database().ref(`users/${uid}`);
// //
};

export const getProfile = async (id) => {

};