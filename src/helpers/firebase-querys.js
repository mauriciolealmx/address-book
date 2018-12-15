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

export const getContacts = userId => {
  return new Promise(resolve => {
    const userRef = REF.child(`users/${userId}`);
    userRef.once('value', snap => resolve(snap.val()));
  });
};

export const saveUserToFirebase = userId => {
  const usersRef = REF.child('users');
  usersRef.child(`${userId}`).set({ contacts: '' });
  return;
};

export const addContact = (userId, { firstName, lastName, email }) => {
  return new Promise((resolve, reject) => {
    if (!are20CharMax(firstName, lastName, email)) {
      return reject('Fields should not contain more than 20 characters');
    }
    // At the moment userId is the ID created by postgreSQL.
    const contactsRef = REF.child(`users/${userId}/contacts`);
    const contactRef = contactsRef.child(`${firstName} ${lastName}`);
    contactRef.set({ firstName, lastName, email });
    // Retrieve added contact.
    contactRef.on('value', snap => {
      return resolve(snap.val());
    });
  });
};
