const router = require("express").Router();
const isUserAuthenticated = require("../Middleware/isUserAuthenticated");
const itemsCtrl = require("../controllers/wishlist_items");

// Get all items in db
router.get("/", itemsCtrl.getAll);
// Create an item in a wishlist
router.post("/:listUuid", isUserAuthenticated, itemsCtrl.create);
// Delete an item
router.delete("/:itemUuid", isUserAuthenticated, itemsCtrl.delete);
// Update an item details
router.put("/:itemUuid", isUserAuthenticated, itemsCtrl.updateItem);

module.exports = router;
