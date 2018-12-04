'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jwtToken = require('../middlewares/jwt-token');

var _cryptoUtils = require('../helpers/crypto-utils');

var _postgresQuerys = require('../helpers/postgres-querys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = process.env.KEY || _config2.default.key;

var login = function login(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  var encryptedPass = (0, _cryptoUtils.cipher)(password, KEY);

  // Authenticate function will verify user credentials.
  (0, _postgresQuerys.getUserByEmail)(email).then(function (result) {
    if (result) {
      var dbPassword = result[0] && result[0].password;
      var id = result[0].id;
      // If encrypted password is equal to the one in postgreSQL.
      if (encryptedPass === dbPassword) {
        var token = (0, _jwtToken.assignToken)({ email: email, password: password });
        var resJSON = { id: id, email: email, token: token };
        return res.status(200).send(resJSON);
      } else {
        return res.status(404).send('Not Found');
      }
    }
  }).catch(function (err) {
    return res.status(500).json({ success: false, data: err });
  });
};

exports.login = login;