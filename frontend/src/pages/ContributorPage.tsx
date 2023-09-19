import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useWishList } from "../components/context/WishlistContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const ContributorPage = () => {
  const { wishlists, setWishlists, setWishlist } = useWishList();
  const { user } = useParams();
  console.log(user);

  useEffect(() => {
    axios.get(`http://localhost:15432/users/${user}`)
      .then((response) => {
        console.log(response.data);
        setWishlists(response.data);
      }).catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return ( 
    <>
      <Navbar />
    </> 
  );
}
 
export default ContributorPage;