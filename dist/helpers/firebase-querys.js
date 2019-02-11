'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteContact = exports.addContact = exports.saveUserToFirebase = exports.getContacts = undefined;

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DB = admin.database();
var USER_REF = DB.ref('address-book/data/users');

var MAX_FIELD_LENGTH = 50;

var are20CharMax = function are20CharMax() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return fields.every(function (field) {
    return field.length <= MAX_FIELD_LENGTH;
  });
};

var getUserRef = function getUserRef(userId) {
  return USER_REF.child(userId);
};

var getContactsRef = function getContactsRef(userId) {
  return getUserRef(userId).child('contacts');
};

var getContactRef = function getContactRef(userId, contactId) {
  return getContactsRef(userId).child(contactId);
};

var getContacts = exports.getContacts = function getContacts(userId, callback) {
  return getContactsRef(userId).once('value', function (snap) {
    return callback(snap.val());
  });
};

var saveUserToFirebase = exports.saveUserToFirebase = function saveUserToFirebase(userId, callback) {
  var userRef = getUserRef(userId);
  userRef.set({ contacts: '' });
  // Make sure userId was created in Firebase.
  userRef.once('value', function (userSnap) {
    userSnap.exists() ? callback(null, userSnap.val()) : callback({ error: 'User not saved in Firebase' });
  });
};

var addContact = exports.addContact = function addContact(userId, _ref, callback) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email;

  if (!are20CharMax(firstName, lastName, email)) {
    return callback({ error: 'Fields should not contain more than 20 characters' });
  }

  var contactId = firstName + ' ' + lastName;
  var contactRef = getContactRef(userId, contactId);
  contactRef.once('value', function (contactSnap) {
    var hasContact = contactSnap.exists();
    if (hasContact) {
      return callback({ error: 'Contact already existst' });
    }

    if (!hasContact) {
      contactRef.set({ firstName: firstName, lastName: lastName, email: email });
      contactRef.once('value', function (contactSnap) {
        return contactSnap.exists() ? callback(null, contactSnap) : callback({ error: 'Contact was not created in Firebase' });
      });
    }
  });
};

var deleteContact = exports.deleteContact = function deleteContact(userId, _ref2, callback) {
  var firstName = _ref2.firstName,
      lastName = _ref2.lastName;

  var contactId = firstName + ' ' + lastName;
  var contactRef = getContactRef(userId, contactId);
  contactRef.once('value', function (contactSnap) {
    if (contactSnap.exists()) {
      contactRef.set(null);
      return callback(null);
    }
    return callback({ error: 'Contact does not exist' });
  });
};