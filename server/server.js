const express = require("express");
const cors = require("cors");
const { sequelize, WishlistList, WishlistItem } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Create a new wishlist
app.post("/lists", async (req, res) => {
	const { listName, totalAmount } = req.body;
	try {
		const wishlist_list = await WishlistList.create({
			listName,
			totalAmount,
		});
		return res.json(wishlist_list);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Get all wishlists
app.get("/lists", async (req, res) => {
	try {
		const lists = await WishlistList.findAll();
		return res.json(lists);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
});

// Create item in a wishlist
app.post("/lists/:uuid/item", async (req, res) => {
	const { itemName, brand, price, image } = req.body;
	const uuid = req.params.uuid;
	try {
		const list = await WishlistList.findOne({ where: { uuid } });
		const item = await WishlistItem.create({
			itemName,
			brand,
			price,
			image,
			wishlistId: list.id,
		});
		return res.json(item);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Get all items
app.get("/items", async (req, res) => {
	try {
		const items = await WishlistItem.findAll({
			include: "wishlist",
		});
		return res.json(items);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Delete item
app.delete("/items/:uuid", async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const item = await WishlistItem.findOne({
			where: { uuid },
		});
		await item.destroy();
		return res.json({ message: "Items deleted!" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
});

// Get one wishlist with all items in it
app.get("/lists/:uuid", async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const list = await WishlistList.findOne({
			where: { uuid },
			include: "wishlistItems",
		});
		return res.json(list);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
});

// Delete a wishlist
app.delete("/lists/:uuid", async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const list = await WishlistList.findOne({
			where: { uuid },
		});
		await list.destroy();
		return res.json({ message: "Wishlist deleted!" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
});

app.listen({ port: 15432 }, async () => {
	console.log("Server up on http://localhost:15432");
	await sequelize.authenticate();
	console.log("Database connected!");
});
