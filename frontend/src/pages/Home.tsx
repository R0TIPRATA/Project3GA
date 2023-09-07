import { useState, useEffect } from "react"
import EmptyWishlistPage from "./EmptyWishlistPage"
import WishlistPage from "./WishlistPage"
import axios from "axios"

const Home = () => {
  const [wishLists, setWishLists] = useState([])

  useEffect(() => {
    // Fetch wishlist when the component mounts
    axios
        .get("http://localhost:15432/lists") //hard-coded for now
        .then((response) => {
        console.log(response.data)
        setWishLists(response.data)
        })
        .catch((error) => {
        console.error("Error fetching wish lists:", error)
        });
    }, []);
  
  return (
    <>
      {wishLists.length > 0 ? <WishlistPage /> : <EmptyWishlistPage /> }
    </>
  )
}

export default Home