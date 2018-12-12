import { isValidToken } from '../middlewares/jwt-token';
import { create } from './create';
import { login } from './login';
import { register } from './register';

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
  app.post('/login', (req, res) => login(req, res));

  /**
   *  Handling: Registration
   *  method: POST
   *  uri: '/register'
   */
  app.post('/register', (req, res) => register(req, res));

  /**
   *  Middleware: Check for valid jwt Token.
   */
  app.use(isValidToken);

  /**
   *  Handling: Create new contact
   *  method: POST
   *  uri: '/create/##/contacts'
   */
  app.post('/users/:userId/contacts', (req, res) => create(req, res));
};
