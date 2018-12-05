import config from '../../config';
import { assignToken } from '../middlewares/jwt-token';
import { cipher } from '../helpers/crypto-utils';
import { getUserByEmail, createUser } from '../helpers/postgres-querys';
import { saveUserToFirebase } from '../helpers/firebase-querys';

const IS_MISSING = 'is missing';
const NOT_VALID = 'is not valid';
const KEY = process.env.KEY || config.key;

const isValidPassword = password => {
  return /^[A-Za-z\\d!@#$%^&*]{6,20}$/.test(password);
};

const isValidEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isEmailRegistered = email => {
  return getUserByEmail(email).then(result => result.length > 0);
};

const register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const missing = !email ? `email ${IS_MISSING}` : `password ${IS_MISSING}`;
    return res.status(400).send(`Bad Request, ${missing}`);
  } else if (!isValidEmail(email) || !isValidPassword(password)) {
    const invalid = !isValidEmail(email) ? `email ${NOT_VALID}` : `password ${NOT_VALID}`;
    return res.status(400).send(`Bad Request, ${invalid}`);
  }

  const encryptedPass = cipher(password, KEY);
  isEmailRegistered(email).then(isRegistered => {
    if (isRegistered) {
      return res.status(400).send({ error: 'Email is already registered' });
    }

    const token = assignToken({ email, password });
    createUser(email, encryptedPass).then(([user]) => {
      saveUserToFirebase(user.id);
      return res.status(201).send(user);
    });
  });
};

export { register };
