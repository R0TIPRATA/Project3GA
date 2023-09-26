const router = require("express").Router();
const contributionCtrl = require("../controllers/contribution");

router.get("/", contributionCtrl.getPublishableKey);
router.post("/createstripepayment", contributionCtrl.createStripePayment);
router.put("/updatestripepayment", contributionCtrl.updateStripePayment);
router.get("/confirmstripepayment", contributionCtrl.confirmStripePayment);
router.post("/addcontribution/:itemUuid", contributionCtrl.addContribution);
router.get("/getcontribution", contributionCtrl.getContribution);

module.exports = router;
