const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentform");

router.get("/", paymentCtrl.getPublishableKey);
router.post("/createpayment", paymentCtrl.createPayment);
router.put("/updatepayment", paymentCtrl.updatePayment);
router.get("/confirmpayment", paymentCtrl.confirmPayment);

module.exports = router;
