const { DataTypes, literal } = require('sequelize');
const utils = require('../utils');
const tableName = 'winds';

const columns = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  direction: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  station_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  speed: {
    type: DataTypes.DECIMAL,
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
