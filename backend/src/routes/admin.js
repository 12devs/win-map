import express from 'express';
import admin from '../controllers/admin';

const route = express.Router();

route.post('/dbExecute', admin.dbExecute);
route.get('/cron/stop', admin.stopCron);
route.get('/cron/start', admin.startCron);
route.get('/cron/setTime', admin.setTimeCron);
route.get('/cron/runScript', admin.runScript);

export default route;
