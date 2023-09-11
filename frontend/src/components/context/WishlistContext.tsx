import { ReactNode, createContext, useContext, useState } from "react"
import { Wishlist, Item } from "../../types"

type WishlistProviderProps = {
    children: ReactNode
}

type WishListContext = {
    wishlist: Wishlist,
    setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>
    addItem: (item: Item) => void
}

const WishlistContext = createContext({} as WishListContext)


// eslint-disable-next-line react-refresh/only-export-components
export const useWishList = () => {
    return useContext(WishlistContext)
}

export function WishlistProvider({children}:WishlistProviderProps){
    const [wishlist, setWishlist] = useState<Wishlist>({} as Wishlist)
    4
    const addItem = (item: Item) => {
        setWishlist({...wishlist, wishlistItems: [...wishlist.wishlistItems, item]} )

        console.log("item added! "+ JSON.stringify(item))
    }
    
    return(
        <WishlistContext.Provider 
        value={{
            wishlist,
            setWishlist,
            addItem
        }}>
        {children}
        </WishlistContext.Provider>
    )
}