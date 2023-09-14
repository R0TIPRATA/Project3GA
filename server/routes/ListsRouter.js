const router = require("express").Router();

const isUserAuthenticated = require("../Middleware/isUserAuthenticated");
const listsCtrl = require("../controllers/wishlist_lists");

// Get all wishlists in db
// router.get("/", isUserAuthenticated, listsCtrl.getAll);
// Create a new wishlist
router.post("/", isUserAuthenticated, listsCtrl.create);
// Get all user's wishlists in db
router.get("/user/:username", isUserAuthenticated, listsCtrl.getAll);
// Delete a wishlist from db
router.delete("/:listUuid", isUserAuthenticated,listsCtrl.delete);
// Get one wishlist with all items in it from db
router.get("/:listUuid", isUserAuthenticated, listsCtrl.getOneList);
// Update wishlist info
router.put("/:listUuid", isUserAuthenticated, listsCtrl.updateList);

module.exports = router;
