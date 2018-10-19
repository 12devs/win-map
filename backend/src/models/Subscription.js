module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    place_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    danger_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    last_message: {
      type: DataTypes.STRING(255),
      defaultValue: '',
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
    tableName: 'subscriptions',
    timestamps: true,
    paranoid: true
  });

  Subscription.associate = models => {
    Subscription.belongsTo(models.Account, {
      as: "subscriptions",
      foreignKey: "account_id"
    });
  };

  return Subscription;

};
