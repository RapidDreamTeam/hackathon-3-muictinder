import firebase from 'react-native-firebase'

export const subscribeMyMatch = async (uid, cb) => {
    if (uid === null){
        throw new Error("UID is null");
    }
    return firebase.database().ref(`matches/${uid}/matched`).on('value', cb);
};

export const unsubscribeMyMatch = async (uid) => {
    if (uid === null){
        throw new Error("UID is null");
    }

    return firebase.database().ref(`matches/${uid}/matched`).off()
}