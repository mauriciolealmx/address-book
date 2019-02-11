'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = _index2.default.get('config').POSTGRESQL_URL;

function query(query, params, callback) {
  _pg2.default.connect(connectionString, function (err, client, done) {
    done();
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    client.query(query, params, function (err, result) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      callback(null, result.rows);
    });
  });
}

exports.default = {
  getUserByEmail: function getUserByEmail(email, callback) {
    var queryString = 'SELECT * FROM users WHERE email=\'' + email + '\'';
    query(queryString, [], function (err, result) {
      return callback(err, result);
    });
  },

  createUser: function createUser(email, encryptedPass, callback) {
    var queryString = 'INSERT INTO users(email, password) values($1, $2) RETURNING *';
    query(queryString, [email, encryptedPass], function (err, result) {
      return callback(err, result && result[0]);
    });
  },

  deleteUser: function deleteUser(email, callback) {
    var queryString = 'DELETE FROM users WHERE email=\'' + email + '\' RETURNING *';
    query(queryString, [], function (err, result) {
      return callback(err, result && result[0]);
    });
  },

  // TODO: It has no consumer at the moment.
  updateUser: function updateUser(email, properties, callback) {
    var assigns = [];
    var values = [];

    // Currently only password can be updated.
    if ('password' in properties) {
      assigns.push('"password"=$' + (assigns.length + 1));
      values.push(properties.password);
    }
    var updateQuery = ['UPDATE users', 'SET ' + assigns.join(', '), 'WHERE email = $' + (assigns.length + 1), 'RETURNING *'];
    query(updateQuery.join(' '), values.concat([email]), function (err, rows) {
      callback(err, rows && rows[0]);
    });
  }
};