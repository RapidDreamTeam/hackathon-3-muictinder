import firebase from 'react-native-firebase';
import moment from 'moment';

export const onSwipedLeft = (cards) => async (idx) => {
  console.log('--SWIPE_LEFT--', idx);
};
export const onSwipedRight = (cards, onMatch) => async (idx) => {
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
        !!onMatch && onMatch(partnerKey);
        firebase.database().ref(`matches/${this_uid}/matched`).push(partnerKey);
        firebase.database().ref(`matches/${partnerKey}/matched`).push(this_uid);
      }
    }
  });
};
export const onSwipedTop = (cards, onMatch, onSwiped) => async (idx) => {
  console.log('--SWIPE_UP--', idx);
  const this_uid = firebase.auth().currentUser.uid;
  const partnerKey = cards[idx].key;
  !!onMatch && onMatch(partnerKey);
  firebase.database().ref(`matches/${this_uid}/matched`).push(partnerKey);
  firebase.database().ref(`matches/${partnerKey}/matched`).push(this_uid);
  firebase.database().ref(`matches/${this_uid}/lastSuper`).set(moment().unix());
  !!onSwiped && onSwiped();
};
