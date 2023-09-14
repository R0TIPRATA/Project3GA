const { WishlistList, WishlistItem } = require("../models");

module.exports = {
	getAll,
	create,
	delete: deleteItem,
	updateItem,
};

// Get all items in db
async function getAll(req, res) {
	try {
		const items = await WishlistItem.findAll({
			include: "wishlist",
		});
		return res.json(items);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

// Create an item in a wishlist
async function create(req, res) {
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
		return res.json(err);
	}
}

// Delete an item
async function deleteItem(req, res) {
	const uuid = req.params.itemUuid;
	try {
		const item = await WishlistItem.findOne({
			where: { uuid },
		});
		const itemName = item.itemName;
		await item.destroy();
		return res.json({ message: `Item - ${itemName} removed!` });
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

async function updateItem(req, res) {
	const uuid = req.params.itemUuid;
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
	try {
		const item = await WishlistItem.findOne({
			where: { uuid },
		});
		item.itemName = itemName;
		item.category = category;
		item.brand = brand;
		item.price = price;
		item.color = color;
		item.productUrl = productUrl;
		item.itemMessageContributor = itemMessageContributor;
		item.itemPicture = itemPicture;
		await item.save();
		return res.json(item);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}
