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
			listTitle: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Wishlist must have a name" },
					notEmpty: { msg: "Wishlist name must not be empty" },
				},
			},
			listMessage: { type: DataTypes.STRING, allowNull: true },
			campaignDate: {
				type: DataTypes.DATE,
				allowNull: true,
				// If date input is empty, default will be today's Date + 30 days
				defaultValue: new Date().setDate(new Date().getDate() + 30),
			},
		},
		{
			sequelize,
			tableName: "wishlist_lists",
			modelName: "WishlistList",
		}
	);
	return WishlistList;
};
