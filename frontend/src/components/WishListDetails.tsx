import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useWishList } from "./context/WishlistContext";
import { DateTime } from "luxon";
import WishlistStatus from "./WishlistStatus";

//get wishlist detail

const WishListDetails = () => {
  const { wishlist } = useWishList();
  const convertDate = (date: string) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_FULL);
  };

  return (
    <div className="bg-red-100 w-100 px-12 py-12">
      <div className="top-header flex items-end self-stretch justify-between">
        <div className="uppercase text-sm text-gray-700">Your Wishlist</div>
        <div className="buttons-wrapper">
          <button className="mr-2">View Messages</button>
          <button className="ml-2">Copy Link</button>
        </div>
      </div>
      <div className="wishlist-title flex items-center">
        <h2>{wishlist.listTitle}</h2>
        <button className="ml-2 py-1 px-2 bg-transparent text-blue-600">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="py-1 px-2 bg-transparent text-red-600">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <div className="details-container flex">
        <div className="data-field flex-col pr-2">
          <label className="text-sm">Campaign ends</label>
          <p>{wishlist.campaignDate && convertDate(wishlist.campaignDate)}</p>
        </div>
        <div className="data-field flex-col pl-2">
          <label className="text-sm">Message to Contributors</label>
          <p>{wishlist.listMessage}</p>
        </div>
      </div>
      <WishlistStatus />
    </div>
  );
};

export default WishListDetails;
