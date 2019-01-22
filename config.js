const { HEROKU_POSTGRESQL_CYAN_URL, JWT_SECRET, KEY } = process.env;

module.exports = {
  EXPIRES_IN: '24h',
  connectionString: HEROKU_POSTGRESQL_CYAN_URL || 'postgresql://myapp:dbpass@localhost:15432/myapp',
  databaseURL: 'https://address-book-b4923.firebaseio.com/',
  jwt_secret: JWT_SECRET || '-secret-',
  key: KEY || '-secret-',
};
