import config from '../../config';
import { cipher } from '../helpers/crypto-utils';
import { assignToken } from '../middlewares/jwt-token';
import { getUserByEmail, createUser } from '../helpers/postgres-querys';
import { saveUserToFirebase, addContact } from '../helpers/firebase-querys';

let create = (req, res) => {
  let { userId } = req.params;
  addContact(userId, req.body).then( (response) => {
    return res.status(201).send(response);
  });
}

export { create };