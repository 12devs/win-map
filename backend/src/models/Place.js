module.exports = (sequelize, DataTypes) => {
  const Places = sequelize.define('Place', {
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
    tableName: 'places',
    timestamps: true,
    paranoid: true
  });

  Places.associate = models => {
    Places.belongsTo(models.Account, {
      as: "places",
      foreignKey: "account_id"
    });
    Places.hasMany(models.Subscription, {
      as: "subscription",
      foreignKey: "place_id"
    });
  };

  return Places;

};