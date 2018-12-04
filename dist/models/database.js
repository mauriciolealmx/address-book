'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL || _config2.default.connectionString;
var client = new _pg2.default.Client(connectionString);

client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password CHARACTER(32) not null)');
query.on('end', function () {
  console.log('Table created');
  client.end();
});