'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _cryptoUtils = require('../helpers/crypto-utils');

var _jwtToken = require('../middlewares/jwt-token');

var _postgresQuerys = require('../helpers/postgres-querys');

var _firebaseQuerys = require('../helpers/firebase-querys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(req, res) {
  var userId = req.params.userId;

  (0, _firebaseQuerys.addContact)(userId, req.body).then(function (response) {
    return res.status(201).send(response);
  });
};

exports.create = create;