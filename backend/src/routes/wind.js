import express from 'express';
import { pointStatistics } from '../controllers/wind';

const route = express.Router();

route.get('/', pointStatistics);

export default route;