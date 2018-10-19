import express from 'express';
import notifications from '../controllers/notifications';

const route = express.Router();

route.post('/save', notifications.save);
route.post('/saveToken', notifications.saveToken)

export default route;
