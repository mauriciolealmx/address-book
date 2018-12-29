import { Client } from 'pg';

import config from '../../config';

// DATABASE_URL env variable is set on the server.
const connectionString = process.env.HEROKU_POSTGRESQL_CYAN_URL || config.connectionString;
const client = new Client(connectionString);
client.connect();

// TODO: Need to end() the connection after querys.
export const getUserByEmail = email => {
  const queryString = `SELECT * FROM users WHERE email='${email}'`;
  return client.query(queryString).then(({ rows }) => rows);
};

export const createUser = (email, encryptedPass) => {
  const queryString = 'INSERT INTO users(email, password) values($1, $2)';
  return client
    .query(queryString, [email, encryptedPass])
    .then(() => getUserByEmail(email))
    .then(res => res[0])
    .catch(err => console.error(err.stack));
};

// TODO: Not tested
export const deleteUser = email => {
  const queryString = `DELETE FROM users WHERE email='${email}'`;
  return client
    .query(queryString)
    .then(res => res.rows[0])
    .catch(err => console.error(err.stack));
};