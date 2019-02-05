'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _create = require('./create');

var _jwtToken = require('../middlewares/jwt-token');

var _login = require('./login');

var _register = require('./register');

var _remove = require('./remove');

var _retreive = require('./retreive');

var _removeUser = require('./removeUser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, express) {
  var router = express.Router();

  /**
   *  Handling: Landing page.
   *  method: GET
   *  uri: '/'
   */
  app.get('/', function (req, res) {
    return res.sendFile(_path2.default.join(__dirname, '../../client-dist/build', 'clientIndex.html'));
  });

  /**
   *  Handling: Unauthorized users (Not logged in user or not registered user).
   *  method: GET
   *  uri: '/login'
   */
  app.get('/api', function (req, res) {
    return res.render('pages/api');
  });

  /**
   *  Handling: Unauthorized users (Not logged in user or not registered user).
   *  method: GET
   *  uri: '/login'
   */
  app.get('/login', function (req, res) {
    return res.redirect('/api');
  });

  /**
   *  Handling: Login
   *  method: POST
   *  uri: '/login'
   */
  app.post('/login', _login.login);

  /**
   *  Handling: Registration
   *  method: POST
   *  uri: '/register'
   */
  app.post('/register', _register.register);

  /**
   *  Middleware: Check for valid jwt Token.
   */
  app.use(_jwtToken.isValidToken);

  /**
   *  Handling: Create new contact
   *  method: POST
   *  uri: '/users/:userId/contacts'
   */
  app.post('/users/:userId/contacts', _create.create);

  /**
   *  Handling: Get all user contacts
   *  method: GET
   *  uri: '/users/:userId/contacts'
   */
  app.get('/users/:userId/contacts', _retreive.retreive);

  /**
   *  Handling: Delete single user's contact
   *  method: PUT
   *  uri: '/users/:userId/contacts/:userContact'
   */
  app.put('/users/:userId/contacts', _remove.remove);

  /**
   *  Handling: Delete User
   *  method: PUT
   *  uri: '/users/:userId/contacts/:userContact'
   */
  app.put('/users/:userId', _removeUser.removeUser);
};