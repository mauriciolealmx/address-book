'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jwtToken = require('../middlewares/jwt-token');

var _cryptoUtils = require('../helpers/crypto-utils');

var _postgresQuerys = require('../helpers/postgres-querys');

var _firebaseQuerys = require('../helpers/firebase-querys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_MISSING = 'is missing';
var NOT_VALID = 'is not valid';
var KEY = process.env.KEY || _config2.default.key;

var getEmailId = function getEmailId(email) {
  return email.split('@')[0];
};

var isValidPassword = function isValidPassword(password) {
  return (/^[A-Za-z\\d!@#$%^&*]{6,20}$/.test(password)
  );
};

var isValidEmail = function isValidEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

var isEmailRegistered = function isEmailRegistered(email) {
  return (0, _postgresQuerys.getUserByEmail)(email).then(function (result) {
    return result.length > 0;
  });
};

var register = exports.register = function register(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;


  if (!email || !password) {
    var missing = !email ? 'email ' + IS_MISSING : 'password ' + IS_MISSING;
    return res.status(400).send('Bad Request, ' + missing);
  } else if (!isValidEmail(email) || !isValidPassword(password)) {
    var invalid = !isValidEmail(email) ? 'email ' + NOT_VALID : 'password ' + NOT_VALID;
    return res.status(400).send('Bad Request, ' + invalid);
  }

  var encryptedPass = (0, _cryptoUtils.cipher)(password, KEY);
  isEmailRegistered(email).then(function (isRegistered) {
    if (isRegistered) {
      return res.status(409).send({ error: 'Email is already registered' });
    }

    var token = (0, _jwtToken.assignToken)({ email: email, password: password });
    (0, _postgresQuerys.createUser)(email, encryptedPass).then(function (user) {
      var email = user.email,
          id = user.id;

      var emailId = getEmailId(email);
      (0, _firebaseQuerys.saveUserToFirebase)(emailId);
      return res.status(201).send({ id: id, email: email });
    });
  });
};