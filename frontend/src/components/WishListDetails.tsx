import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useWishList } from "./context/WishlistContext";
import { DateTime } from "luxon";
import WishlistStatus from "./WishlistStatus";
import DeleteWishlistModal from "./form/DeleteWishlistModal";
import { useState } from "react";

const WishListDetails = () => {
  const { wishlist, setEditFormType } = useWishList();
  const [open, setOpen] = useState(false);
  const convertDate = (date: string) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_FULL);
  };

  const handleEditClick = () => {
    setEditFormType("wishlist")
  }

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }  

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
        <label
              htmlFor="edit-drawer"
              onClick={handleEditClick}
              className="drawer-button btn btn-primary py-1 px-2 bg-transparent border-transparent text-blue-600 rounded"
            >
              <FontAwesomeIcon icon={faEdit}/>
        </label>
        <label 
              htmlFor="delete-wishlist-modal"
              onClick={handleToggle}
              className="drawer-button btn btn-primary py-1 px-2 bg-transparent border-transparent text-red-600 rounded"
            >
              <FontAwesomeIcon icon={faTrashCan}/>
        </label>
      </div>
      <div className="details-container flex">
      { wishlist.campaignDate && //only display if campaign end date is avail
        <div className="data-field flex-col pr-2">
          <label className="text-sm">Campaign ends</label>
          <p>{wishlist.campaignDate && convertDate(wishlist.campaignDate)}</p>
        </div>
      }
      { wishlist.listMessage && //only display if list msg is avail
        <div className="data-field flex-col pl-2">
          <label className="text-sm">Message to Contributors</label>
          <p>{wishlist.listMessage}</p>
        </div>
      }
      </div>
      <DeleteWishlistModal handleToggle={handleToggle} open={open}/>
      <WishlistStatus />
    </div>
  );
};

export default WishListDetails;
