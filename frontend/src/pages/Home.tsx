import { useEffect } from "react";
import EmptyWishlistPage from "./EmptyWishlistPage";
import WishlistPage from "./WishlistPage";
import axios from "axios";
import { useWishList } from "../components/context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { DateTime, Interval } from "luxon";

const Home = () => {
  //const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const {
    wishlists,
    setWishlists,
    setWishlist,
    setWishlistCampaignIsOver,
    userToken,
  } = useWishList();
  const navigate = useNavigate();

  const checkDaysLeft = (date: string) => {
    const later = DateTime.fromISO(date, { zone: "UTC" }).set({
      hour: 23,
      minute: 59,
      second: 59,
    });
    const now = DateTime.local({ zone: "Asia/Singapore" });
    const interval = Interval.fromDateTimes(now, later);
    if (interval.length("days").toString() === "NaN") {
      setWishlistCampaignIsOver(true);
    } else {
      setWishlistCampaignIsOver(false);
    }
  };

  useEffect(() => {
    // Fetch wishlist when the component mounts
    if (userToken.username) {
      axios
        .get(`http://localhost:15432/lists/user/${userToken.username}`)
        .then((response) => {
          //console.log(response.data)
          setWishlists(response.data);
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  useEffect(() => {
    //store individual wishlist from wishlists
    if (wishlists && wishlists.length > 0 && wishlists[0].uuid) {
      axios
        .get(`http://localhost:15432/lists/${wishlists[0].uuid}`, {
          headers: { Authorization: `Bearer ${userToken.token}` },
        })
        .then((response) => {
          setWishlist(response.data);
          console.log(JSON.stringify(response.data, null, 2));
          checkDaysLeft(response.data.campaignDate);
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
          localStorage.clear();
          navigate("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlists]);

  return <>{wishlists.length > 0 ? <WishlistPage /> : <EmptyWishlistPage />}</>;
};

export default Home;
