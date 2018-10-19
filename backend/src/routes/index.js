import express from 'express';
import publicRouts from './publicRouts';
import privateRouts from './privateRouts';
import points from './points';
import notifications from './notifications';
import auth from './../middlewares/auth';

const route = express();
route.use('/api', auth);
route.use('/publicRouts', publicRouts);
route.use('/api/points', points);
route.use('/api/notifications', notifications);

export default route;
