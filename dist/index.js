'use strict';

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _addressBookB4923FirebaseAdminsdk70gx68382c02c = require('../address-book-b4923-firebase-adminsdk-70gx6-8382c02c12.json');

var _addressBookB4923FirebaseAdminsdk70gx68382c02c2 = _interopRequireDefault(_addressBookB4923FirebaseAdminsdk70gx68382c02c);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_dotenv2.default.config();
var _process$env = process.env,
    EXPIRES_IN = _process$env.EXPIRES_IN,
    FIREBASE_URL = _process$env.FIREBASE_URL,
    JWT_SECRET = _process$env.JWT_SECRET,
    KEY = _process$env.KEY,
    PORT = _process$env.PORT,
    TESTING = _process$env.TESTING,
    POSTGRESQL_URL = _process$env.POSTGRESQL_URL;

var config = {
  EXPIRES_IN: EXPIRES_IN,
  JWT_SECRET: JWT_SECRET,
  KEY: KEY,
  POSTGRESQL_URL: POSTGRESQL_URL
};

admin.initializeApp({
  credential: admin.credential.cert(_addressBookB4923FirebaseAdminsdk70gx68382c02c2.default),
  databaseURL: FIREBASE_URL
});

// FIXME: There has to be a better way.
var app = module.exports = (0, _express2.default)();

// Set configurations.
app.set('port', PORT || 5000);
app.set('config', config);
app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, '../views'));

// Middleware
app.use(_express2.default.static(_path2.default.join(__dirname, '../public'), { index: 'no-default' }));
app.use(_express2.default.static(_path2.default.join(__dirname, '../client-dist/build'), { index: 'no-default' }));
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  // Accept Cross Origin requests.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
  next();
});

// Routes
require('./routes/routes')(app, _express2.default);

app.disable('x-powered-by');

app.listen(app.get('port'), function () {
  if (!TESTING) {
    console.log('Node app is running on port', app.get('port'));
  }
});