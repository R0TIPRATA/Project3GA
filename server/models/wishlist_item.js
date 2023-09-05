"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class WishlistItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ WishlistList }) {
			// define association here
			this.belongsTo(WishlistList, {
				foreignKey: "wishlistId",
				as: "wishlist",
			});
		}

		toJSON() {
			return { ...this.get(), id: undefined, wishlistId: undefined };
		}
	}
	WishlistItem.init(
		{
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			itemName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Item must have a name" },
					notEmpty: { msg: "Item name must not be empty" },
				},
			},
			brand: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Item must have a brand" },
					notEmpty: { msg: "Item brand must not be empty" },
				},
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					notNull: { msg: "Item must have a price" },
					notEmpty: { msg: "Item price must not be empty" },
				},
			},
			image: { type: DataTypes.STRING, allowNull: false },
			status: { type: DataTypes.BOOLEAN, defaultValue: false },
			accumulatedAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
		},
		{
			sequelize,
			tableName: "wishlist_items",
			modelName: "WishlistItem",
		}
	);
	return WishlistItem;
};
