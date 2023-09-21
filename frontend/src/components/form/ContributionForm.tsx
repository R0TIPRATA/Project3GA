import { useState, useEffect } from "react";
import axios from "axios";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { TextInput, LongTextInput, AmountInput } from "./FormComponents";
import { ClientSecret, ContributorInput } from "../../types";
import { useWishList } from "../context/WishlistContext";

const AddContributionForm = ({
	clientSecretSettings,
}: {
	clientSecretSettings: ClientSecret;
}) => {
	const { selectedItem } = useWishList();
	const stripe = useStripe();
	const elements = useElements();
	const [amount, setAmount] = useState<number>(50);
	const [errorMessage, setErrorMessage] = useState<string | undefined>("");

	const fieldItems = [
		{ type: "text-input", label: "Contributor Name", name: "name", required: true },
		{ type: "text-input", label: "Contributor Email", name: "email", required: true },
		{ type: "long-text-input", label: "Message", name: "message", required: false },
		{ type: "text-input", label: "Amount", name: "amount", required:true },
	];

	const [contributor, setContributor] = useState<ContributorInput>({
		name: "",
		email: "",
		message: "",
	});

	// Update payment form amount when amount changes
	useEffect(() => {
		console.log(clientSecretSettings);
		if (clientSecretSettings.clientSecret) {
			try {
				axios({
					method: "PUT",
					url: "http://localhost:15432/contributions/updatestripepayment",
					data: {
						payment_id: clientSecretSettings.paymentId,
						amount: amount,
					},
				});
			} catch (err) {
				console.log(err);
			}
		}
	}, [amount]);

	const handleInput = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		console.log("test: ", event.target.value);
		setContributor((prev: ContributorInput) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	// Update amount input when amount changes
	const amountInput = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		console.log("amount: ", event.target.value);
		if (event.target.value === "") {
			setAmount(0);
		} else {
			setAmount(parseFloat(event.target.value));
		}
	};

	// Update amount input when amount button is clicked
	const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const button: HTMLButtonElement = event.currentTarget;
		setAmount(parseFloat(button.value));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		// Post contributor details to db
		try {
			axios({
				method: "POST",
				url: `http://localhost:15432/contributors/addcontribution/${selectedItem.uuid}`,
				data: {
					name: contributor.name,
					email: contributor.email,
					message: contributor.message,
					amount: amount,
				},
			}).then((response) => {
				console.log(response.status);
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}

		// Return to return_url after payment is made
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:5173",
			},
		});

		if (error) setErrorMessage(error.message);
	};

	return (
		<form onSubmit={handleSubmit}>
			{fieldItems.map((item, index) => {
				if (item.type === "text-input" && item.name === "amount") {
					return (
						<AmountInput
							key={index}
							label={item.label}
							name={item.name}
							handleInput={amountInput}
							value={amount.toString()}
							required = {item.required}
						/>
					);
				} else if (item.type === "text-input") {
					return (
						<TextInput
							key={index}
							label={item.label}
							name={item.name}
							handleInput={handleInput}
							required = {item.required}
						/>
					);
				} else if (item.type === "long-text-input") {
					return (
						<LongTextInput
							key={index}
							label={item.label}
							name={item.name}
							handleInput={handleInput}
							required = {item.required}
						/>
					);
				}
			})}

			<div className="justify-start items-start gap-2 inline-flex mt-3">
				<button
					className="text-center font-semibold bg-neutral-100 rounded-3xl"
					value="50"
					onClick={buttonHandler}
				>
					$50
				</button>
				<button
					className="text-center font-semibold bg-neutral-100 rounded-3xl"
					value="100"
					onClick={buttonHandler}
				>
					$100
				</button>
				<button
					className="text-center font-semibold bg-neutral-100 rounded-3xl"
					value="150"
					onClick={buttonHandler}
				>
					$150
				</button>
				<button
					className="text-center font-semibold bg-neutral-100 rounded-3xl"
					value="200"
					onClick={buttonHandler}
				>
					$200
				</button>
			</div>

			<div className="text-xl font-semibold mt-3 mb-3">
				Select payment method:
			</div>
			<div>
				<PaymentElement />
			</div>
			<div>
				{errorMessage && <div>{errorMessage}</div>}
				<button
					type="submit"
					className="btn btn-primary drawer-button mt-4"
					disabled={!stripe}
				>
					Make Contribution
				</button>
			</div>
		</form>
	);
};

export default AddContributionForm;
