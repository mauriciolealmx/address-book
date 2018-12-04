import crypto from 'crypto';

const KEY_PREFIX = 'AsdfgHjklñ';

const cipher = (clearText, key) => {
  const cipher = crypto.createCipheriv('bf-ecb', `${KEY_PREFIX}${key}`, '');
  let encrypted = cipher.update(clearText, 'utf8', 'hex');

  encrypted += cipher.final('hex');
  return encrypted;
};

export { cipher };
