import { useState, useEffect, createContext } from "react"
import EmptyWishlistPage from "./EmptyWishlistPage"
import WishlistPage from "./WishlistPage"
import axios from "axios"
import Navbar from "../components/Navbar"
import { Wishlist } from "../types"

const defaultWishlist:Wishlist = {
  uuid: "",
  listTitle: "",
  listMessage: "",
  campaignDate: "",
  createdAt: "",
  updatedAt: "",
  wishlistItems: []
}

export const WishlistContext = createContext<Wishlist>(defaultWishlist)

const Home = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([])
  const [wishlist, setWishlist] = useState<Wishlist>(defaultWishlist)

  useEffect(() => {
    // Fetch wishlist when the component mounts
    axios
        .get("http://localhost:15432/lists") //hard-coded for now
        .then((response) => {
        console.log(response.data)
        setWishlists(response.data)
        })
        .catch((error) => {
        console.error("Error fetching wish lists:", error)
        });
    }, []
  );

  useEffect( () => {
    //store individual wishlist from wishlists
    if(wishlists && wishlists.length>0 ){
      axios
        .get(`http://localhost:15432/lists/${wishlists[0].uuid}`) //hard-coded for now
        .then((response) => {
          console.log("line 45 =>", response.data)
          setWishlist(response.data)
        })
        .catch((error) => {
        console.error("Error fetching wish lists:", error)
        });    
      }
    }, [wishlists])

  return (
    <>
    <WishlistContext.Provider value={wishlist}>
      <Navbar />
      {wishlists.length > 0 ? <WishlistPage /> : <EmptyWishlistPage /> }
    </WishlistContext.Provider>
    </>
  )
}

export default Home