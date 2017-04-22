'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _cryptoUtils = require('../helpers/crypto-utils');

var _postgresQuerys = require('../helpers/postgres-querys');

var _firebaseQuerys = require('../helpers/firebase-querys');

var _jwtToken = require('../middlewares/jwt-token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_MISSING = 'is missing';
var NOT_VALID = 'is not valid';

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

var register = function register(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  var encryptedPass = void 0;
  if (!password || !email) {
    var missing = !email ? 'email ' + IS_MISSING : 'password ' + IS_MISSING;
    return res.status(400).send('Bad Request, ' + missing);
  } else if (!isValidEmail(email) || !isValidPassword(password)) {
    var invalid = !isValidEmail(email) ? 'email ' + NOT_VALID : 'password ' + NOT_VALID;
    return res.status(400).send('Bad Request, ' + invalid);
  }

  encryptedPass = (0, _cryptoUtils.cipher)(password, _config2.default.key);
  req.encryptedPass = encryptedPass;
  var userCredentials = { email: email, encryptedPass: encryptedPass };

  isEmailRegistered(email).then(function (isRegistered) {
    if (isRegistered) {
      return res.status(400).send({ error: 'Email is already registered' });
    }
    var token = (0, _jwtToken.assignToken)(userCredentials);

    (0, _firebaseQuerys.saveUserToFirebase)(email);
    (0, _postgresQuerys.createUser)(req, res).then(function (response) {
      var user = response[0];
      Object.assign(user, { token: token });
      return res.status(201).send(user);
    });
  });
};

exports.register = register;