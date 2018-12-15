import { isValidToken } from '../middlewares/jwt-token';
import { create } from './create';
import { login } from './login';
import { register } from './register';
import { retreive } from './retreive';

module.exports = (app, express) => {
  const router = express.Router();

  /**
   *  Handling: Landing page.
   *  method: GET
   *  uri: '/'
   */
  app.get('/', (req, res) => res.render('pages/index'));

  /**
   *  Handling: Unauthorized users (Not logged in user or not registered user).
   *  method: GET
   *  uri: '/login'
   */
  app.get('/api', (req, res) => res.render('pages/api'));

  /**
   *  Handling: Unauthorized users (Not logged in user or not registered user).
   *  method: GET
   *  uri: '/login'
   */
  app.get('/login', (req, res) => res.redirect('/api'));

  /**
   *  Handling: Login
   *  method: POST
   *  uri: '/login'
   */
  app.post('/login', login);

  /**
   *  Handling: Registration
   *  method: POST
   *  uri: '/register'
   */
  app.post('/register', register);

  /**
   *  Middleware: Check for valid jwt Token.
   */
  app.use(isValidToken);

  /**
   *  Handling: Create new contact
   *  method: POST
   *  uri: '/users/:userId/contacts'
   */
  app.post('/users/:userId/contacts', create);

  /**
   *  Handling: Get all user contacts
   *  method: GET
   *  uri: '/users/:userId/contacts'
   */
  app.get('/users/:userId/contacts', retreive);
};
