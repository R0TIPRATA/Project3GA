const router = require("express").Router();

const itemsCtrl = require("../controllers/wishlist_items");

// Get all items in db
router.get("/", itemsCtrl.getAll);
// Create an item in a wishlist
router.post("/:listUuid", itemsCtrl.create);
// Delete an item
router.delete("/:itemUuid", itemsCtrl.delete);
// Update an item details
router.put("/:itemUuid", itemsCtrl.updateItem);

module.exports = router;
