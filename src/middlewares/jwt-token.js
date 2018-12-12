import jwt from 'jsonwebtoken';

import config from '../../config';

const SECRET = process.env.JWT_SECRET || config.jwt_secret;

const isValidToken = (req, res, next) => {
  const { body, query, headers } = req;
  const token = body.token || query.token || headers['x-access-token'];

  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.redirect('/login');
      } else {
        // If token is valid attach decoded to req for possible use in routes.
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.redirect('/login');
  }
};

const assignToken = userCredentials => {
  return jwt.sign(userCredentials, SECRET, {
    expiresIn: config.EXPIRES_IN,
  });
};

export { isValidToken, assignToken };
