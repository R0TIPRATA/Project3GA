'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ WishlistItem, Contributor }) {
      // define association here
      this.belongsTo(WishlistItem, {
        foreignKey: "wishlistItemId", 
        as: "wishlistItem",
      })
      this.belongsTo(Contributor, {
        foreignKey: "contributorId",
        as: "contributor",
      } )
    }
  }
  Contribution.init({
    amount: DataTypes.FLOAT,
    wishlistItemId: DataTypes.INTEGER,
    contributorId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: "contributions",
    modelName: 'Contribution',
  });
  return Contribution;
};