import { Client } from 'pg';

import config from '../../config';

const connectionString = process.env.DATABASE_URL || config.connectionString;
const client = new Client(connectionString);
client.connect();

// TODO: Need to end() the connection after querys.
export const getUserByEmail = email => {
  const queryString = `SELECT * FROM users WHERE email='${email}'`;
  return client.query(queryString).then(({ rows }) => rows);
};

export const createUser = (email, encryptedPass) => {
  const queryString = 'INSERT INTO users(email, password) values($1, $2)';
  return client.query(queryString, [email, encryptedPass]).then(() => {
    return getUserByEmail(email);
  });
};
