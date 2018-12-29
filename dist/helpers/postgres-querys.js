'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.createUser = exports.getUserByEmail = undefined;

var _pg = require('pg');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL || _config2.default.connectionString;
var client = new _pg.Client(connectionString);
client.connect();

// TODO: Need to end() the connection after querys.
var getUserByEmail = exports.getUserByEmail = function getUserByEmail(email) {
  var queryString = 'SELECT * FROM users WHERE email=\'' + email + '\'';
  return client.query(queryString).then(function (_ref) {
    var rows = _ref.rows;
    return rows;
  });
};

var createUser = exports.createUser = function createUser(email, encryptedPass) {
  var queryString = 'INSERT INTO users(email, password) values($1, $2)';
  return client.query(queryString, [email, encryptedPass]).then(function () {
    return getUserByEmail(email);
  }).then(function (res) {
    return res[0];
  }).catch(function (err) {
    return console.error(err.stack);
  });
};

// TODO: Not tested
var deleteUser = exports.deleteUser = function deleteUser(email) {
  var queryString = 'DELETE FROM users WHERE email=\'' + email + '\'';
  return client.query(queryString).then(function (res) {
    return res.rows[0];
  }).catch(function (err) {
    return console.error(err.stack);
  });
};