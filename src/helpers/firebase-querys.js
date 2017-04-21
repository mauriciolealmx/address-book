import * as admin from 'firebase-admin';
import Promise from 'bluebird';

const DB = admin.database();
const REF = DB.ref('address-book/data');
const MAX_FIELD_LENGTH = 50;

let are20CharMax = (...fields) => {
  return fields.every( (field) => {
    return field.length <= MAX_FIELD_LENGTH;
  });
}

let saveUserToFirebase = (email) => {
  let usersRef = REF.child('users');
  let userName = email.split('@')[0];
  usersRef.child(`${userName}`).set({ 'contacts': ''});
  return;
};

let doesExist = (userId) => {
  return new Promise(function(resolve) { 
    let userRef = REF.child(`users/${userId}`);
    userRef.once('value', function(snap) {
      return resolve(snap.val());
    });
  });
};

let addContact = (userId, { firstName, lastName, email }) => {
  return doesExist(userId).then( (doesExist) => {
    if (!doesExist) {
      return Promise.reject('Not Found');
    }
    let contactsRef = REF.child(`users/${userId}/contacts`);
    return new Promise(function(resolve, reject) {
      if (!are20CharMax(firstName, lastName, email)) {
        return reject('Fields should not contain more than 20 characters');
      }
      let contactRef = contactsRef.child(`${firstName} ${lastName}`);
      contactRef.set({ firstName, lastName, email });
      // Retrieve added contact.
      contactRef.on('value', function(snap) {
        return resolve(snap.val());
      });
    });
  });
};

export { saveUserToFirebase, addContact };