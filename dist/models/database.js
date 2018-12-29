'use strict';

var _pg = require('pg');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL || _config2.default.connectionString;
var client = new _pg.Client(connectionString);
client.connect();

var queryString = 'CREATE TABLE other(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password CHARACTER(32) not null)';

client.query(queryString).then(function () {
  console.log('Table created');
  client.end();
});