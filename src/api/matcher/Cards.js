import firebase from 'react-native-firebase';
import _ from 'lodash';

export const fetchCards = async () => {

  const uid = firebase.auth().currentUser.uid;
  const matchesRef = firebase.database().ref('');
  return firebase.database().ref('').once('value').then( (snapshot) => {
    console.log(snapshot.val());
    const users = snapshot.val()['users'];
    const matches = snapshot.val()['matches'] || {};
    console.log('these', matches, users);
    let cards = [];
    let filter = [];
    for (const k in users) {
      if (!users.hasOwnProperty(k))
        continue;
      const e = users[k];
      console.log(e);
      console.log('user: ', k);
      if (k !== uid)
        cards = cards.concat({ key: k, name: e.displayname, uid: e.facebookid });
      else {
        console.log('else');
        if (matches.hasOwnProperty(k)) {
          console.log('matches', matches[k]);
          if (matches[k].hasOwnProperty('swipeRight')) {
            console.log('right here');
            for (const key in matches[k]['swipeRight']) {
              console.log('right', matches[k]['swipeRight'][key]);
              filter = filter.concat(matches[k]['swipeRight'][key]);
            }
          }
          if (matches[k].hasOwnProperty('matched')) {
            console.log('matched here');
            for (const key in matches[k]['matched']) {
              console.log('matched', matches[k]['matched'][key]);
              filter = filter.concat(matches[k]['matched'][key]);
            }
          }
        } else {
          console.log('nop');
        }
      }
    }
    console.log('cards', cards, filter);
    const filterSet = new Set(filter);

    // const tmp = cards.filter( (e) => {console.log(e, e.key, filterSet.has(e.key)); return filterSet.has(e.key);});
    _.remove(cards, (e) => filterSet.has(e.key));
    console.log('c', cards);
    return cards;
  })
};