const router = require("express").Router();

const usersCtrl = require("../controllers/users");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.get("/loggedIn", usersCtrl.loggedIn);
router.get('/logout', usersCtrl.logout);
router.get("/:username", usersCtrl.getUser);

module.exports = router;