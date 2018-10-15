import Sequelize from "sequelize"
import config from "config"

let db;

export const getInstance = () => {
  if (db) {
    return db
  }

  db = new Sequelize(config.database.database, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    logging: false,
  });

  return db
};

export const close = () => db
  ? db.close()
  : Promise.reject("DB connection didn't intialized");