import jwt from 'jsonwebtoken';

import app from '../index';

const { EXPIRES_IN, JWT_SECRET } = app.get('config');

const isValidToken = (req, res, next) => {
  const { body, query, headers } = req;
  const token = body.token || query.token || headers['x-access-token'];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
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
  return jwt.sign(userCredentials, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
};

export { isValidToken, assignToken };
