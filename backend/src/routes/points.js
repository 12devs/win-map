import express from 'express';
import point from '../controllers/point';

const route = express.Router();

route.post('/save', point.save);
route.post('/withData', point.withData);
route.post('/delete', point.deletePoint);
route.post('/move', point.movePoint);

export default route;
