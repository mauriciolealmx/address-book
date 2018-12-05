import * as admin from 'firebase-admin';
import bodyParser from 'body-parser';
import config from '../config';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import serviceAccount from '../address-book-b4923-firebase-adminsdk-70gx6-8382c02c12.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
});

// Firebase.
const db = admin.database();
const ref = db.ref('address-book/data');
const usersRef = ref.child('users');

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, '../public')));

// view engine setup
// views is directory for all template files
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('config', config);

// Middleware
app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  // Make sure that the server accepts Cross Origin requests.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
require('./routes/routes')(app, express);

const server = app.listen(app.get('port'), () => {
  if (!process.env.TESTING) {
    console.log('Node app is running on port', app.get('port'));
  }
});

module.exports = server;
