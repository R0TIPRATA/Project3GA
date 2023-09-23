const router = require("express").Router();

const usersCtrl = require("../controllers/users");

// router.get("/:username", usersCtrl.getUser);
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;