import { useWishList } from "./context/WishlistContext";
import { DateTime, Interval } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faGift } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";

const WishlistStatus = () => {
  const { wishlist } = useWishList();

  const daysLeft = (date: string) => {
    const later = DateTime.fromISO(date, { zone: "UTC" }).set({
      hour: 23,
      minute: 59,
      second: 59,
    });
    const now = DateTime.local({ zone: "Asia/Singapore" });
    const interval = Interval.fromDateTimes(now, later);
    if (interval.length("days").toString() === "NaN") {
      return "Ended";
    } else {
      return parseInt(interval.length("days").toString());
    }
  };

  useEffect(() => {
    getNumItems();
  }, [wishlist]);

  // getting no. of incomplete items
  const getNumItems = () => {
    if (wishlist && wishlist.wishlistItems) {
      const incomplete = wishlist.wishlistItems.filter((item) => {
        return item.accumulatedAmount !== item.price;
      });
      return incomplete.length;
    } else {
      // Handle the case when wishlist or wishlist.wishlistItems is not defined
      return 0; // or another appropriate value
    }
  };

  return (
    <div className="w-[630px] mt-[15px] flex flex-row justify-between">
      {/* <!-- First Rectangle --> */}
      <div className="order-2 w-[200px] h-24 bg-white rounded-2xl flex justify-content">
        <div className="icon m-4 w-1/4">
          <FontAwesomeIcon icon={faCalendar} />{" "}
        </div>
        <div className="content m-4 w-3/4">
          <div className="text-right text-black text-sm font-light pb-2">
            DAYS LEFT
          </div>
          <div className="text-right text-black text-xl font-semibold">
            {daysLeft(wishlist.campaignDate)}
          </div>
        </div>
      </div>

      {/* <!-- Second Rectangle --> */}
      <div className="order-2 w-[200px] h-24 bg-white rounded-2xl flex justify-content">
        <div className="icon m-4 w-1/4">
          <FontAwesomeIcon icon={faGift} />
        </div>
        <div className="content m-4 w-3/4">
          <div className="text-right text-black text-sm font-light pb-2">
            ITEMS LEFT
          </div>
          <div className="text-right text-black text-xl font-semibold">
            {getNumItems()}
          </div>
        </div>
      </div>

      {/* <!-- Third Rectangle --> */}
      <div className="order-3 w-[200px] h-24 bg-white rounded-2xl flex justify-content">
        <div className="icon m-4 w-1/4">
          <FontAwesomeIcon icon={faDollarSign} />
        </div>
        <div className="content m-4 w-3/4">
          <div className="text-right text-black text-sm font-light pb-2">
            TOTAL GIFTED
          </div>
          <div className=" text-right text-black text-xl font-semibold">
            $120.00
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistStatus;
