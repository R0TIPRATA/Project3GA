import axios from "axios";
import { DeleteModalProps, Wishlist } from "../../types";
import { useWishList } from "../context/WishlistContext";

const DeleteWishlistModal = ({ handleToggle, open }: DeleteModalProps) => {
  const {
    wishlist,
    setWishlist,
    deleteWishlist,
    notifySuccess,
    notifyError,
  } = useWishList();

  const handleClick = () => {
    try {
      axios({
        method: "DELETE",
        url: `http://localhost:15432/lists/${wishlist.uuid}`,
        withCredentials: true,
      }).then((response) => {
        console.log(response.data);
        deleteWishlist(wishlist.uuid);
        setWishlist({} as Wishlist);
        notifySuccess("Wishlist successfully deleted!")
      });
    } catch (err) {
      console.log(err);
      notifyError()
    }
    handleToggle();
  };

  return (
    <dialog
      id="delete-wishlist-modal"
      className="modal"
      open={open}
      onClose={handleToggle}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete wishlist</h3>
        <p className="py-4">
          Are you sure you want to delete this wishlist? This action cannot be
          reversed.
        </p>
        <div className="btn-wrapper float-right">
          <button className="btn btn-primary mr-2" onClick={handleToggle}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleClick}>
            Delete
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="bg-slate-950/50">close</button>
      </form>
    </dialog>
  );
};

export default DeleteWishlistModal;
