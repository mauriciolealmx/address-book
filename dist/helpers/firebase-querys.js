'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addContact = exports.saveUserToFirebase = undefined;

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DB = admin.database();
var REF = DB.ref('address-book/data');

var saveUserToFirebase = function saveUserToFirebase(email) {
  var usersRef = REF.child('users');
  var userName = email.split('@')[0];
  usersRef.child('' + userName).set({ 'contacts': '' });
  return;
};

var addContact = function addContact(userId, _ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email;

  var contactsRef = REF.child('users/' + userId + '/contacts');
  return new _bluebird2.default(function (resolve) {

    var contactRef = contactsRef.child(firstName + ' ' + lastName);
    contactRef.set({ firstName: firstName, lastName: lastName, email: email });

    // Retrieve added contact.
    contactRef.on('value', function (snap) {
      return resolve(snap.val());
    });
  });
};

exports.saveUserToFirebase = saveUserToFirebase;
exports.addContact = addContact;