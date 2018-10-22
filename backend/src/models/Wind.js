module.exports = (sequelize, DataTypes) => {
  const Wind = sequelize.define('Wind', {
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
    tableName: 'winds',
    timestamps: true,
    paranoid: true
  });

  Wind.associate = models => {

  };

  return Wind;

};
