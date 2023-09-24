const router = require("express").Router();
const isUserAuthenticated = require("../Middleware/isUserAuthenticated");
const itemsCtrl = require("../controllers/wishlist_items");

// Get all items in db
router.get("/", itemsCtrl.getAll);
//Get accumulated sum of one item in db
router.get("/sum/:itemId", itemsCtrl.getAccumulatedAmount);
//Get one item in db
router.get("/:itemUuid", itemsCtrl.getOne);
// Create an item in a wishlist
router.post("/:listUuid", isUserAuthenticated, itemsCtrl.create);
// Delete an item
router.delete("/:itemUuid", isUserAuthenticated, itemsCtrl.delete);
// Update an item details
router.put("/:itemUuid", isUserAuthenticated, itemsCtrl.updateItem);
// Update an item's accumulatedAmount

module.exports = router;
