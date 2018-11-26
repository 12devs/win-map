const { DataTypes, literal } = require('sequelize');
const utils = require('../utils');
const tableName = 'dangers';

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
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  station_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lat: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  lng: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  dangerRadius: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5000,
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
