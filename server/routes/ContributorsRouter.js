const router = require("express").Router();

const contributorsCtrl = require("../controllers/contributors");

// Get all contributors
router.get("/", contributorsCtrl.getAll);
// Create a contributor with message
router.post("/:listUuid", contributorsCtrl.create);
// Get a specific contributor
router.get("/:contributorUuid", contributorsCtrl.getOne);

module.exports = router;
