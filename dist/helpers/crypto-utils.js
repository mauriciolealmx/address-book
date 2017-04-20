'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cipher = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY_PREFIX = 'AsdfgHjklñ';

var cipher = function cipher(clearText, key) {
  var cipher = _crypto2.default.createCipheriv('bf-ecb', '' + KEY_PREFIX + key, '');
  var encrypted = cipher.update(clearText, 'utf8', 'hex');

  encrypted += cipher.final('hex');
  return encrypted;
};

exports.cipher = cipher;