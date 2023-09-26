import { useEffect } from "react";
import { useWishList } from "../components/context/WishlistContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecentActivity from "../components/RecentActivity";

const ActivityPage = () => {
  const { userToken, wishlist, wishlists, setWishlists, setWishlist } = useWishList();
  const navigate = useNavigate();

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
            headers: { Authorization: `Bearer ${userToken.token}` },
          })
          .then((response) => {
            setWishlist(response.data);
            // console.log(JSON.stringify(response.data, null, 2));
          })
          .catch((error) => {
            console.error("Error fetching wish lists:", error);
            localStorage.clear();
            navigate("/login");
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishlists]);

  return ( 
    <>
      <div className="wishlistPage bg-orange-100 flex-col pb-20 min-h-full">
        <main className="parent flex flex-col py-10 px-40 gap-8">
            <h3>Recent Activity</h3>
            {wishlist && <RecentActivity />}
        </main>
      </div>
    </>
   );
}
 
export default ActivityPage;