import express from 'express';
import mainPage from '../controllers/mainPage';

const route = express.Router();

route.get('/', mainPage.mainPageData);

export default route;
