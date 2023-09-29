import { DateTime } from "luxon";
import WishlistStatus from "../WishlistStatus";
import { useWishList } from "../context/WishlistContext";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const WishListDetails = () => {
  const { wishlist } = useWishList();
  const { user } = useParams();

  const convertDate = (date: string) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_FULL);
  };

  const copyLink = () => {
    const listLink = `${import.meta.env.VITE_APP_FRONTEND_URL}/wishlist/${user}`;
    navigator.clipboard.writeText(listLink);
    console.log(listLink);
    console.log("copied");
  };

  const notify = () => toast("Link to wishlist copied!");

  return (
    <div className="bg-red-100 w-100 px-12 py-12">
      <div className="top-header flex items-end self-stretch justify-between">
        <div className="uppercase text-sm text-gray-700">{user}'s Wishlist</div>
        <div className="buttons-wrapper">
          <button
            className="btn btn-tertiary ml-20"
            onClick={() => {
              copyLink();
              notify();
            }}
          >
            Share wishlist
          </button>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                backgroundColor: "#4C4747",
                color: "#fff",
              },
              duration: 1200,
            }}
            containerStyle={{ position: "relative" }}
          />
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
