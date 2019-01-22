import pg from 'pg';

import config from '../../config';

// DATABASE_URL env variable is set on the server.
const connectionString = process.env.HEROKU_POSTGRESQL_CYAN_URL || config.connectionString;

function query(query, params, callback) {
  pg.connect(
    connectionString,
    function(err, client, done) {
      done();
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      client.query(query, params, function(err, result) {
        if (err) {
          console.error(err);
          callback(err, null);
          return;
        }
        callback(null, result.rows);
      });
    }
  );
}

export default {
  getUserByEmail: (email, callback) => {
    const queryString = `SELECT * FROM users WHERE email='${email}'`;
    query(queryString, [], function(err, result) {
      return callback(err, result);
    });
  },

  createUser: (email, encryptedPass, callback) => {
    const queryString = 'INSERT INTO users(email, password) values($1, $2) RETURNING *';
    query(queryString, [email, encryptedPass], function(err, result) {
      return callback(err, result && result[0]);
    });
  },

  deleteUser: (email, callback) => {
    const queryString = `DELETE FROM users WHERE email='${email}' RETURNING *`;
    query(queryString, [], function(err, result) {
      return callback(err, result && result[0]);
    });
  },
};
