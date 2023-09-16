import { ReactNode, createContext, useContext, useState } from "react";
import { Wishlist, Item, Token } from "../../types";

type WishlistProviderProps = {
  children: ReactNode;
};

type WishListContext = {
  wishlist: Wishlist
  setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>
  addItem: (item: Item) => void
  updateItem: (item: Item) => void
  userToken: Token
  setUserToken: React.Dispatch<React.SetStateAction<Token>>
  selectedItem: Item
  setSelectedItem: React.Dispatch<React.SetStateAction<Item>>
};

const WishlistContext = createContext({} as WishListContext);

const defaultItem = {
  uuid: "",
  itemStatus: false,
  accumulatedAmount: 0,
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
  const [wishlist, setWishlist] = useState<Wishlist>({} as Wishlist);
  const [selectedItem, setSelectedItem] = useState<Item>(defaultItem);
  const [userToken, setUserToken] = useState<Token>(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return token
      ? { username: username, token: token }
      : { username: null, token: null };
  });

  const addItem = (newItem: Item) => {
    setWishlist({
      ...wishlist,
      wishlistItems: [...wishlist.wishlistItems, newItem],
    });
  };

  const updateItem = (newItem:Item) => {
    const newItemsArr = wishlist.wishlistItems.map( (wishlistItem:Item) => { 
        return wishlistItem.uuid === newItem.uuid ? newItem : wishlistItem
    })
    setWishlist({
        ...wishlist, 
        wishlistItems: newItemsArr
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addItem,
        updateItem,
        userToken,
        setUserToken,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
