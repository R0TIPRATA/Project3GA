import { ReactNode, createContext, useContext, useState } from "react"
import { Wishlist, Item, Token } from "../../types"

type WishlistProviderProps = {
    children: ReactNode
}

type WishListContext = {
    wishlist: Wishlist,
    setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>,
    addItem: (item: Item) => void,
    userToken: Token,
    setUserToken: React.Dispatch<React.SetStateAction<Token>>,
    selectedItem: Item,
    setSelectedItem: React.Dispatch<React.SetStateAction<Item>>
}

const WishlistContext = createContext({} as WishListContext)

// eslint-disable-next-line react-refresh/only-export-components
export const useWishList = () => {
    return useContext(WishlistContext)
}

export function WishlistProvider({children}:WishlistProviderProps){
    const [wishlist, setWishlist] = useState<Wishlist>({} as Wishlist)
    const [selectedItem, setSelectedItem] = useState<Item>({} as Item)
    const [userToken, setUserToken] = useState<Token>(() => {
        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")
        return token ? {username: username, token: token} : {username: null, token: null}
    })   
    const addItem = (item: Item) => {
        setWishlist({...wishlist, wishlistItems: [...wishlist.wishlistItems, item]} )
    }
    return(
        <WishlistContext.Provider 
        value={{
            wishlist,
            setWishlist,
            addItem,
            userToken,
            setUserToken,
            selectedItem,
            setSelectedItem
        }}>
        {children}
        </WishlistContext.Provider>
    )
}