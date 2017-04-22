'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = exports.getUserByEmail = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL;

var getUserByEmail = function getUserByEmail(email) {
  return new _bluebird2.default(function (resolve) {
    _pg2.default.connect(connectionString, function (err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        return reject(err);
      }
      // SQL Query > Find user by email
      var query = client.query('SELECT * FROM users WHERE email=\'' + email + '\'').then(function (_ref) {
        var rows = _ref.rows;

        return resolve(rows);
      }).catch(function (err) {
        return resolve([]);
      });
    });
  });
};

var createUser = function createUser(req, res) {
  return new _bluebird2.default(function (resolve, reject) {
    var results = [];
    var email = req.body.email;
    var encryptedPass = req.encryptedPass;

    var data = {
      email: email,
      password: encryptedPass
    };

    _pg2.default.connect(connectionString, function (err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Insert Data
      client.query('INSERT INTO users(email, password) values($1, $2)', [data.email, data.password]);
      // SQL Query > Find user by email
      var query = client.query('SELECT * FROM users WHERE email=\'' + email + '\'');
      query.on('row', function (row) {
        results.push(row);
      });
      query.on('end', function () {
        done();
        return resolve(results);
      });
    });
  });
};

exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;