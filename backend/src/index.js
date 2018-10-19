import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from 'config';
import routes from './routes';
import logger from './logger';
import { getInstance } from "./db"

const app = express();

app.use('/public', express.static(config.static.public));
app.set('view engine', 'ejs');
app.set('views', __dirname + config.static.views);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next)=>{
  next();
});


app.use(routes);

app.get(['/', '/register', '/login', '/test', '/leaflet', '/main', '/notification'], (req, res) => res.render('app'));

const db = getInstance();

db
  .authenticate()
  .then(() => {
    logger.info("DB successfully connected")
  })
  .catch(err => {
    logger.error(`Unable to connect to the database:\n${err}`);
    return false;
  });

app.listen(config.app.port, () =>
  logger.info(`Server listening on ${config.app.host}:${config.app.port}`)
);


