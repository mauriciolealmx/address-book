import app from '../index';
import pgClient from '../helpers/postgres-querys';
import { assignToken } from '../middlewares/jwt-token';
import { cipher } from '../helpers/crypto-utils';
import { saveUserToFirebase } from '../helpers/firebase-querys';

const IS_MISSING = 'is missing';
const NOT_VALID = 'is not valid';
const { KEY } = app.get('config');

const getEmailId = email => email.split('@')[0];

const isValidPassword = password => {
  return /^[A-Za-z\\d!@#$%^&*]{6,20}$/.test(password);
};

const isValidEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isEmailRegistered = (email, callback) =>
  pgClient.getUserByEmail(email, (err, result) => {
    return callback(result.length > 0);
  });

export const register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const missing = !email ? `email ${IS_MISSING}` : `password ${IS_MISSING}`;
    return res.status(400).send(`Bad Request, ${missing}`);
  } else if (!isValidEmail(email) || !isValidPassword(password)) {
    const invalid = !isValidEmail(email) ? `email ${NOT_VALID}` : `password ${NOT_VALID}`;
    return res.status(400).send(`Bad Request, ${invalid}`);
  }

  const encryptedPass = cipher(password, KEY);
  isEmailRegistered(email, isRegistered => {
    if (isRegistered) {
      return res.status(409).send({ error: 'Email is already registered' });
    }

    const token = assignToken({ email, password });
    pgClient.createUser(email, encryptedPass, (err, user) => {
      const { email, id } = user;
      const emailId = getEmailId(email);
      saveUserToFirebase(emailId, (err, user) => {
        if (err) {
          return res.status(400).send(err);
        } else if (user) {
          return res.status(201).send({ id, email });
        }
      });
    });
  });
};
