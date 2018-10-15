const { DataTypes, literal } = require('sequelize');
const utils = require('../utils');

const tableName = 'emails';

const columns = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  },
  deleted_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
};

module.exports = utils.createTableUpDown(tableName, columns);
