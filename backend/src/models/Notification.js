module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
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
      // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
    tableName: 'notifications',
    timestamps: true,
    paranoid: true
  });

  Notification.associate = models => {
    Notification.belongsTo(models.Account, {
      as: "account",
      foreignKey: "account_id"
    });
  };

  return Notification;

};
