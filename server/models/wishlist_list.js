"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class WishlistList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ WishlistItem }) {
			// define association here
			this.hasMany(WishlistItem, {
				foreignKey: "wishlistId",
				as: "wishlistItems",
			});
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	WishlistList.init(
		{
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			listName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Wishlist must have a name" },
					notEmpty: { msg: "Wishlist name must not be empty" },
				},
			},
			totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
		},
		{
			sequelize,
			tableName: "wishlist_lists",
			modelName: "WishlistList",
		}
	);
	return WishlistList;
};
