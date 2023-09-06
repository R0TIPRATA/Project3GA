"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable("wishlist_lists", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			listTitle: { type: DataTypes.STRING, allowNull: false },
			listMessage: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			campaignDate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("wishlist_lists");
	},
};
