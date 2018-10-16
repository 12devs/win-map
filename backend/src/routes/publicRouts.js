import express from 'express';
import bodyParser from 'body-parser';
import security from '../controllers/security';
const route = express.Router();

route.post('/register',  security.register);
route.post('/login',  security.login);

export default route;
