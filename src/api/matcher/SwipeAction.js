import firebase from 'react-native-firebase';

export const onSwipedLeft = (cards) => async (idx) => {
  console.log('--SWIPE_LEFT--', idx);
};
export const onSwipedRight = (cards) => async (idx) => {
  console.log('--SWIPE_RIGHT--', idx);
  const this_uid = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref(`matches/${this_uid}/swipeRight`);
  userRef.push(cards[idx].key);
};
export const onSwipedTop = (cards) => async (idx) => {
  console.log('--SWIPE_UP--', idx);
  const this_uid = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref(`matches/${this_uid}/instantMatch`);
  userRef.push(cards[idx].key);
};
