import { useEffect } from "react";
import { useWishList } from "../components/context/WishlistContext";
import { useNavigate } from "react-router-dom";
import Guestbook from "../components/Guestbook";
import axios from "axios";
const MessagesPage = () => {
  const { userToken, wishlist, wishlists, setWishlists, setWishlist } =
    useWishList();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken.loggedInStatus) navigate("/login");
  }, [navigate, userToken]);

  //required if user accesses page thru typing url
  useEffect(() => {
    if (userToken.username) {
      axios
        .get(`http://localhost:15432/lists/user/${userToken.username}`)
        .then((response) => {
          setWishlists(response.data);
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  useEffect(() => {
    if (wishlists && wishlists.length > 0) {
      axios
        .get(`http://localhost:15432/lists/${wishlists[0].uuid}`, {
          withCredentials: true,
        })
        .then((response) => {
          setWishlist(response.data);
          console.log(JSON.stringify(response.data, null, 2));
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
          navigate("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlists]);

  return (
      <div className="wishlistPage bg-orange-100 flex-col pb-20 min-h-full">
        <main className="parent flex flex-col py-10 px-40 gap-8">
            <h3>Guestbook</h3>
            <div>{wishlist && <Guestbook />}</div>
        </main>
      </div>
  );
};

export default MessagesPage;
