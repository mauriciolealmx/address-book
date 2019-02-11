'use strict';

var _pg = require('pg');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = _index2.default.get('config').POSTGRESQL_URL;
var client = new _pg.Client(connectionString);
client.connect();

var queryString = 'CREATE TABLE other(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password CHARACTER(32) not null)';

client.query(queryString).then(function () {
  console.log('Table created');
  client.end();
});