import * as admin from 'firebase-admin';
import Promise from 'bluebird';

const DB = admin.database();
const usersREF = DB.ref('address-book/data/users');

const MAX_FIELD_LENGTH = 50;

const are20CharMax = (...fields) => {
  return fields.every(field => {
    return field.length <= MAX_FIELD_LENGTH;
  });
};

const getContact = (userId, contact) => {
  return usersREF.child(`${userId}/contacts/${contact}`).once('value', contactREF => {
    return contactREF.val();
  });
};

export const getContacts = userId => {
  return new Promise(resolve => {
    const userRef = usersREF.child(userId);
    userRef.once('value', snap => resolve(snap.val()));
  });
};

export const saveUserToFirebase = userId => {
  usersREF.child(userId).set({ contacts: '' });
  return;
};

export const addContact = (userId, { firstName, lastName, email }) => {
  if (!are20CharMax(firstName, lastName, email)) {
    return Promise.reject('Fields should not contain more than 20 characters');
  }

  const contactId = `${firstName} ${lastName}`;
  return getContact(userId, contactId).then(contactREF => {
    const hasContact = !!contactREF.val();
    if (hasContact) {
      return null;
    }

    if (!hasContact) {
      const contactRef = usersREF.child(`${userId}/contacts/${contactId}`);
      contactRef.set({ firstName, lastName, email });
      return contactRef.once('value', snap => {
        return snap.val();
      });
    }
  });
};

export const deleteContact = (userId, { firstName, lastName }) => {
  return new Promise((resolve, reject) => {
    const contactsRef = usersREF.child(`${userId}/contacts`);
    const contactRef = contactsRef.child(`${firstName} ${lastName}`);
    contactRef.set(null);
    // Check if contact exists.
    /**
     * TODO: It should check if the user exists first.
     * Then it should delete the contact.
     */
    contactRef.once('value', snap => {
      return resolve(snap.val());
    });
  });
};
