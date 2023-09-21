const router = require("express").Router();
const messagesCtrl = require("../controllers/messages");

// Get all messages by contributors
router.get("/", messagesCtrl.getAll);
// Create a message by specific contributors
// router.post("/:contributorUuid", messagesCtrl.create);
router.get("/:listUuid", messagesCtrl.getAllByListUuid)

module.exports = router;
