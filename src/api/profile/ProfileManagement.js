import firebase from 'react-native-firebase'
import {
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const createProfileIfNotExist = (currentUser) => {

    const {additionalUserInfo: {profile: {first_name, last_name, name: display_name, id}}, user: { uid, photoURL }} = currentUser;

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
                facebookid: id,
                displayname: display_name,
                bio: ""
            }
        }
    });
    console.log('transaction complete');
};

export const getProfile = async (uid) => {
    return firebase.database().ref(`users/${uid}`).once('value')
};

export const onProfileChange = (uid, cb, cbb) => {
    console.log("uid", uid);
    firebase.database().ref(`users/${uid}`).on("value", cb);
    cbb !== null && cbb();
};

export const offProfileChange = (uid, cb) => {
    firebase.database().ref(`users/${uid}`).off("value", cb);
}
;