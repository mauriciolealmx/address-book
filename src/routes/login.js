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
      if (!req.cookies.access_token) {
        const token = assignToken({ email });
        res.cookie('access_token', token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
      }

      const { id } = user;
      return res.status(200).send({ id, email });
    } else {
      // TODO: Error message should be more precise.
      return res.status(404).send('Not Found');
    }
  });
};
