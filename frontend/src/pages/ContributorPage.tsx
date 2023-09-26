import { useEffect } from "react";
import { useWishList } from "../components/context/WishlistContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Items from "../components/contributor/Items";
import WishListDetails from "../components/contributor/WishlistDetails";
import Guestbook from "../components/Guestbook";
import LoggedInNotif from "../components/contributor/LoggedInNotif";
import NotFoundPage from "./NotFoundPage";
import { DateTime, Interval } from "luxon";

const ContributorPage = () => {
  const { wishlists, setWishlists, setWishlist, setWishlistCampaignIsOver, wishlistCampaignIsOver} = useWishList();
  const { user } = useParams();


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

  //get wishlists tied to user
  useEffect(() => {
    axios
      .get(`http://localhost:15432/lists/user/${user}`)
      .then((response) => {
        setWishlists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wish lists:",error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //get wishlist items from first wishlist
    if (wishlists && wishlists.length > 0) {
      axios
        .get(`http://localhost:15432/lists/user/${user}/${wishlists[0].uuid}`)
        .then((response) => {
          setWishlist(response.data);
          checkDaysLeft(response.data.campaignDate);
          //console.log(JSON.stringify(response.data,null,2))
        })
        .catch((error) => {
          console.error("Error fetching wish list:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlists]);

  return (
    <>
      { !wishlistCampaignIsOver ?
      <LoggedInNotif /> :
        <div className="p-8 bg-slate-100">
        Note: This campaign is over. You are not able to make any changes or contributions to the wishlist any longer.
      </div>
      }
      <div className="wishlistPage bg-orange-100 flex-col pb-20">
        {wishlists.length > 0 ? (
          <>
            <WishListDetails />
            <main className="parent flex my-10 mx-40 gap-8">
              <div className="col1 w-4/6">
                <Items />
              </div>
              <div className="col2 w-2/6">
                <Guestbook />
              </div>
            </main>
          </>) : <NotFoundPage />}
      </div>
    </>
  );
};

export default ContributorPage;
