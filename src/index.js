import * as admin from 'firebase-admin';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import serviceAccount from '../address-book-b4923-firebase-adminsdk-70gx6-8382c02c12.json';

dotenv.config();
const { EXPIRES_IN, FIREBASE_URL, JWT_SECRET, KEY, PORT, TESTING, POSTGRESQL_URL } = process.env;
const config = {
  EXPIRES_IN,
  JWT_SECRET,
  KEY,
  POSTGRESQL_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_URL,
});

// FIXME: There has to be a better way.
const app = (module.exports = express());

// Set configurations.
app.set('port', PORT || 5000);
app.set('config', config);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client-dist/build')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  // Accept Cross Origin requests.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
require('./routes/routes')(app, express);

app.disable('x-powered-by');

app.listen(app.get('port'), () => {
  if (!TESTING) {
    console.log('Node app is running on port', app.get('port'));
  }
});
