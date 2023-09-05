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
			listName: { type: DataTypes.STRING, allowNull: false },
			totalAmount: {
				type: DataTypes.FLOAT,
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
