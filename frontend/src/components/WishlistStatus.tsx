import { useWishList } from "./context/WishlistContext";
import { DateTime, Interval } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faGift } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

const WishlistStatus = () => {
  const { wishlist } = useWishList();

  const [amount, setAmount] = useState<object>({});

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

  const getAccumulatedAmount = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/items/sumAll`)
        .then((response) => {
          setAmount(response.data);
        })
        .catch((error) => {
          console.error("Error fetching wish lists:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccumulatedAmount();
  }, []);

  // No. of incomplete items
  const getNumItems = () => {
    if (wishlist && wishlist.wishlistItems) {
      const incomplete = wishlist.wishlistItems.filter((item) => {
        // amount is an object that can be indexed with a string.
        // represents a key-value structure that when indexed with a string, returns a value of number type
        // console.log((amount as { [key: string] : number})[item.id]);
        return (amount as { [key: string] : number})[item.id] !== item.price;
      });
      return incomplete.length;
    } else {
      // Handle the case when wishlist or wishlist.wishlistItems is not defined
      return 0; // or another appropriate value
    }
  };

  // Sum of contributions
  const totalGifted = () => {
    if (wishlist && wishlist.wishlistItems) {
      let totalValue = 0;
      wishlist.wishlistItems.filter((item) => {
        if ((amount as { [key: string] : number})[item.id] !== undefined) {
          return (totalValue += (amount as { [key: string] : number})[item.id]);
      }});
      return totalValue;
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
            {totalGifted()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistStatus;
