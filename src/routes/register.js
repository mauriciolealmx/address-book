import config from '../../config';
import { cipher } from '../helpers/crypto-utils';
import { getUserByEmail, createUser } from '../helpers/postgres-querys';
import { saveUserToFirebase } from '../helpers/firebase-querys';
import { assignToken } from '../middlewares/jwt-token';

const IS_MISSING = 'is missing';
const NOT_VALID = 'is not valid';

let isValidPassword = (password) => {
  return /^[A-Za-z\\d!@#$%^&*]{6,20}$/.test(password);
};

let isValidEmail = (email) => {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

let isEmailRegistered = (email) => {
  return getUserByEmail(email).then( (result) => {
    return result.length > 0;
  });
}

let register = (req, res) => {
  let { email, password } = req.body;
  let encryptedPass;
  if (!password || !email) {
    let missing = !email ? `email ${IS_MISSING}` : `password ${IS_MISSING}`;
    return res.status(400).send(`Bad Request, ${missing}`);
  } else if (!isValidEmail(email) || !isValidPassword(password)){
    let invalid = !isValidEmail(email) ? `email ${NOT_VALID}` : `password ${NOT_VALID}`;
    return res.status(400).send(`Bad Request, ${invalid}`);
  } 

  encryptedPass = cipher(password, config.key);
  req.encryptedPass = encryptedPass;
  let userCredentials = { email, encryptedPass };

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