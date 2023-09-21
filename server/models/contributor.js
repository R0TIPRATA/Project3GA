"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Contributor extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ MessageList, WishlistList, Contribution }) {
			// define association here
			this.hasMany(MessageList, {
				foreignKey: "contributorId",
				as: "messagelist",
			});
			this.belongsTo(WishlistList, {
				foreignKey: "wishlistId",
				as: "wishlist",
			});
			this.hasMany(Contribution, {
				foreignKey: "contributorId",
				as: "contributions",
			})
		}

		// toJSON() {
		// 	return { ...this.get(), id: undefined };
		// }
	}
	Contributor.init(
		{
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Contributor must have a name" },
					notEmpty: { msg: "Contributor name must not be empty" },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Contributor must have an email" },
					notEmpty: { msg: "Contributor email must not be empty" },
					isEmail: { msg: "Email must be a valid email address" },
				},
			},
			relationship: {
				type: DataTypes.STRING,
				allowNull: true,
				// validate: {
				// 	notNull: { msg: "Contributor must have a relationship" },
				// 	notEmpty: { msg: "Contributor relationship must not be empty" },
				// },
			},
		},
		{
			sequelize,
			tableName: "contributors",
			modelName: "Contributor",
		}
	);
	return Contributor;
};
