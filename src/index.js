import * as admin from 'firebase-admin';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import config from '../config';
import serviceAccount from '../address-book-b4923-firebase-adminsdk-70gx6-8382c02c12.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
});

const app = express();

// Set configurations.
app.set('port', process.env.PORT || 5000);
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
  if (!process.env.TESTING) {
    console.log('Node app is running on port', app.get('port'));
  }
});

export default app;
