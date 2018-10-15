import express from 'express';
import test from '../controllers/test';

const route = express.Router();

route.get('/test', test.list);

export default route;
