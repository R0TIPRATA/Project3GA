import { DateTime } from "luxon";
import WishlistStatus from "../WishlistStatus";
import { useWishList } from "../context/WishlistContext";
import { useParams } from "react-router-dom";

const WishListDetails = () => {
  const { wishlist } = useWishList();
  const { user } = useParams();

  const convertDate = (date: string) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_FULL);
  };

  const copyLink = () => {
    const listLink = `http://localhost:5173/lists/user/${user}`;
    navigator.clipboard.writeText(listLink);

    console.log("copied");
  };

  return (
    <div className="bg-red-100 w-100 px-12 py-12">
      <div className="top-header flex items-end self-stretch justify-between">
        <div className="uppercase text-sm text-gray-700">Astrid's Wishlist</div>
        <div className="buttons-wrapper">
          <button className="ml-2" onClick={copyLink}>
            Share wishlist
          </button>
        </div>
      </div>
      <div className="wishlist-title flex items-center">
        <h2>{wishlist.listTitle}</h2>
      </div>
      <div className="details-container flex">
        {wishlist.campaignDate && ( //only display if campaign end date is avail
          <div className="data-field flex-col pr-2">
            <label className="text-sm">Campaign ends</label>
            <p>{convertDate(wishlist.campaignDate)}</p>
          </div>
        )}
        {wishlist.listMessage && ( //only display if list msg is avail
          <div className="data-field flex-col pl-2">
            <label className="text-sm">Message to Contributors</label>
            <p>{wishlist.listMessage}</p>
          </div>
        )}
      </div>
      <WishlistStatus />
    </div>
  );
};

export default WishListDetails;
