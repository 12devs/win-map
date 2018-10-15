import express from 'express';
import publicRouts from './publicRouts';
import privateRouts from './privateRouts';
import auth from '../middlewares/auth';

const route = express();

route.use('/publicRouts', publicRouts);
route.use('/api', auth, privateRouts);

export default route;
