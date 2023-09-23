"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class WishlistItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ WishlistList, Contribution }) {
			// define association here
			this.belongsTo(WishlistList, {
				foreignKey: "wishlistId",
				as: "wishlist",
			});
			this.hasMany(Contribution, {
				foreignKey: "wishlistItemId",
				as: "contributions",
			})
		}

		// toJSON() {
		// 	return { ...this.get(), id: undefined, wishlistId: undefined };
		// }
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
			category: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Item must have a category" },
					notEmpty: { msg: "Item category must not be empty" },
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
			color: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Item must have a color" },
					notEmpty: { msg: "Item color must not be empty" },
				},
			},
			productUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			itemMessageContributor: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			itemPicture: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Item must have a picture" },
					notEmpty: { msg: "Item picture must not be empty" },
				},
			},
			itemStatus: { type: DataTypes.BOOLEAN, defaultValue: false },
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
