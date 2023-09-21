const { MessageList, WishlistList } = require("../models");
module.exports = {
	getAll,
	getAllByListUuid,
};

async function getAll(req, res) {
	try {
		const messageLists = await MessageList.findAll({
			include: "contributor",
		});
		return res.json(messageLists);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

async function getAllByListUuid(req, res) {
	const uuid = req.params.listUuid;
	try {
		const wishlist = await WishlistList.findOne({
			where: { uuid },
		})
		const messages = await MessageList.findAll({
			where: { wishlistId: wishlist.id },
			include: "contributor",
			attributes: {
				exclude: ["wishlistId"],
			}
		})
		return res.json(messages);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}