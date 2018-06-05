import firebase from 'react-native-firebase';

export const fetchCards = async (i) => {
  // get i cards from db

  const uid = firebase.auth().currentUser.uid;
  return firebase.database().ref('users').once('value').then( (snapshot) => {
    // console.log(snapshot.val());
    let cards = [];
    snapshot.forEach( e => {
      //console.log('user: ', e.val());
      if (e.key !== uid)
        cards = cards.concat({ name: e.val().displayname, photo: e.val().photo });
    });
    // console.log(cards);
    return cards;
  })
};