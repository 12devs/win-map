import express from 'express';
import notifications from '../controllers/subscriptions';
const route = express.Router();

route.post('/save', notifications.save);

export default route;
