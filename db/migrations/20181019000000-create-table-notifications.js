const { DataTypes, literal } = require('sequelize');
const utils = require('../utils');

const tableName = 'notifications';

const columns = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  account_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING(255),
    defaultValue: '',
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    // allowNull: false,
    // defaultValue: literal('CURRENT_TIMESTAMP'),
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
