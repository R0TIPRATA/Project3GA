const { MessageList } = require("../models");
module.exports = {
	getAll,
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
