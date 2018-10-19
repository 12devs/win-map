import express from 'express';
import notifications from '../controllers/notifications';

const route = express.Router();

route.post('/save', notifications.save);
route.post('/saveToken', notifications.saveToken);
route.delete('/deleteToken', notifications.deleteToken);

export default route;
