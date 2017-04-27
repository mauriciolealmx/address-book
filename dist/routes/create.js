'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _firebaseQuerys = require('../helpers/firebase-querys');

// TODO: User B should not be able to create contacts with user's A jwt Token.
var create = function create(req, res) {
  var userId = req.params.userId;
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      email = _req$body.email;

  (0, _firebaseQuerys.addContact)(userId, { firstName: firstName, lastName: lastName, email: email }).then(function (response) {
    if (response) {
      return res.status(201).send(response);
    } else {
      return res.status(404).send('Not Found');
    }
  }).catch(function (err) {
    if (err) {
      return res.status(404).send(err);
    }
  });
};

exports.create = create;