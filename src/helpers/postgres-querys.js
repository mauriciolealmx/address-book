import config from '../../config';
import Promise from 'bluebird';
import pg from 'pg';

const connectionString = config.connectionString;

let getUserByEmail = (email) => {
  return new Promise(function(resolve) {
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        return reject(err);
      }
      // SQL Query > Find user by email
      let query = client.query(`SELECT * FROM users WHERE email='${email}'`).then( ({rows}) => {
        return resolve(rows);      
      }).catch( (err) => {
        return resolve([]);
      });
    });
  });
};

let createUser = (req, res) => {
  return new Promise(function(resolve, reject) {
    const results = [];
    let { email } = req.body;
    let { encryptedPass } = req;
    const data = { 
      email, 
      password: encryptedPass
    };

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Insert Data
      client.query('INSERT INTO users(email, password) values($1, $2)', [data.email, data.password]);
      // SQL Query > Find user by email
      const query = client.query(`SELECT * FROM users WHERE email='${email}'`);
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return resolve(results);
      });
    });
  });
};

export { getUserByEmail, createUser };