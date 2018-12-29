'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteContact = exports.addContact = exports.saveUserToFirebase = exports.getContacts = undefined;

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DB = admin.database();
var REF = DB.ref('address-book/data');
var MAX_FIELD_LENGTH = 50;

var are20CharMax = function are20CharMax() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return fields.every(function (field) {
    return field.length <= MAX_FIELD_LENGTH;
  });
};

var getContacts = exports.getContacts = function getContacts(userId) {
  return new _bluebird2.default(function (resolve) {
    var userRef = REF.child('users/' + userId);
    userRef.once('value', function (snap) {
      return resolve(snap.val());
    });
  });
};

var saveUserToFirebase = exports.saveUserToFirebase = function saveUserToFirebase(userId) {
  var usersRef = REF.child('users');
  usersRef.child('' + userId).set({ contacts: '' });
  return;
};

var addContact = exports.addContact = function addContact(userId, _ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email;

  return new _bluebird2.default(function (resolve, reject) {
    if (!are20CharMax(firstName, lastName, email)) {
      return reject('Fields should not contain more than 20 characters');
    }
    var contactsRef = REF.child('users/' + userId + '/contacts');
    var contactRef = contactsRef.child(firstName + ' ' + lastName);
    contactRef.set({ firstName: firstName, lastName: lastName, email: email });
    // Retrieve added contact.
    contactRef.on('value', function (snap) {
      return resolve(snap.val());
    });
  });
};

var deleteContact = exports.deleteContact = function deleteContact(userId, _ref2) {
  var firstName = _ref2.firstName,
      lastName = _ref2.lastName;

  return new _bluebird2.default(function (resolve, reject) {
    var contactsRef = REF.child('users/' + userId + '/contacts');
    var contactRef = contactsRef.child(firstName + ' ' + lastName);
    contactRef.set(null);
    // Check if contact exists.
    /**
     * TODO: It should check if the user exists first.
     * Then it should delete the contact.
     */
    contactRef.on('value', function (snap) {
      return resolve(snap.val());
    });
  });
};