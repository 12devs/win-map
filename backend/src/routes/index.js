import express from 'express';
import publicRouts from './publicRouts';
import privateRouts from './privateRouts';
import points from './points';
import wind from './wind';
import auth from './../middlewares/auth';

const route = express();
route.use('/api', auth);
route.use('/publicRouts', publicRouts);
route.use('/api/points', points);

route.use('/wind', wind);

export default route;
