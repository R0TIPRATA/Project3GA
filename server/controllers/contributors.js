const { Contributor, MessageList, WishlistList } = require("../models");

module.exports = {
	getAll,
	create,
	getOne,
};

async function getAll(req, res) {
	try {
		const contributors = await Contributor.findAll({
			include: "messagelist",
		});
		return res.json(contributors);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

async function create(req, res) {
	const { name, email, message } = req.body;
	const uuid = req.params.listUuid;
	try {
		const list = await WishlistList.findOne({ where: { uuid } });
		const contributor = await Contributor.create({
			name,
			email,
			wishlistId: list.id,
		});
		const messageList = await MessageList.create({
			message,
			contributorId: contributor.id,
		});
		return res.json(contributor);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

async function getOne(req, res) {
	const uuid = req.params.contributorUuid;
	try {
		const contributor = await Contributor.findOne({
			where: { uuid },
			include: "messagelist",
		});
		return res.json(contributor);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}
