import express from 'express';
import { pointStatistics } from '../controllers/wind';

const route = express.Router();

route.get('/:loc1/:loc2', pointStatistics);

export default route;