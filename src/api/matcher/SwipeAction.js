import firebase from 'react-native-firebase';

export const onSwipedLeft = (cards) => async (idx) => {
  console.log('--SWIPE_LEFT--', idx);
};
export const onSwipedRight = (cards) => async (idx) => {
  console.log('--SWIPE_RIGHT--', idx, cards);
  const this_uid = firebase.auth().currentUser.uid;
  const partnerKey = cards[idx].key;
  const userRef = firebase.database().ref(`matches/${this_uid}/swipeRight`);
  userRef.push(partnerKey);
  firebase.database().ref(`matches/${partnerKey}/swipeRight`).once('value').then(snapshot => {
    const partnerMatches = snapshot.val();
    console.log('partnerMatches', partnerMatches);
    for (const k in partnerMatches) {
      const matched = partnerMatches[k];
      console.log('matched', k, matched);
      if (matched === this_uid) {
        firebase.database().ref(`matches/${this_uid}/matched`).push(partnerKey);
        firebase.database().ref(`matches/${partnerKey}/matched`).push(this_uid);
      }
    }
  });

};
export const onSwipedTop = (cards) => async (idx) => {
  console.log('--SWIPE_UP--', idx);
  const this_uid = firebase.auth().currentUser.uid;
  const partnerKey = cards[idx].key;
  const userRef = firebase.database().ref(`matches/${this_uid}/matched`);
  userRef.push(partnerKey);
  const partnerRef = firebase.database().ref(`matches/${partnerKey}/matched`);
  partnerRef.push(this_uid);
};
