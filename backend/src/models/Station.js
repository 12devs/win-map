module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
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
    direction: {
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    tableName: 'stations',
    timestamps: true,
    paranoid: true
  });

  Station.associate = models => {};

  return Station;

};
