import Sequelize from "sequelize"
import config from "config"
Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };

let db;

export const getInstance = () => {
  if (db) {
    return db
  }

  let configDatabase = config.database;

  if (process.env.NODE_ENV === "test") {
    configDatabase = config.database_test;
  }
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  console.log(configDatabase)

  db = new Sequelize(configDatabase.database, configDatabase.username, configDatabase.password, {
    host: configDatabase.host,
    dialect: configDatabase.dialect,
    logging: false,
  });

  return db
};

export const close = () => db
  ? db.close()
  : Promise.reject("DB connection didn't intialized");
