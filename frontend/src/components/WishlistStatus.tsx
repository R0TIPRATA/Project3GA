import { useWishList } from "./context/WishlistContext";
import { DateTime, Interval } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faGift } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const WishlistStatus = () => {
  const { wishlist } = useWishList();

  const daysLeft = (date: string) => {
    const later = DateTime.fromISO(date, {zone: "UTC"}).set({ hour: 23, minute: 59, second: 59});
    const now = DateTime.local({ zone: "Asia/Singapore" });
    const i = Interval.fromDateTimes(now, later);
    if (i.length("days").toString() === "NaN") {
      return "Ended";
    } else {
      return parseInt(i.length("days").toString());
    }
  };

  const getNumItems = () => {
    if (wishlist.wishlistItems) return wishlist.wishlistItems.length;
  };


  return (
<<<<<<< Updated upstream
    <div className="w-1/2 mt-[15px] flex flex-row justify-between">
      {/* <!-- First Rectangle --> */}
      <div className="w-[200px] h-24 bg-white rounded-2xl">
        <div className="flex-col">
          <div className="col-1 w-5 h-5 relative left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
          <div className="col-2">
            <div className="text-right text-black text-sm font-light mr-[20px] mt-[18px]">
              DAYS LEFT
            </div>
            <div className="w-24 h-8 text-right text-black text-xl font-semibold  ml-[70px] mr-[20px] mt-[10px]">
              {daysLeft(wishlist.campaignDate)}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Second Rectangle --> */}
      <div className="w-[200px] h-24 bg-white rounded-2xl">
        <div className="w-5 h-5 relative left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
        <div className="text-right text-black text-sm font-light  mr-[20px] mt-[18px]">
          ITEMS LEFT
        </div>
        <div className="w-24 h-8 text-right text-black text-xl font-semibold  ml-[70px] mr-[20px] mt-[10px]">
          {getNumItems()}
=======
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
>>>>>>> Stashed changes
        </div>
      </div>

      {/* <!-- Third Rectangle --> */}
<<<<<<< Updated upstream
      <div className="w-[250px] h-24 bg-white rounded-2xl">
        <div className="w-5 h-5 relative left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
        <div className="text-right text-black text-sm font-light mr-[20px] mt-[18px]">
          TOTAL CONTRIBUTION
        </div>
        <div className=" text-right text-black text-xl font-semibold ml-[70px] mr-[20px] mt-[10px]">
          $120.00
=======
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
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default WishlistStatus;
