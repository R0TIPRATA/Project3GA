const express = require("express");
const cors = require("cors");
const { sequelize, WishlistList, WishlistItem } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Create a new wishlist
app.post("/lists", async (req, res) => {
	const { listTitle, listMessage, campaignDate } = req.body;
	try {
		const wishlist_list = await WishlistList.create({
			listTitle,
			listMessage,
			campaignDate,
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
app.post("/lists/:listUuid/item", async (req, res) => {
	const {
		itemName,
		category,
		brand,
		price,
		color,
		productUrl,
		itemMessageContributor,
		itemPicture,
	} = req.body;
	const uuid = req.params.listUuid;
	try {
		const list = await WishlistList.findOne({ where: { uuid } });
		const item = await WishlistItem.create({
			itemName,
			category,
			brand,
			price,
			color,
			productUrl,
			itemMessageContributor,
			itemPicture,
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
app.delete("/items/:itemUuid", async (req, res) => {
	const uuid = req.params.itemUuid;
	try {
		const item = await WishlistItem.findOne({
			where: { uuid },
		});
		const itemName = item.itemName;
		await item.destroy();
		return res.json({ message: `Item - "${itemName}" removed!` });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
});

// Get one wishlist with all items in it
app.get("/lists/:listUuid", async (req, res) => {
	const uuid = req.params.listUuid;
	try {
		const list = await WishlistList.findOne({
			where: { uuid },
			include: "wishlistItems",
		});
		console.log(list.wishlistItems[0].uuid);
		return res.json(list);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
});

// Delete a wishlist
app.delete("/lists/:listUuid", async (req, res) => {
	const uuid = req.params.listUuid;
	try {
		const list = await WishlistList.findOne({
			where: { uuid },
			include: "wishlistItems",
		});
		const listTitle = list.listTitle;
		// Delete items that is associated with the wishlist
		for (let item of list.wishlistItems) {
			const itemList = await WishlistItem.findOne({
				where: { uuid: item.uuid },
			});
			await itemList.destroy();
		}
		// Delete wishlist itself
		await list.destroy();
		return res.json({ message: `Wishlist for ${listTitle} deleted!` });
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
