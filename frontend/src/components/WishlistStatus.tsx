import { useWishList } from "./context/WishlistContext";
import { DateTime, Interval } from "luxon";

const WishlistStatus = () => {
  const { wishlist } = useWishList();

  const daysLeft = (date: string) => {
    const later = DateTime.fromISO(date, {zone: "UTC"});
    const now = DateTime.local({ zone: "Asia/Singapore" });
    const i = Interval.fromDateTimes(now, later);
    return parseInt(i.length("days").toString());
  };

  const getNumItems = () => {
    if (wishlist.wishlistItems) return wishlist.wishlistItems.length;
  };


  return (
    <div className="w-96 mt-[15px] flex flex-row justify-between">
      {/* <!-- First Rectangle --> */}
      <div className="order-1 w-[200px] h-24 bg-white rounded-2xl">
        <div className="text-right text-black text-sm font-light mr-[20px] mt-[18px]">
          DAYS LEFT
        </div>
        <div className="w-24 h-8 text-right text-black text-xl font-semibold  ml-[70px] mr-[15px] mt-[10px]">
          {daysLeft(wishlist.campaignDate)}
        </div>
        <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
      </div>

      {/* <!-- Second Rectangle --> */}
      <div className="order-2 w-[200px] h-24 bg-white rounded-2xl">
        <div className="text-right text-black text-sm font-light  mr-[20px] mt-[18px]">
          ITEMS LEFT
        </div>
        <div className="w-24 h-8 text-right text-black text-xl font-semibold  ml-[70px] mr-[15px] mt-[10px]">
          {getNumItems()}
        </div>
        <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
      </div>

      {/* <!-- Third Rectangle --> */}
      <div className="order-3 w-[200px] h-24 bg-white rounded-2xl">
        <div className="text-right text-black text-sm font-light mr-[20px] mt-[9px]">
          TOTAL <br />
          CONTRIBUTION
        </div>
        <div className=" text-right text-black text-xl font-semibold ml-[70px] mr-[15px] mt-[10px]">
          $120.00
        </div>
        <div className="w-5 h-5 left-[14px] top-[15px] absolute bg-zinc-300 rounded-full" />
      </div>
    </div>
  );
};

export default WishlistStatus;
