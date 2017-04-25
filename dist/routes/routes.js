'use strict';

var _jwtToken = require('../middlewares/jwt-token');

var _register = require('./register');

var _login = require('./login');

var _create = require('./create');

module.exports = function (app, express) {
  var router = express.Router();

  /**
  *  Handling: Unauthorized users (Not logged in user or not registered user).
  *  method: GET
  *  uri: '/login'
  */
  app.get('/api', function (req, res) {
    return res.render('pages/api');
  }); /**
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
  app.post('/login', function (req, res) {
    return (0, _login.login)(req, res);
  });

  /**
  *  Handling: Registration
  *  method: POST
  *  uri: '/register'
  */
  app.post('/register', function (req, res) {
    return (0, _register.register)(req, res);
  });

  /**
  *  Middleware: Check for valid jwt Token.
  */
  app.use((0, _jwtToken.isValidToken)());

  /**
  *  Handling: Create new contact
  *  method: POST
  *  uri: '/create/##/contacts'
  */
  app.post('/users/:userId/contacts', function (req, res) {
    return (0, _create.create)(req, res);
  });
};