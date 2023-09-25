require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Contributor, MessageList, WishlistList, WishlistItem, Contribution } = require("../models");

module.exports = {
	createStripePayment,
	getPublishableKey,
	updateStripePayment,
	confirmStripePayment,
	addContribution,
	getContribution,
};

async function createStripePayment(req, res) {
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

async function updateStripePayment(req, res) {
	const { amount, payment_id } = req.body;
	if (amount > 0) {
		const paymentIntent = await stripe.paymentIntents.update(payment_id, {
			amount: amount * 100,
		});
	}
}

async function confirmStripePayment(req, res) {
	const { payment_id } = req.body;
	const paymentIntent = await stripe.paymentIntents.confirm(payment_id);
	return res.json(paymentIntent);
}

async function addContribution(req, res) {
	const { name, email, message, amount } = req.body;
	const uuid = req.params.itemUuid; 
	try {
		const item = await WishlistItem.findOne({
			where: { uuid },
		})
		const list = await WishlistList.findOne({
			where: { id: item.wishlistId }
		})
    let contributor = await Contributor.findOne({ where: { email } });
    if (!contributor) {
      contributor = await Contributor.create({
        name,
        email,
        wishlistId: list.id,
      });
    }
		const messageList = await MessageList.create({
			message, 
			contributorId: contributor.id,
			wishlistId: list.id,
		})
		const contribution = await Contribution.create({
			amount, 
			contributorId: contributor.id,
			wishlistItemId: item.id,
		})
		return res.json(contribution);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}

async function getContribution(req, res){
	try {
		const contributions = await Contribution.findAll({
			include: ["wishlistItem", "contributor"],
		});
		return res.json(contributions);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
}