'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ WishlistList }) {
      // define association here
      this.hasMany(WishlistList, {
        foreignKey: "userId",
        as: "wishlistLists",
      })
    }
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: { args: true, msg: "Username already exists!"},
      validate: {
        notNull: { msg: "User must have a name" },
        notEmpty: { msg: "User name must not be empty" },
      },
    },
    password: {type: DataTypes.STRING, allowNull: false},
  }, {
    sequelize,
    tableName: "users",
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  });
  return User;
};