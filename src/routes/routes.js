import { isValidToken } from '../middlewares/jwt-token'; 
import { register } from './register';
import { login } from './login';
import { create } from './create';

module.exports = (app, express) => {
  let router = express.Router();

  /**
  *  Handling: Unauthorized users (Not logged in user or not registered user).
  *  method: GET
  *  uri: '/login'
  */
  app.get('/api', (req, res) => res.render('pages/api') );  /**
  
  *  Handling: Unauthorized users (Not logged in user or not registered user).
  *  method: GET
  *  uri: '/login'
  */
  app.get('/login', (req, res) => res.json({message: 'This is the authentication route. A login form should be rendered'}) );

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
  app.use(isValidToken());

  /**
  *  Handling: Create new contact
  *  method: POST
  *  uri: '/create/##/contacts'
  */
  app.post('/users/:userId/contacts', (req, res) => create(req, res));
};
