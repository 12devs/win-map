import express from 'express';
import point from '../controllers/point';

const route = express.Router();

route.post('/save', point.save);
route.post('/withData', point.withData);
route.post('/delete', point.deletePoint);
route.post('/deleteAllPoints', point.deleteAllPoints);
route.post('/move', point.movePoint);
route.post('/update', point.update);

export default route;
