import { ReactNode, createContext, useContext, useState } from "react";
import { Wishlist, Item, Token } from "../../types";
import toast from 'react-hot-toast';


type WishlistProviderProps = {
  children: ReactNode;
};

type WishListContext = {
  wishlists: Wishlist[];
  setWishlists: React.Dispatch<React.SetStateAction<Wishlist[]>>;
  wishlist: Wishlist;
  setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>;
  deleteWishlist: (deletedWishlistUUID: string) => void;
  addWishlist: (wishlist: Wishlist) => void;
  editFormType: string;
  setEditFormType: React.Dispatch<React.SetStateAction<string>>;
  wishlistCampaignIsOver: boolean
  setWishlistCampaignIsOver: React.Dispatch<React.SetStateAction<boolean>>
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (deletedItemUUID: string) => void;
  userToken: Token;
  setUserToken: React.Dispatch<React.SetStateAction<Token>>;
  selectedItem: Item;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item>>;
  notifySuccess: (message:string) => void;
  notifyError: () => void;
};

const WishlistContext = createContext({} as WishListContext);

const defaultItem = {
  uuid: "",
  id: "",
  itemStatus: false,
  itemName: "",
  itemPicture: "",
  category: "",
  brand: "",
  price: 0,
  color: "",
  productUrl: "",
  itemMessageContributor: "",
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishList = () => {
  return useContext(WishlistContext);
};

export function WishlistProvider({ children }: WishlistProviderProps) {
  //wishlists array (multiple)
  const [wishlists, setWishlists] = useState<Wishlist[]>([{} as Wishlist]);

  const deleteWishlist = (deletedWishlistUUID: string) => {
    const newWishlistArr = wishlists.filter((list) => {
      return list.uuid !== deletedWishlistUUID;
    });
    setWishlists(newWishlistArr);
  };
  const addWishlist = (wishlist: Wishlist) => {
    setWishlists([...wishlists, wishlist]);
  };

  //wishlist related
  const [wishlist, setWishlist] = useState<Wishlist>({} as Wishlist);
  const [wishlistCampaignIsOver, setWishlistCampaignIsOver] = useState(false)
  const [editFormType, setEditFormType] = useState("");

  //item related
  const [selectedItem, setSelectedItem] = useState<Item>(defaultItem);
  const addItem = (newItem: Item) => {
    setWishlist({
      ...wishlist,
      wishlistItems: [...wishlist.wishlistItems, newItem],
    });
  };

  const updateItem = (newItem: Item) => {
    const newItemsArr = wishlist.wishlistItems.map((wishlistItem: Item) => {
      return wishlistItem.uuid === newItem.uuid ? newItem : wishlistItem;
    });
    setWishlist({
      ...wishlist,
      wishlistItems: newItemsArr,
    });
  };

  const deleteItem = (selectedItemUUID: string) => {
    const newItemsArr = wishlist.wishlistItems.filter((list) => {
      return list.uuid !== selectedItemUUID;
    });
    setWishlist({
      ...wishlist,
      wishlistItems: newItemsArr,
    });
  };

  //login related
  const [userToken, setUserToken] = useState<Token>(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return token
      ? { username: username, token: token }
      : { username: null, token: null };
  });

  //show toaster
  const notifySuccess = (message:string) => toast.success(message);
  const notifyError = () => toast.error("An error occured. Please try again.");

  return (
    <WishlistContext.Provider
      value={{
        //wishlists-related
        wishlists,
        setWishlists,
        wishlist,
        setWishlist,
        deleteWishlist,
        addWishlist,
        editFormType,
        setEditFormType,
        wishlistCampaignIsOver,
        setWishlistCampaignIsOver,
        //item-related
        selectedItem,
        setSelectedItem,
        addItem,
        updateItem,
        deleteItem,
        //login-related
        userToken,
        setUserToken,
        //toaster related
        notifySuccess,
        notifyError,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
