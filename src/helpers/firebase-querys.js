import * as admin from 'firebase-admin';
import Promise from 'bluebird';

const DB = admin.database();
const REF = DB.ref('address-book/data');

let saveUserToFirebase = (email) => {
  let usersRef = REF.child('users');
  let userName = email.split('@')[0];
  usersRef.child(`${userName}`).set({ 'contacts': ''});
  return;
};

let addContact = (userId, { firstName, lastName, email }) => {
  let contactsRef = REF.child(`users/${userId}/contacts`);
  return new Promise(function(resolve) {

    let contactRef = contactsRef.child(`${firstName} ${lastName}`);
    contactRef.set({ firstName, lastName, email });

    // Retrieve added contact.
    contactRef.on('value', function(snap) {
      return resolve(snap.val());
    });
  });
};

export { saveUserToFirebase, addContact };