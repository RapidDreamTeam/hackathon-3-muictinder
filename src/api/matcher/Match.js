import firebase from 'react-native-firebase'

export const subscribeMyMatch = async (uid, cb) => {
    console.log('submymatch');
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
};

// export const onMatchChange = (uid, cb, cbb) => {
//     console.log("uid", uid);
//     firebase.database().ref(`matches/${uid}/matched`).on("value", cb);
//     cbb !== null && cbb();
// };
//
// export const offMatchChange = (uid, cb) => {
//     firebase.database().ref(`matches/${uid}/matched`).off("value", cb);
// };