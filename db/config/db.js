const config = require("config")

module.exports = {
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  host: config.database.host,
  dialect: config.database.dialect
}