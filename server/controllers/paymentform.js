require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
	createPayment,
	getPublishableKey,
	updatePayment,
	confirmPayment,
};

async function createPayment(req, res) {
	const { amount } = req.body;
	// console.log(amount);
	if (amount > 0) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: "sgd",
			// automatic_payment_methods: {
			// 	enabled: true,
			// },
			payment_method_types: ["paynow", "grabpay"],
		});
		return res.json({
			client_secret: paymentIntent.client_secret,
			payment_id: paymentIntent.id,
		});
	}
}

async function getPublishableKey(req, res) {
	return res.json(process.env.STRIPE_PUBLISHABLE_KEY);
}

async function updatePayment(req, res) {
	const { amount, payment_id } = req.body;
	if (amount > 0) {
		const paymentIntent = await stripe.paymentIntents.update(payment_id, {
			amount: amount * 100,
		});
	}
}

async function confirmPayment(req, res) {
	const { payment_id } = req.body;
	const paymentIntent = await stripe.paymentIntents.confirm(payment_id);
	return res.json(paymentIntent);
}
