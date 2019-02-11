'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignToken = exports.isValidToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _app$get = _index2.default.get('config'),
    EXPIRES_IN = _app$get.EXPIRES_IN,
    JWT_SECRET = _app$get.JWT_SECRET;

var isValidToken = function isValidToken(req, res, next) {
  var access_token = req.cookies.access_token;

  var token = access_token;
  if (token) {
    _jsonwebtoken2.default.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.redirect('/login');
      } else {
        // If token is valid attach decoded to req for possible use in routes.
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.redirect('/login');
  }
};

var assignToken = function assignToken(userCredentials) {
  return _jsonwebtoken2.default.sign(userCredentials, JWT_SECRET, {
    expiresIn: EXPIRES_IN
  });
};

exports.isValidToken = isValidToken;
exports.assignToken = assignToken;