const { DataTypes, literal } = require('sequelize');
const utils = require('../utils');

const tableName = 'accounts';

const columns = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING(255),
    defaultValue: '',
    unique: true,
    allowNull: false,
  },
  encrypted_password: {
    type: DataTypes.STRING(255),
    defaultValue: '',
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  changePasswordCode: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING(255),
    defaultValue: '',
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
