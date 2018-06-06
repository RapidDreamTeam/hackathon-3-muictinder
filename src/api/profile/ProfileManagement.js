import firebase from 'react-native-firebase'

export const createProfileIfNotExist = (currentUser) => {

    const {additionalUserInfo: {profile: {first_name, last_name, name: display_name, id}}, user: { uid, photoURL }} = currentUser;

    const userRef = firebase.database().ref(`users/${uid}`);
    userRef.transaction(currentData => {
        if (currentData === null){
            return {
                photo: photoURL,
                firstname: first_name,
                lastname: last_name,
                facebookid: id,
                displayname: display_name,
                bio: ""
            }
        }
    })
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