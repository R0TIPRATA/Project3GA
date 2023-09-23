import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useWishList } from "../components/context/WishlistContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Items from "../components/contributor/Items";
import WishListDetails from "../components/contributor/WishlistDetails";
import Guestbook from "../components/Guestbook";

const ContributorPage = () => {
  const { wishlists, setWishlists, setWishlist } = useWishList();
  const { user } = useParams();
  console.log(user);

  useEffect(() => {
    axios
      .get(`http://localhost:15432/users/${user}`)
      .then((response) => {
        console.log(response.data);
        setWishlists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="wishlistPage bg-orange-100 flex-col pb-20">
        <WishListDetails />
        <main className="parent flex my-10 mx-40 gap-8">
          <div className="col1 w-4/6">
            <Items />
          </div>
          <div className="col2 w-2/6">
            <Guestbook />
          </div>
        </main>
      </div>
    </>
  );
};

export default ContributorPage;
