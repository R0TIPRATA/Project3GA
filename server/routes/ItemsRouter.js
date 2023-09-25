const router = require("express").Router();
const isUserAuthenticated = require("../Middleware/isUserAuthenticated");
const itemsCtrl = require("../controllers/wishlist_items");

// Get all items in db
router.get("/", itemsCtrl.getAll);
//Get accumulated sum of one item in db
router.get("/sum/:itemId", itemsCtrl.getAccumulatedAmount);
// Get accumulated sum of all items in db 
router.get("/sumAll", itemsCtrl.getAllAccumulatedAmount)
//Get one item in db
router.get("/:itemUuid", itemsCtrl.getOne);
// Create an item in a wishlist
router.post("/:listUuid", isUserAuthenticated, itemsCtrl.create);
// Delete an item
router.delete("/:itemUuid", isUserAuthenticated, itemsCtrl.delete);
// Update an item details
router.put("/:itemUuid", isUserAuthenticated, itemsCtrl.updateItem);

module.exports = router;
