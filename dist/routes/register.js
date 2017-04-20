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

var isEmailRegistered = function isEmailRegistered(email) {
  return (0, _postgresQuerys.getUserByEmail)(email).then(function (result) {
    return result.length > 0;
  });
};

var register = function register(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  var encryptedPass = (0, _cryptoUtils.cipher)(password, _config2.default.key);
  var userCredentials = { email: email, encryptedPass: encryptedPass };

  req.encryptedPass = encryptedPass;

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