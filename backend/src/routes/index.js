import express from 'express';
import mainPage from './mainPage';
import cityPage from './cityPage';
import email from './email';
import wind from './wind';

const route = express();

route.use('/mainPage', mainPage);
route.use('/cityPage', cityPage);
route.use('/email', email);

route.use('/wind', wind);

export default route;
