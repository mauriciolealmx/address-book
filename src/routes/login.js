import app from '../index';
import pgClient from '../helpers/postgres-querys';
import { assignToken } from '../middlewares/jwt-token';
import { cipher } from '../helpers/crypto-utils';

const { KEY } = app.get('config');

export const login = (req, res) => {
  const { email } = req.body;
  pgClient.getUserByEmail(email, (err, result) => {
    // Request password.
    const { password } = req.body;
    const encryptedPass = cipher(password, KEY);

    // DB password.
    const [user] = result;
    const dbPassword = user && user.password;

    // If encrypted password is equal to the one in postgreSQL.
    if (encryptedPass === dbPassword) {
      const token = assignToken({ email, password: user.password });
      const id = user.id;
      const resJSON = { id, email, token };
      return res.status(200).send(resJSON);
    } else {
      // TODO: Error message should be more precise.
      return res.status(404).send('Not Found');
    }
  });
};
