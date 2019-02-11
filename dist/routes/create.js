'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _firebaseQuerys = require('../helpers/firebase-querys');

var create = exports.create = function create(req, res) {
  return (0, _firebaseQuerys.addContact)(req.params.userId, req.body, function (err, contactSnap) {
    if (err) {
      return res.status(409).send(err);
    }
    return res.status(201).send(contactSnap.val());
  });
};