const config = require("config")

let configDatabase = config.database;

if (process.env.NODE_ENV = 'test') {
  configDatabase = config.database_test;
}

module.exports = {
  username: configDatabase.username,
  password: configDatabase.password,
  database: configDatabase.database,
  host: configDatabase.host,
  dialect: configDatabase.dialect
}
