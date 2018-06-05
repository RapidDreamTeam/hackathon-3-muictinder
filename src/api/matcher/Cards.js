import firebase from 'react-native-firebase';

export const fetchCards = async (i) => {
  // get i cards from db
  return firebase.database().ref().once('value').then( (snapshot) => {
    console.log(snapshot.val());
    snapshot.forEach( e => {
      console.log(e.val());
    })
  })
};