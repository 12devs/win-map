import express from 'express';
import db from '../controllers/db';

const route = express.Router();

route.post('/dbExecute', db.dbExecute);

export default route;
