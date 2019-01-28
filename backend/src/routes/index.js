import express from 'express';
import publicRouts from './publicRouts';
import points from './points';
import notifications from './notifications';
import subscriptions from './subscriptions';
import publicPoints from './publicPoints';
import admin from './admin';
import auth from './../middlewares/auth';
import adminMiddlelware from './../middlewares/admin';

const route = express();
route.use('/api', auth);
route.use('/publicRouts', publicRouts);
route.use('/api/points', points);
route.use('/points', publicPoints);
route.use('/api/notifications', notifications);
route.use('/api/subscriptions', subscriptions);
route.use('/admin', adminMiddlelware);
route.use('/admin', admin);

export default route;
