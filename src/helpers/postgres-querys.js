import pg from 'pg';

import config from '../../config';

const connectionString = config.connectionString;

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

  // TODO: It has no consumer at the moment.
  updateUser: function(email, properties, callback) {
    var assigns = [];
    var values = [];

    // Currently only password can be updated.
    if ('password' in properties) {
      assigns.push('"password"=$' + (assigns.length + 1));
      values.push(properties.password);
    }
    var updateQuery = [
      'UPDATE users',
      'SET ' + assigns.join(', '),
      'WHERE email = $' + (assigns.length + 1),
      'RETURNING *',
    ];
    query(updateQuery.join(' '), values.concat([email]), function(err, rows) {
      callback(err, rows && rows[0]);
    });
  },
};
