import config from '../../config';
import { assignToken } from '../middlewares/jwt-token';
import { cipher } from '../helpers/crypto-utils';
import { getUserByEmail } from '../helpers/postgres-querys';

const KEY = process.env.KEY || config.key;

export const login = (req, res) => {
  const { email, password } = req.body;
  const encryptedPass = cipher(password, KEY);

  // Authenticate function will verify user credentials.
  getUserByEmail(email)
    .then(result => {
      // TODO: Need to add logic for non existent emails.
      const [user] = result;
      const dbPassword = user && user.password;
      const id = user.id;
      // If encrypted password is equal to the one in postgreSQL.
      if (encryptedPass === dbPassword) {
        const token = assignToken({ email, password });
        const resJSON = { id, email, token };
        return res.status(200).send(resJSON);
      } else {
        // TODO: Error message should be more precise.
        return res.status(404).send('Not Found');
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, data: err });
    });
};
