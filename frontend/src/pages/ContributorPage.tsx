import { useEffect } from "react";
import { useWishList } from "../components/context/WishlistContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Items from "../components/contributor/Items";
import WishListDetails from "../components/contributor/WishlistDetails";
import Guestbook from "../components/Guestbook";
import LoggedInNotif from "../components/contributor/LoggedInNotif";
import { DateTime, Interval } from "luxon";

const ContributorPage = () => {
  const {
    setUserToken,
    wishlists,
    setWishlists,
    setWishlist,
    setWishlistCampaignIsOver,
    wishlistCampaignIsOver,
  } = useWishList();
  const { user } = useParams();
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

  const checkUserExists = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/users/${user}`)
      .then((response) => {
        console.log("checking if user exists");
        if (!response.data) navigate("/err");
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
  };

  //get wishlists tied to user
  useEffect(() => {
    checkUserExists();
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/lists/user/${user}`)
      .then((response) => {
        setWishlists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wish lists:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //get wishlist items from first wishlist
    if (wishlists && wishlists.length > 0) {
      axios
        .get(
          `${import.meta.env.VITE_APP_API_URL}/lists/user/${user}/${
            wishlists[0].uuid
          }`
        )
        .then((response) => {
          setWishlist(response.data);
          checkDaysLeft(response.data.campaignDate);
          console.log(
            "loading wishlist => ",
            JSON.stringify(response.data, null, 2)
          );
        })
        .catch((error) => {
          console.error("Error fetching wish list:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlists]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_APP_API_URL}/users/loggedIn`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.loggedInStatus)
          setUserToken({
            username: response.data.username,
            loggedInStatus: response.data.loggedInStatus,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {!wishlistCampaignIsOver ? (
        <LoggedInNotif />
      ) : (
        <div className="p-8 bg-slate-100">
          Note: This campaign is over. You are not able to make any changes or
          contributions to the wishlist any longer.
        </div>
      )}
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
