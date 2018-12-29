'use strict';

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _addressBookB4923FirebaseAdminsdk70gx68382c02c = require('../address-book-b4923-firebase-adminsdk-70gx6-8382c02c12.json');

var _addressBookB4923FirebaseAdminsdk70gx68382c02c2 = _interopRequireDefault(_addressBookB4923FirebaseAdminsdk70gx68382c02c);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp({
  credential: admin.credential.cert(_addressBookB4923FirebaseAdminsdk70gx68382c02c2.default),
  databaseURL: _config2.default.databaseURL
});

// Firebase.
var db = admin.database();
var ref = db.ref('address-book/data');
var usersRef = ref.child('users');

var app = (0, _express2.default)();
app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

// view engine setup
// views is directory for all template files
app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('config', _config2.default);

// Middleware
app.disable('x-powered-by');
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  // Make sure that the server accepts Cross Origin requests.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
require('./routes/routes')(app, _express2.default);

var server = app.listen(app.get('port'), function () {
  if (!process.env.TESTING) {
    console.log('Node app is running on port', app.get('port'));
  }
});

module.exports = server;