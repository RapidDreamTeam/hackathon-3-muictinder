import firebase from 'react-native-firebase'

export const createProfileIfNotExist = (currentUser) => {

    const {additionalUserInfo: {profile: {first_name, last_name, name: display_name}}, user: { uid, photoURL }} = currentUser;

    const userRef = firebase.database().ref(`users/${uid}`);
    userRef.transaction(currentData => {
        const data = {};
        if (currentData === null){
            data.matches = [];
        }

        console.log("inside transaction")

        return {
            photo: photoURL,
            firstname: first_name,
            lastname: last_name,
            displayname: display_name
        }
    })
};

export const getMyProfile = async (user) => {

};

export const getProfile = async (id) => {

};