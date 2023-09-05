"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable("wishlist_items", {
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			itemName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			brand: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			accumulatedAmount: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			wishlistId: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
		await queryInterface.dropTable("wishlist_items");
	},
};
