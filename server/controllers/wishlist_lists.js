const { WishlistList, WishlistItem, User } = require("../models");

module.exports = {
	getAll,
	create,
	delete: deleteList,
	getOneList,
	updateList,
};

// Get all wishlists in db
async function getAll(req, res) {
	const { username } = req.params;
	try {
		const user = await User.findOne({ where: {   username } });
		const lists = await WishlistList.findAll({ 
			where: { userId: user.id },
			include: ["wishlistItems"]});
		return res.json(lists);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

// Create a new wishlist
async function create(req, res) {
	const { listTitle, listMessage, campaignDate, username } = req.body;
	try {
		const user = await User.findOne({ where: { username } });
		const wishlist_list = await WishlistList.create({
			listTitle,
			listMessage,
			campaignDate: campaignDate === "" ? undefined : campaignDate,
			userId: user.id,
		});
		return res.json(wishlist_list);
	} catch (err) {
		console.log(err);
		return res.json(err);
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
		return res.json(err);
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
		return res.json(err);
	}
}

// Update wishlist info
async function updateList(req, res) {
	const uuid = req.params.listUuid;
	const { listTitle, listMessage, campaignDate } = req.body;
	try {
		const list = await WishlistList.findOne({ where: { uuid } });
		list.listTitle = listTitle;
		list.listMessage = listMessage;
		list.campaignDate = campaignDate;
		await list.save();
		return res.json(list);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}
