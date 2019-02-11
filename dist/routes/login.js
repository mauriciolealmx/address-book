'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _postgresQuerys = require('../helpers/postgres-querys');

var _postgresQuerys2 = _interopRequireDefault(_postgresQuerys);

var _jwtToken = require('../middlewares/jwt-token');

var _cryptoUtils = require('../helpers/crypto-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _app$get = _index2.default.get('config'),
    KEY = _app$get.KEY;

var login = exports.login = function login(req, res) {
  var email = req.body.email;

  _postgresQuerys2.default.getUserByEmail(email, function (err, result) {
    // Request password.
    var password = req.body.password;

    var encryptedPass = (0, _cryptoUtils.cipher)(password, KEY);

    // DB password.

    var _result = _slicedToArray(result, 1),
        user = _result[0];

    var dbPassword = user && user.password;

    // If encrypted password is equal to the one in postgreSQL.
    if (encryptedPass === dbPassword) {
      if (!req.cookies.access_token) {
        var token = (0, _jwtToken.assignToken)({ email: email });
        res.cookie('access_token', token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
      }

      var id = user.id;

      return res.status(200).send({ id: id, email: email });
    } else {
      // TODO: Error message should be more precise.
      return res.status(404).send('Not Found');
    }
  });
};