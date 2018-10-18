import express from 'express';
import notifications from '../controllers/notifications';

const route = express.Router();

route.post('/save', notifications.save);

export default route;
