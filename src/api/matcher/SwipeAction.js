import firebase from 'react-native-firebase';

export const onSwipedLeft = async (idx) => {
  console.log('--SWIPE_LEFT--', idx);
};
export const onSwipedRight = async (idx) => {
  console.log('--SWIPE_RIGHT--', idx);
  const this_uid = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref(this_uid + '/swipeRight');
  userRef.push(idx);
};
export const onSwipedTop = async (idx) => {
  console.log('--SWIPE_UP--', idx);
  const this_uid = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref(this_uid + '/instantMatch');
  userRef.push(idx);
};
