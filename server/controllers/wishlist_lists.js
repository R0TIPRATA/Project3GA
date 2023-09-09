const { WishlistList, WishlistItem } = require("../models");

module.exports = {
	getAll,
	create,
	delete: deleteList,
	getOneList,
};

// Get all wishlists in db
async function getAll(req, res) {
	try {
		const lists = await WishlistList.findAll();
		return res.json(lists);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
}

// Create a new wishlist
async function create(req, res) {
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
}

// Delete a wishlist
async function deleteList(req, res) {
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
}

// Get one wishlist with all items in it from db
async function getOneList(req, res) {
	const uuid = req.params.listUuid;
	try {
		const list = await WishlistList.findOne({
			where: { uuid },
			include: ["wishlistItems", "contributors"],
		});
		return res.json(list);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong!" });
	}
}
