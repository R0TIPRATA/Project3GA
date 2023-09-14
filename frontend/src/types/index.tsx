export type Wishlist = {
	uuid: string;
	listTitle: string;
	listMessage: string | undefined;
	campaignDate: string;
	createdAt: string;
	updatedAt: string;
	wishlistItems: Item[];
};

export type Item = {
	uuid?: string;
	itemStatus: boolean;
	accumulatedAmount: number;
	itemName: string;
	itemPicture: string;
	category: string;
	brand: string;
	price: number;
	color: string;
	productUrl: string | undefined;
	itemMessageContributor: string | undefined;
	updatedAt?: Date;
	createdAt?: Date;
};

export type InputField = {
	label: string;
	name: string;
	handleInput: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
};

export type AmountInputField = {
	label: string;
	name: string;
	handleInput: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	value: string | undefined;
};

export type ClientSecret = {
	clientSecret: string;
	paymentId: string;
	loading: boolean;
};

export type Contributor = {
	name: string;
	email: string;
	message: string | undefined;
};
