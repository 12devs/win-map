const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const config = require('config');
import bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'db'});

const db = {};

const dbConfig = config.database;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging(s, timing) {
    if (s.indexOf('Exec') === 0) {
      // Extract transaction id, cleanup ugly 'Executing (default): SELECT ...'
      const p0 = s.indexOf('(');
      const p1 = s.indexOf(')');
      const trx = s.substring(p0 + 1, p1);
      const t = s.slice(p1 + 3);
      logger.info({
        // timing,
        trx: trx === 'default' ? undefined : trx,
      }, t);
    } else {
      logger.info({  }, s);
    }
  },
    define: {
      underscored: true,
    },
});

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;