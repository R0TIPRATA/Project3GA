import { ReactNode, createContext, useContext, useState } from "react";
import { Wishlist, Item, Token } from "../../types";

type WishlistProviderProps = {
  children: ReactNode;
};

type WishListContext = {
  wishlists: Wishlist[]
  setWishlists: React.Dispatch<React.SetStateAction<Wishlist[]>>
  wishlist: Wishlist
  setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>
  deleteWishlist: (deletedWishlistUUID: string) => void
  addWishlist: (wishlist: Wishlist) => void
  editFormType: string
  setEditFormType: React.Dispatch<React.SetStateAction<string>>
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
  //wishlists array (multiple)
  const [wishlists, setWishlists] = useState<Wishlist[]>([{} as Wishlist]);
  const deleteWishlist = (deletedWishlistUUID: string)  => {
    const newWishlistArr = wishlists.filter(list => { 
      return list.uuid !== deletedWishlistUUID
    })
    setWishlists(newWishlistArr)
  };
  const addWishlist = (wishlist: Wishlist) => {
    setWishlists([...wishlists, wishlist]);
  };


  //wishlist related
  const [wishlist, setWishlist] = useState<Wishlist>({} as Wishlist);
  const [editFormType, setEditFormType] = useState("")

  //item related
  const [selectedItem, setSelectedItem] = useState<Item>(defaultItem);
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
  };

  //login related
  const [userToken, setUserToken] = useState<Token>(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return token
      ? { username: username, token: token }
      : { username: null, token: null };
  });

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
        //item-related
        selectedItem,
        setSelectedItem,
        addItem,
        updateItem,
        //login-related
        userToken,
        setUserToken,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
