import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import AddPaymentForm from "./PaymentForm";
import { ClientSecret } from "../../types";

const initStripe = async () => {
	const res = await axios.get("http://localhost:15432/payments");
	console.log("key => "  +  res )
	const publishableKey = await res.data;
	return loadStripe(publishableKey);
};

const AddContributorForm = () => {
	const stripePromise = initStripe();
	const [clientSecretSettings, setClientSecretSettings] =
		useState<ClientSecret>({
			clientSecret: "",
			paymentId: "",
			loading: true,
		});

	useEffect(() => {
		// console.log(amount);
		// Create initial payment page form with $50 amount
		const createPaymentIntent = async () => {
			try {
				axios({
					method: "POST",
					url: "http://localhost:15432/payments/createpayment",
					data: {
						amount: 50,
					},
				}).then((response) => {
					// console.log(response.data);
					setClientSecretSettings({
						clientSecret: response.data.client_secret,
						paymentId: response.data.payment_id,
						loading: false,
					});
				});
			} catch (err) {
				console.log(err);
			}
		};
		createPaymentIntent();
	}, []);

	return (
		<div className=" bg-slate-50 p-8 rounded-3xl">
			<div className="text-xl font-semibold">Your details</div>
			<div>
				Note: your message will be displayed in the wishlist for the user
				and other contributors to see.
			</div>

			<div className="mt-3 mb-3">
				{clientSecretSettings.loading ? (
					<h2>Loading ...</h2>
				) : (
					<Elements
						stripe={stripePromise}
						options={{
							clientSecret: clientSecretSettings.clientSecret,
							appearance: { theme: "stripe" },
						}}
					>
						<AddPaymentForm clientSecretSettings={clientSecretSettings} />
					</Elements>
				)}
			</div>
		</div>
	);
};

export default AddContributorForm;
