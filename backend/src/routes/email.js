import express from 'express';
import email from '../controllers/email';

const route = express.Router();

route.get('/:email/:code', email.saveEmail);

export default route;
