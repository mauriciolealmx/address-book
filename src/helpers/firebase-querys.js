import * as admin from 'firebase-admin';
import Promise from 'bluebird';

const DB = admin.database();
const REF = DB.ref('address-book/data');
const MAX_FIELD_LENGTH = 50;

const are20CharMax = (...fields) => {
  return fields.every(field => {
    return field.length <= MAX_FIELD_LENGTH;
  });
};

const saveUserToFirebase = userId => {
  const usersRef = REF.child('users');
  usersRef.child(`${userId}`).set({ contacts: '' });
  return;
};

const doesExist = userId => {
  return new Promise(resolve => {
    const userRef = REF.child(`users/${userId}`);
    userRef.once('value', snap => {
      return resolve(snap.val());
    });
  });
};

const addContact = (userId, { firstName, lastName, email }) => {
  const contactsRef = REF.child(`users/${userId}/contacts`);
  return new Promise((resolve, reject) => {
    if (!are20CharMax(firstName, lastName, email)) {
      return reject('Fields should not contain more than 20 characters');
    }
    const contactRef = contactsRef.child(`${firstName} ${lastName}`);
    contactRef.set({ firstName, lastName, email });
    // Retrieve added contact.
    contactRef.on('value', snap => {
      return resolve(snap.val());
    });
  });
};

export { saveUserToFirebase, addContact };
