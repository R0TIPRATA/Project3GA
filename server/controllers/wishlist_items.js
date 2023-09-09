const { WishlistList, WishlistItem } = require("../models");

module.exports = {
	getAll,
	create,
	delete: deleteItem,
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
		return res.status(500).json(err);
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
		return res.status(500).json(err);
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
		return res.status(500).json({ error: "Something went wrong!" });
	}
}
