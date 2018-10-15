import express from 'express';
import publicRouts from './publicRouts';
import privateRouts from './privateRouts';
import wind from './wind';
import auth from './../middlewares/auth';

const route = express();

route.use('/publicRouts', publicRouts);
route.use('/api', auth, privateRouts);

route.use('/wind', wind);

export default route;
