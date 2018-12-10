import config from 'config';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Account', {
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
    attemptsCode: {
      type: DataTypes.INTEGER(),
      defaultValue: 0,
    },
    attemptsChangePasswordCode: {
      type: DataTypes.INTEGER(),
      defaultValue: 0,
    },
    email: {
      type: DataTypes.STRING(255),
      defaultValue: '',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    tableName: 'accounts',
    timestamps: true,
    paranoid: true
  });

  Accounts.associate = models => {
    Accounts.hasMany(models.Danger, {
      as: 'dangers',
      foreignKey: 'account_id'
    });
    Accounts.hasMany(models.Place, {
      as: 'places',
      foreignKey: 'account_id'
    });
    Accounts.hasMany(models.Subscription, {
      as: 'subscriptions',
      foreignKey: 'account_id'
    });
    Accounts.hasMany(models.Device, {
      as: 'devices',
      foreignKey: 'account_id'
    });
    Accounts.hasMany(models.Notification, {
      as: 'notifications',
      foreignKey: 'account_id'
    });
  };

  Accounts.prototype.comparePassword = async function (password) {
    try {
      const isCompared = bcrypt.compareSync(password, this.encrypted_password);
      if (!isCompared) {
        throw new Error('Compare passwords error');
      }
      return true;
    } catch (err) {
      throw new Error (err);
    }
  };

  Accounts.prototype.encryptPassword = function (password) {
    try {
      // assert.ok(password, this.t('passwordErrorMessage'))
      const saltRound = config.auth.saltRound;
      this.salt = bcrypt.genSaltSync(saltRound);

      this.encrypted_password = bcrypt.hashSync(password, this.salt);
    } catch (err) {
      throw new Error (err);
    }
  };

  Accounts.prototype.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      login: this.login,
      id: this.id,
      // exp: 1539606285,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, config.auth.secret);
  };

  Accounts.prototype.toAuthJSON = function() {
    return {
      id: this.id,
      login: this.login,
      token: this.generateJWT(),
    };
  };

  return Accounts;
};
