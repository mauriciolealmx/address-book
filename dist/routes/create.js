'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _firebaseQuerys = require('../helpers/firebase-querys');

// TODO: User B should not be able to create contacts with user's A jwt Token.
var create = exports.create = function create(req, res) {
  return (0, _firebaseQuerys.addContact)(req.params.userId, req.body).then(function (response) {
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