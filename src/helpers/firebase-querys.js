import * as admin from 'firebase-admin';


const DB = admin.database();
const USER_REF = DB.ref('address-book/data/users');

const MAX_FIELD_LENGTH = 50;

const are20CharMax = (...fields) => fields.every(field => field.length <= MAX_FIELD_LENGTH);

const getUserRef = userId => USER_REF.child(userId);

const getContactsRef = userId => getUserRef(userId).child('contacts');

const getContactRef = (userId, contactId) => getContactsRef(userId).child(contactId);

export const getContacts = (userId, callback) => getContactsRef(userId).once('value', snap => callback(snap.val()));

export const saveUserToFirebase = (userId, callback) => {
  const userRef = getUserRef(userId);
  userRef.set({ contacts: '' });
  // Make sure userId was created in Firebase.
  userRef.once('value', userSnap => {
    userSnap.exists() ? callback(null, userSnap.val()) : callback({ error: 'User not saved in Firebase' });
  });
};

export const addContact = (userId, { firstName, lastName, email }, callback) => {
  if (!are20CharMax(firstName, lastName, email)) {
    return callback({ error: 'Fields should not contain more than 20 characters' });
  }

  const contactId = `${firstName} ${lastName}`;
  const contactRef = getContactRef(userId, contactId);
  contactRef.once('value', contactSnap => {
    const hasContact = contactSnap.exists();
    if (hasContact) {
      return callback({ error: 'Contact already existst' });
    }

    if (!hasContact) {
      contactRef.set({ firstName, lastName, email });
      contactRef.once('value', contactSnap => {
        return contactSnap.exists()
          ? callback(null, contactSnap)
          : callback({ error: 'Contact was not created in Firebase' });
      });
    }
  });
};

export const deleteContact = (userId, { firstName, lastName }, callback) => {
  const contactId = `${firstName} ${lastName}`;
  const contactRef = getContactRef(userId, contactId);
  contactRef.once('value', contactSnap => {
    if (contactSnap.exists()) {
      contactRef.set(null);
      return callback(null);
    }
    return callback({ error: 'Contact does not exist' });
  });
};
