import express from 'express';
import cityPage from '../controllers/cityPage';

const route = express.Router();

route.get('/:code/', cityPage.cityPageData);

export default route;
