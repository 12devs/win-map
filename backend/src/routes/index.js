import express from 'express';
import publicRouts from './publicRouts';
import points from './points';
import notifications from './notifications';
import subscriptions from './subscriptions';
import auth from './../middlewares/auth';

const route = express();
route.use('/api', auth);
route.use('/publicRouts', publicRouts);
route.use('/api/points', points);
route.use('/api/notifications', notifications);
route.use('/api/subscriptions', subscriptions);

export default route;
