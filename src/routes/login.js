import config from '../../config';
import { cipher } from '../helpers/crypto-utils';
import { getUserByEmail } from '../helpers/postgres-querys';
import { assignToken } from '../middlewares/jwt-token';

const KEY = process.env.KEY || config.key;

let login = (req, res) => {
  let { email, password } = req.body;
  let encryptedPass = cipher(password, KEY);
  
  // Authenticate function will verify user credentials.
  getUserByEmail(email).then( (result) => {
    if (result) {
      let dbPassword = result[0] && result[0].password;
      let id = result[0].id;
      // If encrypted password is equal to the one in postgreSQL.
      if (encryptedPass === dbPassword) {
        let token = assignToken({ email, password });
        let resJSON = { id, email, token };
        return res.status(200).send(resJSON);
      } else {
        return res.status(404).send('Not Found');
      }
    }
  }).catch( (err) => {
    return res.status(500).json({success: false, data: err});
  }) 
}

export { login };