import config from '../../config';
import { cipher } from '../helpers/crypto-utils';
import { getUserByEmail, createUser } from '../helpers/postgres-querys';
import { saveUserToFirebase } from '../helpers/firebase-querys';
import { assignToken } from '../middlewares/jwt-token';

let isEmailRegistered = (email) => {
  return getUserByEmail(email).then( (result) => {
    return result.length > 0;
  });
}

let register = (req, res) => {
  let { email, password } = req.body;
  let encryptedPass = cipher(password, config.key);
  let userCredentials = { email, encryptedPass };

  req.encryptedPass = encryptedPass;

  isEmailRegistered(email).then( (isRegistered) => {
    if (isRegistered) {
      return res.status(400).send({error: 'Email is already registered'});
    }
    let token = assignToken(userCredentials);

    saveUserToFirebase(email);
    createUser(req, res).then( (response) => {
      let user = response[0];
      Object.assign(user, {token});
      return res.status(201).send(user);
    });
  });
};

export { register };