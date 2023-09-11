const router = require("express").Router();

const listsCtrl = require("../controllers/wishlist_lists");

// Get all wishlists in db
router.get("/", listsCtrl.getAll);
// Create a new wishlist
router.post("/", listsCtrl.create);
// Delete a wishlist from db
router.delete("/:listUuid", listsCtrl.delete);
// Get one wishlist with all items in it from db
router.get("/:listUuid", listsCtrl.getOneList);
// Update wishlist info
router.put("/:listUuid", listsCtrl.updateList);

module.exports = router;
