import express from 'express';
import point from '../controllers/publicPoint';

const route = express.Router();

route.post('/save', point.save);
route.post('/move', point.movePoint);

export default route;
