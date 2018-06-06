import firebase from 'react-native-firebase';

export const fetchCards = async () => {
  // get i cards from db

  const uid = firebase.auth().currentUser.uid;
  return firebase.database().ref('users').once('value').then( (snapshot) => {
    // console.log(snapshot.val());
    let cards = [];
    let filter = [];
    snapshot.forEach( e => {
      //console.log('user: ', e.val());
      if (e.key !== uid)
        cards = cards.concat({ key: e.key, name: e.val().displayname, photo: e.val().photo });
      else {
        const user = e.val();
        for (const key in user.swipeRight) {
          console.log(user.swipeRight[key]);
          filter = filter.concat(user.swipeRight[key]);
        }
        for (const key in user.instantMatch) {
          console.log(user.instantMatch[key]);
          filter = filter.concat(user.instantMatch[key]);
        }
      }
    });
    // console.log(cards);
    const filterSet = new Set(filter);
    cards.filter( (e) => {filterSet.has(e.key)});
    return cards;
  })
};