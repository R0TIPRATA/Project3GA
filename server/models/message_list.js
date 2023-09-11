"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class MessageList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Contributor }) {
			// define association here
			this.belongsTo(Contributor, {
				foreignKey: "contributorId",
				as: "contributor",
			});
		}

		// toJSON() {
		// 	return { ...this.get(), id: undefined, contributorId: undefined };
		// }
	}
	MessageList.init(
		{
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			message: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "message_lists",
			modelName: "MessageList",
		}
	);
	return MessageList;
};
