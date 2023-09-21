"use strict";
const { Model } = require("sequelize");
// Convert new Date to local date (Singapore's timezone)
// const localdate = new Date(new Date().toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Singapore' }))

module.exports = (sequelize, DataTypes) => {
	class WishlistList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ WishlistItem, Contributor, User, MessageList }) {
			// define association here
			this.hasMany(WishlistItem, {
				foreignKey: "wishlistId",
				as: "wishlistItems",
			});
			this.hasMany(Contributor, {
				foreignKey: "wishlistId",
				as: "contributors",
			});
			this.belongsTo(User, {
				foreignKey: "userId",
				as: "user",
			})
			this.hasMany(MessageList, {
				foreignKey: "wishlistId",
				as: "messageList",
			})
		}

		// toJSON() {
		// 	return { ...this.get(), id: undefined };
		// }
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
				// If date input is empty, default will be today's Date + 180 days (6 months)
				// defaultValue: new Date(localdate.setDate(localdate.getDate() + 180)).toJSON().slice(0, 10)
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
