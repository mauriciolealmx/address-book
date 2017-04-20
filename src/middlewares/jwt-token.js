import config from '../../config';
import jwt from 'jsonwebtoken';

let isValidToken = (req, res, next) => {
  return (req, res, next) => {
    let { body, query, headers } = req;
    let token = body.token || query.token || headers['x-access-token'];
    

    if (token) {
      jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.redirect('/login');
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          return next();
        }
      });
    } else {
      return res.redirect('/login');
    }
  }
}

let assignToken = (userCredentials) => {
  return jwt.sign(userCredentials, config.jwt_secret, {
    expiresIn: config.EXPIRES_IN
  });
};

export { isValidToken, assignToken };