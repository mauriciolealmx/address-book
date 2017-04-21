import config from '../../config';
import { cipher } from '../helpers/crypto-utils';
import { assignToken } from '../middlewares/jwt-token';
import { getUserByEmail, createUser } from '../helpers/postgres-querys';
import { saveUserToFirebase, addContact } from '../helpers/firebase-querys';

let create = (req, res) => {
  let { userId } = req.params;
  addContact(userId, req.body).then( (response) => {
    console.log('What did I get', response);
    if (response) {
      return res.status(201).send(response);
    } else {
      return res.status(404).send('Not Found');
    }
  }).catch( (err) => {
    if (err) {
      console.log('Im tired', err);
      return res.status(404).send(err);
    }
  });
}

export { create };