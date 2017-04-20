'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignToken = exports.isValidToken = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isValidToken = function isValidToken(req, res, next) {
  return function (req, res, next) {
    var body = req.body,
        query = req.query,
        headers = req.headers;

    var token = body.token || query.token || headers['x-access-token'];

    if (token) {
      _jsonwebtoken2.default.verify(token, _config2.default.jwt_secret, function (err, decoded) {
        if (err) {
          console.log(err);
          return res.redirect('/login');
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          return next();
        }
      });
    } else {
      return res.redirect('/login');
    }
  };
};

var assignToken = function assignToken(userCredentials) {
  return _jsonwebtoken2.default.sign(userCredentials, _config2.default.jwt_secret, {
    expiresIn: _config2.default.EXPIRES_IN
  });
};

exports.isValidToken = isValidToken;
exports.assignToken = assignToken;