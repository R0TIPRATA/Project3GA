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
  uuid: string;
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
  value?: string | number | undefined;
  required: boolean;
  min?: string;
  handleInput?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPicture?: string | null;
};

export type AmountInputField = {
  label: string;
  name: string;
  required: boolean;
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
  uuid: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  wishlistId: string;
  message?: string;
};

export type Message = {
  id: string;
  uuid: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  contributorId: string;
  contributor: Contributor;
};

export type User = {
  username: string;
  password: string;
};

export type Token = {
  username: string | null;
  token: string | null;
};

export type WishlistDetails = {
  listTitle: string;
  listMessage?: string | undefined;
  campaignDate?: string;
};

export type DeleteModalProps = {
  handleToggle: () => void;
  open: boolean;
};
