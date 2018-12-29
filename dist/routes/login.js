'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jwtToken = require('../middlewares/jwt-token');

var _cryptoUtils = require('../helpers/crypto-utils');

var _postgresQuerys = require('../helpers/postgres-querys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = process.env.KEY || _config2.default.key;

var login = exports.login = function login(req, res) {
  var email = req.body.email;
  // Authenticate function will verify user credentials.

  (0, _postgresQuerys.getUserByEmail)(email).then(function (result) {
    // TODO: Need to add logic for non existent emails.
    // Request password.
    var password = req.body.password;

    var encryptedPass = (0, _cryptoUtils.cipher)(password, KEY);

    // DB password.

    var _result = _slicedToArray(result, 1),
        user = _result[0];

    var dbPassword = user && user.password;

    // If encrypted password is equal to the one in postgreSQL.
    if (encryptedPass === dbPassword) {
      var token = (0, _jwtToken.assignToken)({ email: email, password: user.password });
      var id = user.id;
      var resJSON = { id: id, email: email, token: token };
      return res.status(200).send(resJSON);
    } else {
      // TODO: Error message should be more precise.
      return res.status(404).send('Not Found');
    }
  }).catch(function (err) {
    return res.status(500).json({ success: false, data: err });
  });
};